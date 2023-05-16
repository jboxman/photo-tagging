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
  async function (data, { extra: api }) {
    const result = await api.createTag(data);
    return result;
  }
);

export const updateTag = createAsyncThunk(
  'tags/update',
  async function (data, { extra: api }) {
    const result = await api.updateTag(data);
    return result;
  }
);
