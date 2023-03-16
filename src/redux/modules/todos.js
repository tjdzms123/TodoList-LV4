import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  todo: {
    id: "0",
    title: "",
    body: "",
    isDone: false,
  },
  isLoading: false,
  isError: false,
  error: null,
};

// 조회 썽크 함수
export const __getTodos = createAsyncThunk(
  "GET_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 상세 조회 썽크 함수
export const __getTodosId = createAsyncThunk(
  "GET_TODOSID",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/todos/${payload}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 추가 썽크 함수
export const __addTodos = createAsyncThunk(
  "ADD_TODOS",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 삭제 썽크 함수
export const __deleteTodos = createAsyncThunk(
  "DELETE_TODOS",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 완료 썽크 함수
export const __doneTodos = createAsyncThunk(
  "DONE_TODOS",
  async (payload, thunkAPI) => {
    try {
      await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload}`);
      return thunkAPI.fulfillWithValue(payload);
      // console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    // todo 조회
    [__getTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // todo 상세 조회
    [__getTodosId.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getTodosId.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todo = action.payload;
    },
    [__getTodosId.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // todo 추가
    [__addTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos.push(action.payload);
    },
    [__addTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // todo 삭제
    [__deleteTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const target = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      state.todos.splice(target, 1);
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // todo 완료
    [__doneTodos.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__doneTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isDone: !todo.isDone };
        } else {
          return todo
        }
      });
    },
    [__deleteTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

// export const { addTodo, deleteTodo, doneTodo, getTodoId } = todosSlice.actions;
export default todosSlice.reducer;
