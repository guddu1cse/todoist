import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchProjects, fetchTasks } from "./redux/slice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTasks());
  }, []);

  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
