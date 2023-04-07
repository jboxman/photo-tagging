import { createSlice } from '@reduxjs/toolkit';

import { loadTags, updateTag } from './tagActions';

const initialState = {};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTags.fulfilled, (state, action) => {
      //state.status = 'success';
      //state.error = null;
      state.tags = action.payload.data;
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
      const { id, parentId, name } = action.payload.data;
      //state.status = 'success';
      //state.error = null;
      //const tag = state.tags.find(({ id: currentId }) => currentId == id);
    });
  },
});

export default tagsSlice.reducer;
