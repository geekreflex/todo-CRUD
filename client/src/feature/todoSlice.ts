import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TodoData } from '../types';
import { BASE_URL, TOKEN } from '../utils/constants';

interface Todo {
  _id: string;
  content: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const getTodos = createAsyncThunk(
  'todo/getTodo',
  async (_, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const { data } = await axios.get(`${BASE_URL}/todo`, config);
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todo/createTodo',
  async (payload: { content: string }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const { data } = await axios.post(`${BASE_URL}/todo`, payload, config);
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/deleteTodo',
  async (todoId: string, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const { data } = await axios.delete(`${BASE_URL}/todo/${todoId}`, config);
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const upddateTodo = createAsyncThunk(
  'todo/updateTodo',
  async (todo: TodoData, thunkAPI) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/todo/${todo._id}`,
        todo,
        config
      );
      return data.payload;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const todoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default todoSlice.reducer;
