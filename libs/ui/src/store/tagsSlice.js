import { createSlice } from '@reduxjs/toolkit';

import { loadTags } from './tagActions';

const initialState = {};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTags.fulfilled, (state, action) => {
      state.status = 'success';
      state.error = null;
      state.tags = action.payload.data;
    });
  },
});

export default tagsSlice.reducer;
