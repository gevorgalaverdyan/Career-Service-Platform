import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import resumeService from './resumeService';

const initialState = {
  resume: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  hasResume: false,
  message: '',
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getResume.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.hasResume = true;
        state.resume = action.payload;
      })
      .addCase(getResume.rejected, (state, action) => {
        state.hasResume = false;
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      });
  },
});

export const uploadResume = createAsyncThunk(
  'resume/upload',
  async ({ studentId, payload }: any, thunkAPI) => {
    try {
      const res = await resumeService.uploadResume(studentId, payload);
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

export const getResume = createAsyncThunk(
  'resume',
  async (studentId: string, thunkAPI) => {
    try {
      const res = await resumeService.getResume(studentId);
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

export const { reset } = resumeSlice.actions;
export default resumeSlice.reducer;
