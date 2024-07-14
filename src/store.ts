
import { configureStore } from '@reduxjs/toolkit';
import mediaReducer from './slices/mediaSlice';
import searchReducer, { SearchState } from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    media: mediaReducer,
    search: searchReducer,
  },
});

export type RootState = {
  media: ReturnType<typeof mediaReducer>;
  search: SearchState; // Usa el tipo SearchState importado
};

export type AppDispatch = typeof store.dispatch;
