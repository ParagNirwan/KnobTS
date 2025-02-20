import Innerbox from "./Innerbox";

interface OuterboxProps {
  testId: number; // Accept testId as a prop
  value: number;
}

const Outerbox: React.FC<OuterboxProps> = ({ testId, value }) => {
  // Determine background color based on testId
  let backgroundColor = "hsl(7, 100%, 50%)"; // Default color for testId 1 or 4

  if (testId === 2 || testId === 5) {
    backgroundColor = "hsl(120, 67%, 25%)"; // Green for testId 2 or 5
  } else if (testId === 3 || testId === 6) {
    backgroundColor = "hsl(210, 100%, 25%)"; // Blue for testId 3 or 6
  }

  return (
    <div
      className="outerbox"
      style={{
        backgroundColor: backgroundColor, // Use the dynamically calculated color
      }}
    >
      {/* Pass the testId to the Innerbox component */}
      <Innerbox testId={testId} value={value} />
    </div>
  );
};

export default Outerbox;
