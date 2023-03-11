import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobsService from './jobsService';

// interface jobsState {
//   jobs: Array<any>;
//   job: {};
//   isError: Boolean;
//   isSuccess: Boolean;
//   isLoading: Boolean;
//   message: string;
// }

const initialState = {
  jobs: [],
  job: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const jobsSlice = createSlice({
  name: 'jobs',
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
      });
  },
});

export const getJobs = createAsyncThunk('jobs/getAll', async (_, thunkAPI) => {
  try {
    const res = await jobsService.getJobs();
    console.log(res)
    return res;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const { reset } = jobsSlice.actions;
export default jobsSlice.reducer;
