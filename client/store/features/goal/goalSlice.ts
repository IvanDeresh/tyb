import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface GoalState {
  _id: string;
  description: string;
  targetDate: Date;
  progress: number;
  userId: string;
  __v: number;
}

interface InitialState {
  value: GoalState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InitialState = {
  value: [],
  status: "idle",
  error: null,
};

export const fetchGaols = createAsyncThunk("goal/fetchGoals", async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/goal/662be9d4049cbf06989b6bc4"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const goal = createSlice({
  name: "goal",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<GoalState>) => {
      state.value.push(action.payload);
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.value = state.value.filter((task) => task._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGaols.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGaols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchGaols.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      });
  },
});

export const selectGoals = (state: any) => state.goal.value;
export const selectGoalStatus = (state: any) => state.goal.status;
export const selectGoalError = (state: any) => state.goal.error;

export const { addGoal, removeGoal } = goal.actions;
export default goal.reducer;
