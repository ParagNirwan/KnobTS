import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

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
