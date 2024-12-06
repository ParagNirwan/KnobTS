import React, { useState, useRef } from "react";
import "./Dial.css";

const Dial = ({ min = 0, onChange }) => {
  const [value, setValue] = useState(min); // Start from the min value or 0
  const [rotation, setRotation] = useState(0); // Initial rotation state
  const dialRef = useRef(null);
  const previousAngle = useRef(0);

  const handleRotate = (event) => {
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if (event.type === "mousemove") {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event.type === "touchmove") {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    const angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    let normalizedAngle = angle - 90; // Adjust for default angle offset

    if (normalizedAngle < 0) normalizedAngle += 360;

    // Calculate the difference between the current and previous angle
    const deltaAngle = normalizedAngle - previousAngle.current;

    // Handle crossing the 0-degree line
    const adjustedDeltaAngle =
      deltaAngle > 180
        ? deltaAngle - 360
        : deltaAngle < -180
        ? deltaAngle + 360
        : deltaAngle;

    previousAngle.current = normalizedAngle; // Update previous angle

    // Update rotation and value
    setRotation((prev) => prev + adjustedDeltaAngle);
    setValue((prev) => {
      const newValue = prev + adjustedDeltaAngle;
      if (onChange) onChange(Math.round(newValue));
      return newValue;
    });
  };

  const handleEnd = () => {
    document.removeEventListener("mousemove", handleRotate);
    document.removeEventListener("touchmove", handleRotate);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchend", handleEnd);
  };

  const handleStart = (event) => {
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let clientX, clientY;
    if (event.type === "mousedown") {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event.type === "touchstart") {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    }

    // Calculate initial angle
    const angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
    let normalizedAngle = angle - 90;
    if (normalizedAngle < 0) normalizedAngle += 360;

    previousAngle.current = normalizedAngle; // Initialize the previous angle
    document.addEventListener("mousemove", handleRotate);
    document.addEventListener("touchmove", handleRotate);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);
  };

  return (
    <div className="dial-container">
      <div
        className="dial"
        ref={dialRef}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className="dial-indicator"></div>
      </div>
      <div className="dial-value">{Math.round(value)}</div>
    </div>
  );
};

export default Dial;
