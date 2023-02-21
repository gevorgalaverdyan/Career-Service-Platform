import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//const user = JSON.parse(localStorage.getItem('user'));
const userJSON = localStorage.getItem('user');
const user = userJSON !== null ? JSON.parse(userJSON) : '';

const initialState = {
  user: user ?? null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//register

//login
export const login = createAsyncThunk(
  'auth/login',
  async (user: any, thunkAPI: any) => {
    console.log(user);

    try {
      return await authService.login(user);
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

//logout

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
        state.user = null;
      });
  },
});

export default authSlice.reducer;
