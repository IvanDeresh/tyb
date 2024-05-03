import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TaskState {
  _id: string;
  description: string;
  deadline: Date;
  completed: boolean;
  userId: string;
  createdAt: Date;
  __v: number;
}

interface InitialState {
  value: TaskState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  value: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/task/662be9d4049cbf06989b6bc4"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});
// taskSlice.ts

export const task = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskState>) => {
      state.value.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((task) => task._id !== action.payload);
    },
    doneTask: (state, action: PayloadAction<string>) => {
      const task = state.value.find((task) => task._id === action.payload);
      if (task) {
        task.completed = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const selectTasks = (state: any) => state.task.value;
export const selectTaskStatus = (state: any) => state.task.status;
export const selectTaskError = (state: any) => state.task.error;

export const { addTask, removeTask, doneTask } = task.actions;
export default task.reducer;
