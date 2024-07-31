import { configureStore } from '@reduxjs/toolkit';
import driveHistorySlice from './slices/driveHistorySlice';
import { maponApi } from './services/maponApi';

export const store = configureStore({
  reducer: {
    driveHistory: driveHistorySlice,
    [maponApi.reducerPath]: maponApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(maponApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
