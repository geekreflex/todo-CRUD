import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  content: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default todoSlice.reducer;
