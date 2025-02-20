import React from "react";

interface TestTime {
  testId: string;
  time: number;
}

const ResultsPage: React.FC = () => {
  const times: TestTime[] = JSON.parse(
    localStorage.getItem("testTimes") || "[]"
  );

  const handleForm = () => {
    window.open("https://forms.office.com/r/vYYL3DQgjf", "_blank");
  };

  return (
    <div>
      <h1>Test Results</h1>
      <ul>
        {times.map((time, index) => (
          <li key={index}>
            Test {time.testId}: {Math.round(time.time / 1000)} seconds
          </li>
        ))}
      </ul>
      <button onClick={handleForm}>Open Questionnaire</button>
    </div>
  );
};

export default ResultsPage;
