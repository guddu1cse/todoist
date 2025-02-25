import React from "react";
import { use, useEffect, useState } from "react";
import TrafficLight from "./TrafficLight";
import GridLight from "./GridLight";
import "./App.css";
import CursorAnimation from "./CursorAnimation";
import { todoist } from "./components/config";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
