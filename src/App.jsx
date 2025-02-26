import React from "react";
import { use, useEffect, useState } from "react";
import TrafficLight from "./TrafficLight";
import GridLight from "./GridLight";
import "./App.css";
import CursorAnimation from "./CursorAnimation";
import { todoist } from "./components/config";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Home />
      <ToastContainer />
    </>
  );
}

export default App;
