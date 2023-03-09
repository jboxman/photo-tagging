#!/usr/bin/env node

// Dump a list of the tags as a recursive map

const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient({
    errorFormat: 'pretty',
    //log: ['info', 'query'],
  });

  // Includes up to 4 levels
  // Because Prisma does not currently support `WITH` queries
  const allTags = await prisma.tags.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: { include: { children: { include: { children: true } } } },
        },
      },
    },
  });

  console.log(JSON.stringify(allTags, null, 2));
}

main();
