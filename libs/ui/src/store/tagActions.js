import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadTags = createAsyncThunk(
  'tags/load',
  async function (_, { extra: api }) {
    const result = await api.loadAllTags();
    return result;
  }
);
