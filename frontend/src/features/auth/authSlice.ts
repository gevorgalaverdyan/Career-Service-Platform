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
export const register = createAsyncThunk(
  'auth/register',
  async (user: any, thunkAPI: any) => {
    console.log(user);
  }
);

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
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

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
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          typeof action.payload === 'string' ? action.payload : '';
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
