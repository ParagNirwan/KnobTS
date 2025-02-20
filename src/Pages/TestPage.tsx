import React, { useState, useEffect } from "react";
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
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0); // Time taken in milliseconds
  const [testCompleted, setTestCompleted] = useState(false);

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

  // Predefined test values
  const predefinedValue =
    currentTest.id === 1 || currentTest.id === 4
      ? 6
      : currentTest.id === 2 || currentTest.id === 5
      ? 67
      : 757;

  const handleInputStart = () => {
    if (!startTime) {
      setStartTime(Date.now()); // Start the timer when the user interacts
    }
  };

  const handleInputEnd = (value: number) => {
    if (startTime) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      setTimeTaken(duration); // Calculate time taken in milliseconds
      setStartTime(null); // Reset start time

      // Log the time taken
      console.log(
        `Time taken for test ${currentTest.id}: ${duration / 1000} seconds`
      );

      // Check if value matches predefined value
      if (value === predefinedValue) {
        setTestCompleted(true);
      } else {
        setTestCompleted(false); // Keep timer running if values don't match
      }
    }
  };

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
          <Outerbox testId={currentTest.id} value={dialValue} />
        </div>

        <div className="rightSide">
          <div>
            {currentTest.id < 3 ? (
              <Dial
                min={range.min}
                max={range.max}
                onChange={(value) => setDialValue(value)}
                onTouchStart={handleInputStart}
                onMouseDown={handleInputStart} // Support for mouse interactions
                onTouchEnd={() => handleInputEnd(dialValue)}
                onMouseUp={() => handleInputEnd(dialValue)} // End the timer when input is released
                finite={true}
              />
            ) : currentTest.id === 3 ? (
              <InfiniteDial
                min={range.min}
                onChange={(value) => setDialValue(value)}
                onTouchStart={handleInputStart}
                onMouseDown={handleInputStart}
                onTouchEnd={() => handleInputEnd(dialValue)}
                onMouseUp={() => handleInputEnd(dialValue)}
              />
            ) : (
              <Slider
                min={range.min}
                max={range.max}
                onChange={(value) => setDialValue(value)}
                onTouchStart={handleInputStart}
                onMouseDown={handleInputStart}
                onTouchEnd={() => handleInputEnd(dialValue)}
                onMouseUp={() => handleInputEnd(dialValue)}
              />
            )}
          </div>
          <span>Test Number: {currentTest?.id} / 6</span>
          {testCompleted && (
            <span>Test Completed in {timeTaken / 1000} seconds</span>
          )}

          <button
            onClick={handleNext}
            className="button button-primary"
            disabled={
              !(
                ((currentTest.id === 1 || currentTest.id === 4) &&
                  dialValue === 7) ||
                ((currentTest.id === 2 || currentTest.id === 5) &&
                  dialValue === 67) ||
                ((currentTest.id === 3 || currentTest.id === 6) &&
                  dialValue <= 767 &&
                  dialValue >= 747)
              )
            }
          >
            Next
          </button>
        </div>
      </div>
      <br />
    </div>
  );
};

export default TestPage;
