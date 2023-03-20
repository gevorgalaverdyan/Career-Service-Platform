import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import applicationService from './applicationService';

const initialState = {
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
      });
  },
});

export const createApplication = createAsyncThunk(
  'application/createApplication',
  async (applicationIDs: any, thunkAPI) => {
    try {
      console.log('REDUX');
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
