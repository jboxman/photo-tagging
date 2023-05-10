import { createSlice, current } from '@reduxjs/toolkit';

import { loadTags, updateTag } from './tagActions';
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
      //state.status = 'success';
      //state.error = null;
      //console.log(action.payload.data);

      //console.log(action.payload.data.map(normalize));

      state.tags = action.payload.data.map(normalize).reduce((all, o) => {
        return Object.assign(all, o);
      }, {});
      //      console.log(state.tags);
      //console.log(Object.values(state.tags).filter((tag) => !tag.parentId));
    });
    builder.addCase(updateTag.fulfilled, (state, action) => {
      const { id, parentId, tagName: name } = action.payload.data;
      console.log(action.payload);
      Object.assign(state.tags[id], { parentId, name });
      //state.status = 'success';
      //state.error = null;
      //const tag = state.tags.find(({ id: currentId }) => currentId == id);
    });
  },
});

export default tagsSlice.reducer;
