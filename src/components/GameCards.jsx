import GameCard from "./GameCard";
const GameCards = () => {
  const games = ["Mines", "Limbo", "Dice"];
  return (
    <div
      style={{
        width: "100%",

        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "flex-wrap",
      }}
    >
      {games.map((game) => {
        return <GameCard gamename={game} />;
      })}
    </div>
  );
};
export default GameCards;
