import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
// Find the root DOM element in the HTML
const root = document.getElementById("root");

if (root) {
  // Create a React root and render the App component
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}
