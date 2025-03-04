import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./ProjectSlice"; // Import the reducer correctly

export const store = configureStore({
  reducer: {
    project: projectReducer, // Use projectReducer directly
  },
});
