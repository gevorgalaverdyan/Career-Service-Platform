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
  extraReducers(builder) {},
});

export const { reset } = applicationSlice.actions;
export default applicationSlice.reducer;
