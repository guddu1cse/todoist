import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoist } from "../components/config";
import { notifyError, notifySuccess } from "../components/config";


export const fetchProjects = createAsyncThunk("project/fetchProjects", async () => {
  const response = await todoist.getProjects();
  return response.results;
});

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  const response = await todoist.getTasks();
  return response.results;
});


const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    edit: 0,
    isProjectsOpen: false,
    activeTab: 'Inbox',
    isFavoritesExpanded: false,
    hoveredProject: null,
    hoveredFavorite: null,
    inboxSize: '',
    addForm: false,
    checkedProject: null,
    checkedFavorite: null,
    showAddProject: false,
    isInboxItem: true,
    selectedProject: null,
    showProjectMenu: false,
    tasks: [],
    taskCount: 0,
  },
  reducers: {
    setState: (state, action) => {
      const { key, value } = action.payload;
      if (state.hasOwnProperty(key)) {
        state[key] = value;
      } else {
        console.warn(`Invalid state key: ${key}`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("Projects loading pending...");
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.loading = false;
        console.log("Projects loading success");
        notifySuccess("Projects Fetched Successfully");
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("Error fetching projects");
        notifyError("Error Fetching Projects");
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("tasks loading panding.... ");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.taskCount = action.payload.length;
        console.log("tasks loading success");
        notifySuccess("Tasks Fetched Successfully");
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("error");
        notifyError("Error Fetching Tasks");
      });
  },
});

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("tasks loading panding.... ");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        console.log("tasks loading success");
        notifySuccess("Tasks Fetched Successfully");
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log("error");
        notifyError("Error Fetching Tasks");
      });
  },
});

export const { setState } = projectSlice.actions;
export const projectReducer = projectSlice.reducer;
export const taskReducer = taskSlice.reducer;