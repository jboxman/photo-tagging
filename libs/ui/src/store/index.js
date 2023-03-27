import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export default function configureAppStore({ api = {} } = {}) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          // Allows mock API for thunks
          extraArgument: api,
        },
      }),
  });
  return store;
}
