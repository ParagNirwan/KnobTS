import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const startTest = () => {
    navigate("/test/1");
  };

  return (
    <div>
      <h1>Welcome to the Test</h1>
      <p>Follow the instructions and click "Begin Test" to start.</p>
      <button onClick={startTest}>Begin Test</button>
    </div>
  );
};

export default HomePage;
