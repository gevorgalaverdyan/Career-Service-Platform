import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  //user: user ?? null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//register

//login

//logout

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //register fulfilled ...
    }
})

export default authSlice.reducer