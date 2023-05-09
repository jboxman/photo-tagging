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

export const denormalizeTree = (normalizedTree) => {
  const allTags = Object.values(normalizedTree)
    .filter((v) => v.parentId === null)
    .reduce(function me(accum, v) {
      const { id, name, parentId } = v;
      const allChildren = v.children
        .map((id) => normalizedTree[id])
        .reduce(me, []);
      return [
        ...accum,
        {
          id: `${id}${parentId ? ['-', parentId].join('') : ''}`,
          databaseId: id,
          parentId: String(parentId),
          name,
          children: allChildren,
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
  const tagCrumbs = [];

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
