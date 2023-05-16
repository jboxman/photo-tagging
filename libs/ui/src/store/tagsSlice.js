import { createSlice, current } from '@reduxjs/toolkit';

import { loadTags, createTag, updateTag } from './tagActions';
import { normalize } from './helpers';

const initialState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTags.fulfilled, (state, action) => {
      state.tags = action.payload.data.map(normalize).reduce((all, o) => {
        return Object.assign(all, o);
      }, {});
    });
    builder.addCase(createTag.fulfilled, (state, action) => {});
    builder.addCase(updateTag.fulfilled, (state, action) => {
      const { id, parentId, tagName: name } = action.payload.data;
      console.log(action.payload);
      Object.assign(state.tags[id], { parentId, name });
    });
  },
});

export default tagsSlice.reducer;
