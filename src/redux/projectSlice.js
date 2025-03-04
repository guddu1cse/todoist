import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoist } from "../components/config";
import { notifyError, notifySuccess } from "../components/config";


export const fetchProjects = createAsyncThunk("project/fetchProjects", async () => {
  const response = await todoist.getProjects();
  return response.results;
});


export const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("panding.... ");
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        console.log("success");
        notifySuccess("Projects Fetched Successfully");
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("error");
        notifyError("Error Fetching Projects");
      });
  },
});

export default projectSlice.reducer;
