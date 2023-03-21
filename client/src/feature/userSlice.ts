import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginFormData, RegisterFormData } from '../types';
import { BASE_URL } from '../utils/constants';

interface User {
  fullname: string;
  email: string;
  password: string;
}

interface UserState {
  user: null | User;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  loading: false,
  error: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (payload: RegisterFormData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/register`, payload);
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (payload: LoginFormData, thunkAPI) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/user/login`, payload);
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getTokenFromStorage(state) {
      const token = localStorage.getItem('token');
      state.token = token || null;
      state.isAuth = token ? true : false;
    },

    getUserFromStorage(state) {
      const json = localStorage.getItem('user');
      state.user = json ? JSON.parse(json) : null;
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        location.reload();
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuth = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        location.reload();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { getTokenFromStorage, getUserFromStorage, logout } =
  userSlice.actions;

export default userSlice.reducer;
