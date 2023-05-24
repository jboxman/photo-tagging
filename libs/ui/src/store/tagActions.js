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
  async function ({ tagName = '' } = {}, { extra: api }) {
    const result = await api.createTag({ tagName });
    return result;
  }
);

export const updateTag = createAsyncThunk(
  'tags/update',
  async function ({ tagName = '', parentId = null } = {}, { extra: api }) {
    const result = await api.updateTag({ tagName, parentId });
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
