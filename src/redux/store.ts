import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';

// Configure the store with Redux Toolkit
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
  // Redux DevTools is enabled by default in development
  devTools: process.env.NODE_ENV !== 'production',
  // Add any middleware here if needed
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
