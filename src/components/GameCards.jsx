import GameCard from "./GameCard";
const GameCards = (props) => {
  const games = ["Mines", "Limbo", "Dice", "Plinko", "Hilo"];
  return (
    <div
      style={{
        position: "absolute",
        width: props.type == "column" ? "200px" : "100%",
        marginTop: props.type == "column" ? "10px" : "100px",
        borderRight: props.type == "column" ? "1px solid #63458A" : "",
        display: "flex",
        left: props.type == "column" ? "0px" : "",
        justifySelf: props.type == "column" ? "flex-start" : "center",
        justifyContent: "center",

        flexWrap: "wrap",
      }}
    >
      {games.map((game) => {
        return <GameCard key={game} gamename={game} />;
      })}
    </div>
  );
};
export default GameCards;
