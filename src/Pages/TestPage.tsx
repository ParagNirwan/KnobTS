import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Test } from "../App";
import Dial from "../Components/Dial";
import Outerbox from "../Components/Outerbox";
import Slider from "../Components/Slider";
import "./TestPage.css";
import InfiniteDial from "../Components/InfiniteDial";

interface TestPageProps {
  tests: Test[];
}

const TestPage: React.FC<TestPageProps> = ({ tests }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dialValue, setDialValue] = useState<number>(0);

  const handleSliderChange = (value: number) => {
    console.log("Slider value:", value);
  };

  const handleNext = () => {
    const nextTest = parseInt(id || "1", 10) + 1;

    if (nextTest > tests.length) {
      navigate("/results");
    } else {
      navigate(`/test/${nextTest}`);
    }
  };

  const currentTest = tests.find((test) => test.id === parseInt(id || "1", 10));
  if (!currentTest) {
    return <div>Test not found</div>;
  }

  // Set ranges for sliders and knobs dynamically
  const getRange = () => {
    if (currentTest.id === 1 || currentTest.id === 4) {
      return { min: 0, max: 10 };
    } else if (currentTest.id === 2 || currentTest.id === 5) {
      return { min: 0, max: 100 };
    } else if (currentTest.id === 3 || currentTest.id === 6) {
      return { min: 0, max: 1000 };
    }
    return { min: 0, max: 100 }; // Default range
  };

  const range = getRange();

  return (
    <div>
      <h1>{currentTest.name}</h1>
      <br />
      <br />
      <center>
        <h2>Make the inner square the same color as the outer square</h2>
      </center>
      <div className="container">
        <div className="leftSide">
          <Outerbox />
        </div>

        <div className="rightSide">
          <div>
            {currentTest.id < 3 ? (
              <Dial
                min={range.min}
                max={range.max}
                onChange={(value) => setDialValue(value)}
                finite={true}
              />
            ) : currentTest.id === 3 ? (
              <InfiniteDial
                min={range.min}
                onChange={(value) => console.log("InfiniteDial value:", value)}
              />
            ) : (
              <Slider
                min={range.min}
                max={range.max}
                onChange={handleSliderChange}
              />
            )}
          </div>
          <span>Test Number: {currentTest?.id} / 6</span>
          <button onClick={handleNext} className="button button-primary">
            Next
          </button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default TestPage;
