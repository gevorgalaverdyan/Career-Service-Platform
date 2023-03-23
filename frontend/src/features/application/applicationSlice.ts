import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationService from './applicationService';
import { AppliedJob } from '../../common/types';

interface A {
  applications: Array<AppliedJob>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: String;
}

const initialState: A = {
  applications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    reset: (state: any) => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(createApplication.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createApplication.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      })
      .addCase(getAppilicationForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppilicationForUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // @ts-ignore
        state.applications = action.payload;
      })
      .addCase(getAppilicationForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
      });
  },
});

export const createApplication = createAsyncThunk(
  'application/createApplication',
  async (applicationIDs: any, thunkAPI) => {
    try {
      return await applicationService.createApplication(applicationIDs);
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

export const getAppilicationForUser = createAsyncThunk(
  'application/getAppilicationForUser',
  async (userId: any, thunkAPI) => {
    try {
      return await applicationService.getAppilicationForUser(userId);
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

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
