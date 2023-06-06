// Derived from https://stackoverflow.com/a/73030226
export const normalize = (obj) => {
  return Object.assign(
    {
      [obj.id]: {
        ...obj,
        children: obj.children.map((v) => v.id),
      },
    },
    ...obj.children.map(normalize)
  );
};

// TODO - Maybe set the rest of the values as an object with their original values?
export const denormalizeTree = (normalizedTree) => {
  const allTags = Object.values(normalizedTree)
    .filter((v) => v.parentId === null)
    .reduce(function me(accum, v) {
      const { id, name, parentId, imageCount } = v;
      const allChildren = v.children
        .map((id) => normalizedTree[id])
        .reduce(me, []);
      return [
        ...accum,
        {
          treeId: `${id}${parentId ? ['-', parentId].join('') : ''}`,
          id,
          parentId,
          name,
          children: allChildren,
          imageCount,
        },
      ];
    }, []);
  return allTags;
};

export const getSelectListItems = ({
  tags: normalizedTags,
  idName = 'value',
  labelName = 'label',
}) => {
  const tagCrumbs = [
    {
      [idName]: '',
      [labelName]: 'None',
    },
  ];

  function getParent({ parentId, name }) {
    if (parentId) {
      return [
        ...getParent({
          name: normalizedTags[parentId].name,
          parentId: normalizedTags[parentId].parentId,
        }),
        normalizedTags[parentId].name,
      ];
    }
    return [];
  }

  for (const tag of Object.values(normalizedTags)) {
    tagCrumbs.push({
      [idName]: String(tag.id),
      [labelName]: [...getParent(tag), tag.name].join(' > '),
    });
  }

  return tagCrumbs;
};
