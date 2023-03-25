import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicantsService from './applicantsService';

const initialState = {
  applicants: [],
  applicant: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const applicantSlice = createSlice({
  name: 'applicants',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getApplicantsByJobId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getApplicantsByJobId.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // @ts-ignore
        state.applicants = action.payload;
      })
      .addCase(getApplicantsByJobId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      });
  },
});

export const getApplicantsByJobId = createAsyncThunk(
  'application/getApplicantsByJobId',
  async (jobId: any, thunkAPI) => {
    try {
      return await applicantsService.getApplicantsByJobId(jobId);
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

export const { reset } = applicantSlice.actions;
export default applicantSlice.reducer;
