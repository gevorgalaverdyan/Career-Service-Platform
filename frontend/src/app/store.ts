import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/jobs/jobsSlice';
import applicationsReducer from '../features/application/applicationSlice';
import resumeReducer from '../features/resume/resumeSlice';
import applicantsReducer from '../features/applicant/applicantsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobsReducer,
    applications: applicationsReducer,
    resume: resumeReducer,
    applicants: applicantsReducer,
  },
});
