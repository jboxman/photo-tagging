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

// Derived from https://stackoverflow.com/a/73030226
export const denormalize = (norm) => {
  const treeHash = Object.fromEntries(
    Object.entries(norm).map(([k, v]) => [k, { ...v }])
  );

  Object.values(norm).forEach((v) => {
    // hook up children
    treeHash[v.id].children = v.children.map((k) => treeHash[k]);
  });

  // return parents
  return Object.values(treeHash).filter((tag) => !tag.parentId);
};
