import React from "react";
import { Knob, Pointer, Value, Scale, Arc } from "rc-knob";
const CustomKnob = () => {
  return (
    <>
      <Knob
        size={200}
        angleOffset={220}
        angleRange={280}
        steps={20}
        min={-100}
        max={100}
        onChange={(value: any) => console.log(value)}
      >
        <Scale tickWidth={4} tickHeight={5} radius={90} color="green" />
        <circle r="60" cx="100" cy="100" fill="#FC5A96" />
        <Pointer
          width={2}
          height={70}
          radius={10}
          type="rect"
          color="#FC5A96"
        />
        <Value marginBottom={0} className="value" />
      </Knob>
    </>
  );
};

export default CustomKnob;
