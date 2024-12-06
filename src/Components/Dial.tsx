import React, { useState, useRef } from "react";
import "./Dial.css";

const Dial = ({ min, max, onChange, finite = false }) => {
  const [value, setValue] = useState(min || 0); // Default to 0 if min is not provided
  const [rotation, setRotation] = useState(0); // Start at 0 degrees
  const dialRef = useRef(null);

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

    if (normalizedAngle < -180) normalizedAngle += 360;
    if (normalizedAngle > 180) normalizedAngle -= 360;

    if (finite) {
      // Restrict rotation to -140 to 140 degrees
      normalizedAngle = Math.max(-140, Math.min(140, normalizedAngle));
      setRotation(normalizedAngle);

      if (min !== undefined && max !== undefined) {
        // Map the angle to the value range
        const range = max - min;
        const newValue = ((normalizedAngle + 140) / 280) * range + min; // Map -140 to 140 degrees to min-max range
        setValue(newValue);
        if (onChange) onChange(Math.round(newValue));
      }
    } else {
      // Infinite rotation
      const deltaAngle = normalizedAngle - rotation;
      setRotation(rotation + deltaAngle);
      const newValue = value + deltaAngle; // Adjust value freely
      setValue(newValue);
      if (onChange) onChange(Math.round(newValue));
    }
  };

  const handleEnd = () => {
    document.removeEventListener("mousemove", handleRotate);
    document.removeEventListener("touchmove", handleRotate);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchend", handleEnd);
  };

  const handleStart = (event) => {
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
