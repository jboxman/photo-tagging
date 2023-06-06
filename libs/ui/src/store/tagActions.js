import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadTags = createAsyncThunk(
  'tags/load',
  async function (_, { extra: api }) {
    const result = await api.loadAllTags();
    return result;
  }
);

export const createTag = createAsyncThunk(
  'tags/create',
  async function ({ tagName = '', parentId = null } = {}, { extra: api }) {
    const result = await api.createTag(tagFactory({ tagName, parentId }));
    return result;
  }
);

export const updateTag = createAsyncThunk(
  'tags/update',
  async function ({ id, tagName = '', parentId = null } = {}, { extra: api }) {
    const result = await api.updateTag(tagFactory({ id, tagName, parentId }));
    return result;
  }
);

export const deleteTag = createAsyncThunk(
  'tags/delete',
  async function ({ id = 0 } = {}, { extra: api }) {
    const result = await api.deleteTag({ id });
    return result;
  }
);

function tagFactory({
  tagName = '',
  id = Date.now(),
  parentId = null,
  children = [],
  imageCount = 0,
} = {}) {
  id = Number(id);
  parentId = Number(parentId);

  return {
    name: tagName,
    id: Number.isNaN(id) ? null : id,
    parentId: Number.isNaN(parentId) ? null : parentId,
    children,
    imageCount,
  };
}
