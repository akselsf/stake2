const TargetInfo = (props) => {
  const getMultiplier = (target, above) => {
    return Math.round((above ? 1 / (1 - target) : 1 / target) * 100) / 100;
  };
  const getChance = (target, above) => {
    return Math.round((above ? 1 - target : target) * 100000) / 1000;
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
        Return: {getMultiplier(props.target, props.aboveTarget)}x
      </p>
      <p
        style={{
          width: "50%",
          textAlign: "center",
        }}
      >
        Chance: {getChance(props.target, props.aboveTarget)}%
      </p>
    </div>
  );
};

export default TargetInfo;
