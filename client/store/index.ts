import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "./features/goal/goalSlice";
import taskReducer from "./features/task/taskSlice";
import skillReducer from "./features/skill/skillSlice";

export const store = configureStore({
  reducer: {
    goal: goalReducer,
    task: taskReducer,
    skill: skillReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
