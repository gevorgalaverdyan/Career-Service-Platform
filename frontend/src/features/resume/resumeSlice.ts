import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { stat } from 'fs';
import resumeService from './resumeService';

const initialState = {
  resume: '',
  isError: false,
  isSuccess: false,
  isLoading: false,
  hasResume: false,
};

export const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(getResume.rejected, (state, action) => {
        state.hasResume = false;
      })
      .addCase(getResume.fulfilled, (state, action) => {
        state.hasResume = true;
        state.resume = action.payload;
      });
  },
});

export const uploadResume = createAsyncThunk(
  'resume/upload',
  async ({ studentId, payload }: any, thunkAPI) => {
    try {
      const res = await resumeService.createResume(studentId, payload);
      return res;
    } catch (error: any) {
      console.log(error);
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

export const updateResume = createAsyncThunk(
  'resume/update',
  async ({ studentId, payload }: any, thunkAPI) => {
    try {
      const res = await resumeService.updateResume(studentId, payload);
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
