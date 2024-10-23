import Innerbox from "./Innerbox";

const Outerbox = () => {
  return (
    <div
      className="outerbox"
      style={{
        backgroundColor: "hsl(0, 100%, 20%)",
      }}
    >
      <Innerbox />
    </div>
  );
};

export default Outerbox;
