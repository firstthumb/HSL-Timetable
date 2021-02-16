import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import departure from './slices/departure.slice';

const reducers = combineReducers({
  departure,
});

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    immutableCheck: false,
  }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatchFn = typeof store.dispatch;
export type RootStateFn = () => RootState;
