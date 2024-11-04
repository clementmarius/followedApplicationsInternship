import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Navigate } from "react-router-dom";

import CounterApp from "./components/Counter";
import LoginButton from "./components/LoginButton";

function App() {
  return <LoginButton />;
}

export default App;
