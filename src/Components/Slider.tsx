import React, { useState } from "react";
import "./Slider.css";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue || min);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <span>{value}</span>
    </div>
  );
};

export default Slider;
