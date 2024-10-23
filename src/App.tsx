import { useState } from "react";
import "./App.css";
import Innerbox from "./Components/innerbox";
import Outerbox from "./Components/outerbox";
import { Knob, Pointer, Value, Scale, Arc } from "rc-knob";
function App() {
  return (
    <>
      <div className="container">
        <div className="leftSide">
          <Outerbox />
        </div>

        <div className="rightSide">
          <Knob
            size={100}
            angleOffset={220}
            angleRange={280}
            steps={10}
            min={-100}
            max={100}
            onChange={(value: any) => console.log(value)}
          >
            <Scale tickWidth={2} tickHeight={2} radius={45} />
            <circle r="35" cx="50" cy="50" fill="#FC5A96" />
            <Pointer
              width={2}
              height={35}
              radius={10}
              type="rect"
              color="#FC5A96"
            />
          </Knob>
        </div>
      </div>
    </>
  );
}

export default App;
