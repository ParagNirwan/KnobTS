import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Test } from "../App";
import Dial from "../Components/Dial";
import Outerbox from "../Components/Outerbox";
const [dialValue, setDialValue] = useState(0);
const setValues = [7, 32, 67];
interface TestPageProps {
  tests: Test[];
}

const TestPage: React.FC<TestPageProps> = ({ tests }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    setStartTime(Date.now());
  }, [id]);

  const handleNext = () => {
    const timeTaken = Date.now() - startTime;
    const nextTest = parseInt(id || "1", 10) + 1;

    // Save time to localStorage
    const times: { testId: string; time: number }[] = JSON.parse(
      localStorage.getItem("testTimes") || "[]"
    );
    times.push({ testId: id || "1", time: timeTaken });
    localStorage.setItem("testTimes", JSON.stringify(times));

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

  return (
    <div>
      <h1>{currentTest.name}</h1>
      <p>Perform the test here...</p>
      <button onClick={handleNext}>Next</button>

      {/* idhar se code hai main */}

      <center>
        <h2>
          Make the inner square the same color as outer square by rotating the
          knob
        </h2>
      </center>

      <div className="container">
        <div className="leftSide">
          <Outerbox />
        </div>

        <div className="rightSide">
          <div>
            {/* <h1>Dial Value: {dialValue}</h1> */}
            {/* Limited Values */}
            <Dial
              min={0}
              max={5}
              onChange={(value) => setDialValue(value)}
              finite={true}
            />

            {/* Infinite Values */}
            {/* Uncomment the line below to use infinite values */}
            {/* <InfiniteDial onChange={(value) => setDialValue(value)} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
