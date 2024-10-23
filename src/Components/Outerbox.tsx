import React from "react";
import Innerbox from "./innerbox";

const Outerbox = () => {
  return (
    <div className="outerbox" style={{ backgroundColor: "green" }}>
      <Innerbox />
    </div>
  );
};

export default Outerbox;
