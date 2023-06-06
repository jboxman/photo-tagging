import { createSlice, current } from '@reduxjs/toolkit';

import { loadTags, createTag, updateTag, deleteTag } from './tagActions';
//import { normalize } from './helpers';

const initialState = {
  tags: {},
};

// TODO - need tagFactory() that returns a real tag object every time

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTags.fulfilled, (state, action) => {
      state.tags = action.payload.data.reduce((o, tag) => {
        o[tag.id] = {
          ...tag,
          imageCount: tag['_count'].images,
          children: tag.children.map((c) => c.id),
        };
        return o;
      }, {});
    });

    builder.addCase(createTag.fulfilled, (state, action) => {
      const { id, parentId, ...rest } = action.payload.data;
      console.log(action.payload.data);
      if (parentId) {
        state.tags[parentId].children.push(id);
      }
      state.tags[id] = { id, parentId, ...rest };
      console.log(current(state.tags));
    });

    // TODO - a move of parentId means updating each parent as well
    builder.addCase(updateTag.fulfilled, (state, action) => {
      const { id, parentId, name } = action.payload.data;
      console.log(action.payload);
      Object.assign(state.tags[id], { ...state.tags[id], parentId, name });
    });

    builder.addCase(deleteTag.fulfilled, (state, action) => {
      const { id } = action.payload.data;
      const { parentId, children } = state.tags[id];

      if (parentId) {
        state.tags[parentId].children = state.tags[parentId].children.filter(
          (childId) => childId !== id
        );
      }

      for (const id of children) {
        delete state.tags[id];
      }

      delete state.tags[id];
    });
  },
});

export default tagsSlice.reducer;
