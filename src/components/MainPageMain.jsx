import Mines from "./games/Mines";
import Limbo from "./games/Limbo";
import Dice from "./games/Dice";
const MainPageMain = (props) => {
  let game = <></>;
  switch (props.gametitle) {
    case "Mines":
      game = <Mines setBalance={props.setBalance} />;
      break;
    case "Limbo":
      game = <Limbo setBalance={props.setBalance} />;
      break;
    case "Dice":
      game = <Dice setBalance={props.setBalance} />;
      break;
    default:
  }
  return (
    <div>
      <h1
        className="text-4xl text-center font-bold"
        style={{ marginTop: "20px" }}
      >
        {props.gametitle}
      </h1>
      {game}
    </div>
  );
};
export default MainPageMain;
