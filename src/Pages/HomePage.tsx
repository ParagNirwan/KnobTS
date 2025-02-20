import React from "react";
import { useNavigate } from "react-router-dom";
const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const startTest = () => {
    navigate("test/1");
  };

  return (
    <div>
      <center>
        <h1>Dials vs Sliders UI Test</h1>
        <p>Follow the instructions and click "Begin Test" to start.</p>
        <button onClick={startTest} className="button button-primary">
          Begin Test
        </button>
      </center>
    </div>
  );
};

export default HomePage;
