const RollBar = (props) => {
  return (
    <div
      style={{
        height: "20px",
        width: "300px",
        backgroundColor: props.aboveTarget ? "darkgreen" : "darkred",
        boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "100%",
          width: props.target * 300 + "px",
          backgroundColor: props.aboveTarget ? "darkred" : "darkgreen",
        }}
      ></div>
      {props.rollresult != 0 ? (
        <div
          style={{
            height: "20px",
            width: "3px",
            backgroundColor: "white",
            position: "absolute",
            zIndex: 100,
            left: props.rollresult * 300 - 1.5 + "px",
            margin: "0px",
            padding: "0px",
            top: "0px",
          }}
        ></div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RollBar;
