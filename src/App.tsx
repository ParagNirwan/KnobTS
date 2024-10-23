import { useState } from "react";
import "./App.css";
import Outerbox from "./Components/outerbox";
import CustomKnob from "./Components/customKnob";

function App() {
  return (
    <>
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
          <CustomKnob />
        </div>
      </div>
    </>
  );
}

export default App;
