import { combineReducers } from '@reduxjs/toolkit';

import tags from './tagsSlice';

export const rootReducer = combineReducers({ tags });
