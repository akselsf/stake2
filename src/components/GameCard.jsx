const GameCard = (props) => {
  return (
    <div
      style={{
        width: "200px",
        height: "200px",
        backgroundColor: "#9A48D0",
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <a
        href={`/${props.gamename.toLowerCase()}`}
        className={"text-lg font-bold"}
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {props.gamename}
      </a>
    </div>
  );
};

export default GameCard;
