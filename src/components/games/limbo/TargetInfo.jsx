const TargetInfo = (props) => {
  const getMultiplier = (target) => {
    return target;
  };
  const getChance = (target) => {
    return Math.round((1 / target) * 100000) / 1000;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "50px",
        backgroundColor: "#9A48D0",

        border: "1px solid #63458A",
        borderRadius: "10px",
        position: "absolute",
        bottom: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          width: "50%",
          textAlign: "center",
        }}
      >
        Return: {getMultiplier(props.target)}x
      </p>
      <p
        style={{
          width: "50%",
          textAlign: "center",
        }}
      >
        Chance: {getChance(props.target)}%
      </p>
    </div>
  );
};

export default TargetInfo;
