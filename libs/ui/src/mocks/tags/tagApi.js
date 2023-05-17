export async function loadAllTags() {
  // https://dev.to/thatamymac/dynamic-imports-of-json-ipl
  const data = await import('../../fixtures/tag-tree.json').then(
    (module) => module.default
  );
  return {
    data,
    success: true
  };
}

export async function createTag(data = {}) {
  return {
    data,
    success: true
  };
}

export async function updateTag(data = {}) {
  return {
    data,
    success: true
  };
}

export async function deleteTag(data = {}) {
  return {
    data,
    success: true
  };
}
