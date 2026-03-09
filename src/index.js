import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { MemoryProvider } from "./context/MemoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MemoryProvider>
    <App />
  </MemoryProvider>
);
