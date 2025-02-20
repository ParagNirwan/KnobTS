interface OuterboxProps {
  testId: number; // Accept the test ID as a prop
  value: number; // Accept the value as a prop
}

const Outerbox: React.FC<OuterboxProps> = ({ testId, value }) => {
  // Dynamically construct the HSL background color
  let backgroundColor = `hsl(${value}, 100%, 50%)`; // Default H uses `value`
  let width = "200px";

  if (testId === 2 || testId === 5) {
    backgroundColor = `hsl(120, ${value}%, 25%)`; // Use `value` for S (saturation)
  } else if (testId === 3 || testId === 6) {
    backgroundColor = `hsl(210, 50%, 49%)`; // Use `value` for L (lightness)
    return (
      <div
        className="outerbox"
        style={{
          backgroundColor: backgroundColor, // Use the dynamically updated backgroundColor
          width: value,
          height: 200,
        }}
      >
        {/* Display the test ID */}

        <p>{`Value: ${value}`}</p>
      </div>
    );
  }
  console.log(value);

  return (
    <div
      className="outerbox"
      style={{
        backgroundColor: backgroundColor, // Use the dynamically updated backgroundColor
        width: width,
        height: width,
      }}
    >
      {/* Display the test ID */}

      <p>{`Value: ${value}`}</p>
    </div>
  );
};

export default Outerbox;
