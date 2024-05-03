import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface SkillState {
  _id: string;
  description: string;
  deadline: Date;
  completed: boolean;
  userId: string;
  createdAt: Date;
  __v: number;
}

interface InitialState {
  value: SkillState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  value: [],
  status: "idle",
  error: null,
};

export const fetchSkills = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await axios.get("http://localhost:3001/skill");
    return response.data;
  } catch (error) {
    throw error;
  }
});
// taskSlice.ts

export const skill = createSlice({
  name: "skill",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<SkillState>) => {
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
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const selectTasks = (state: any) => state.task.value;
export const selectTaskStatus = (state: any) => state.task.status;
export const selectTaskError = (state: any) => state.task.error;

export const { addTask, removeTask, doneTask } = skill.actions;
export default skill.reducer;
