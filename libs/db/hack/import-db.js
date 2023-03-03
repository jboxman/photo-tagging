#!/usr/bin/env node

const { join, resolve } = require('path');

const { PrismaClient } = require('@prisma/client');
const { PrismaClient: PrismaClientDk } = require('../prisma/generated/import');

const { loadYaml } = require('../lib/helpers');

const getSeedData = (seedFileName) =>
  resolve(join(__dirname, '../prisma/seed', seedFileName));

// Partial import of a digiKam database

async function main() {
  const prisma = new PrismaClient({
    errorFormat: 'pretty',
    //log: ['info', 'query'],
  });
  const dk = new PrismaClientDk({ errorFormat: 'pretty' });

  const colors = await loadYaml(getSeedData('color-label-type'));
  const picks = await loadYaml(getSeedData('pick-label-type'));

  await dk.$connect();

  const tables = ['images', 'albums', 'folders', 'archives', 'tags'];
  // ConnectorError(ConnectorError { user_facing_error: None, kind: ConnectionError(Timed out during query execution.), transient: false })
  // https://github.com/prisma/prisma/issues/9562
  // https://github.com/prisma/prisma/issues/10403
  //await Promise.all(tables.map((t) => prisma[t].deleteMany({})));
  for await (const _ of tables.map((t) => prisma[t].deleteMany({})));

  await prisma.archives.create({
    data: { path: '/dev/null' },
  });

  for (const color of colors) {
    await prisma.colorLabelTypes.upsert({
      create: {
        colorLabel: color,
      },
      update: {
        colorLabel: color,
      },
      where: {
        colorLabel: color,
      },
    });
  }

  for (const pick of picks) {
    await prisma.pickLabelTypes.upsert({
      create: {
        pickLabel: pick,
      },
      update: {
        pickLabel: pick,
      },
      where: {
        pickLabel: pick,
      },
    });
  }

  let tags;
  tags = await dk.tags.findMany({
    where: {
      AND: [
        {
          pid: 0,
        },
        {
          name: { notIn: ['_Digikam_Internal_Tags_', 'People'] },
        },
      ],
    },
    include: {
      children: true,
    },
  });

  //console.log(JSON.stringify(tags));
  //return;

  const withTags = async (tags = [], parentId = null) => {
    let tuples = [];

    for (let tag of tags) {
      if (parentId) {
        tag = await dk.tags.findUnique({
          where: { id: tag.id },
          include: { children: true },
        });
      }

      const t = await prisma.tags.create({
        data: {
          name: tag.name,
          parentId,
        },
      });

      // TODO - Do not actually need pid for this
      // TODO - Try using Map
      tuples.push([tag.id, tag.pid, t.id]);

      if (Array.isArray(tag.children) && tag.children.length > 0) {
        tuples.push(...(await withTags(tag.children, t.id)));
      }
    }

    return tuples;
  };

  const tagAndParent = await withTags(tags);
  //console.log(JSON.stringify(tagAndParent, null, 2));

  let images;
  try {
    // Cannot be used with `select`
    // Allows gathering tag > parent tag into [tagName, parentTagName] tuple
    images = await dk.images.findMany({
      include: {
        tags: { include: { tag: { include: { parent: true } } } },
        viewInfo: true,
        metadata: true,
      },
    });
  } catch (e) {
    console.log(e);
  }

  //console.log(JSON.stringify(images[0].tags, null, 2));

  let img;
  for (const image of images) {
    //console.log(image);
    try {
      img = await prisma.images.create({
        data: {
          filename: image.name,
          fileSize: image.fileSize,
          modificationDate: new Date(),
          uniqueHash: image.uniqueHash || 'any',
          archive: {
            connect: { path: '/dev/null' },
          },
          ...(image['viewInfo']
            ? {
                info: {
                  create: {
                    ...Object.entries(image.viewInfo).reduce(
                      (o, [k, v]) =>
                        ['imageid', 'image', 'rating'].includes(k)
                          ? o
                          : { ...o, [k]: v },
                      {}
                    ),
                  },
                },
              }
            : {}),
          metadata: {
            create: {
              ...Object.entries(image.metadata).reduce(
                (o, [k, v]) =>
                  ['imageid', 'image'].includes(k) ? o : { ...o, [k]: v },
                {}
              ),
            },
          },
        },
      });
    } catch (e) {
      console.log(e);
      break;
    }

    if (!Array.isArray(image.tags)) continue;
    //console.log(image.tags[0]);
    for (const {
      tag: {
        id: dkTagId,
        parent: { id: dkParentId },
      },
    } of image.tags) {
      // Array.find returns undefined if no match is found
      const [, , tagId] =
        tagAndParent.find(
          ([oldTagId, oldParentTagId]) =>
            oldTagId == dkTagId && oldParentTagId == dkParentId
        ) || [];

      // Add tag by ID to m-t-m join table
      if (tagId) {
        try {
          await prisma.tagsOnImages.create({
            data: {
              imageId: img.id,
              tagId,
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    }

    //break;
  }
}

main();
