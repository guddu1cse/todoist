import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "./redux/ProjectSlice";

function App() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
