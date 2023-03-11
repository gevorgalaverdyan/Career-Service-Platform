import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/jobs/jobsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer
  },
});
