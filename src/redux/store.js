import { configureStore } from "@reduxjs/toolkit";
import { projectReducer, taskReducer } from "./slice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});
