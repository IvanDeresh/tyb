import { createSlice } from "@reduxjs/toolkit";

export const goalSlice = createSlice({
  name: "goal",
  initialState: {
    goals: [],
  },
  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const { setGoals } = goalSlice.actions;

export const selectGoals = (state: any) => state.goal.goals;

export default goalSlice.reducer;
