import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobsService from './jobsService';
import { Job } from '../../common/types';

const initialState = {
  jobs: [],
  job: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const jobsSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // @ts-ignore
        state.jobs = action.payload;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.job = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      })
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      });
  },
});

export const getJob = createAsyncThunk(
  'job/get',
  async (jobId: any, thunkAPI) => {
    try {
      const res = await jobsService.getJob(jobId);
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getJobs = createAsyncThunk('jobs/getAll', async (_, thunkAPI) => {
  try {
    const res = await jobsService.getJobs();
    console.log(res); //TODO
    return res;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (userData: Job, thunkAPI) => {
    try {
      const res = await jobsService.createJob(userData);
      return res;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const updateJob = createAsyncThunk(
//   'jobs/updateJob',
//   async(userData: any, thunkAPI: any) => {
//     console.log(userData);

//     try {
//       return await jobsService
//     }
//   }
// )

export const { reset } = jobsSlice.actions;
export default jobsSlice.reducer;
