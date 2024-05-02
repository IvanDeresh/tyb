import { createSlice } from "@reduxjs/toolkit";

export const skillSlice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
  },
  reducers: {
    setSkills: (state: any, action: any) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = skillSlice.actions;

export const selectSkills = (state: any) => state.skill.skills;

export default skillSlice.reducer;
