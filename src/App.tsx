import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ResultsPage from "./Pages/ResultPage";
import TestPage from "./Pages/TestPage";

// Define the Test type
export interface Test {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const tests: Test[] = [
    { id: 1, name: "Test 1" },
    { id: 2, name: "Test 2" },
    { id: 3, name: "Test 3" },
    { id: 4, name: "Test 4" },
    { id: 5, name: "Test 5" },
    { id: 6, name: "Test 6" },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/Pages/homepage" element={<HomePage />} />
        <Route path="/Pages/test/:id" element={<TestPage tests={tests} />} />
        <Route path="/Pages/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
