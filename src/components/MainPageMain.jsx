import Mines from "./games/Mines";
import Limbo from "./games/Limbo";
import Dice from "./games/Dice";
import GameCards from "./GameCards";
import { useState } from "react";
const MainPageMain = (props) => {
  let game = <></>;
  const [errorMsg, setErrorMsg] = useState("");

  switch (props.gametitle) {
    case "Mines":
      game = <Mines setBalance={props.setBalance} setError={setErrorMsg} />;
      break;
    case "Limbo":
      game = <Limbo setBalance={props.setBalance} setError={setErrorMsg} />;
      break;
    case "Dice":
      game = <Dice setBalance={props.setBalance} setError={setErrorMsg} />;
      break;
    default:
  }
  return (
    <div
      style={{
        display: "flex",
        flexdirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* <GameCards type={"column"} />*/}
      <div
        style={{
          width: "66%",
        }}
      >
        <h1
          className="text-4xl text-center font-bold"
          style={{ marginTop: "20px" }}
        >
          {props.gametitle}
        </h1>
        {errorMsg ? (
          <div
            style={{
              width: "370px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "20px",
            }}
            className="text-red-700 px-4 py-3 text-center"
            role="alert"
          >
            <strong className="font-bold">Error: {errorMsg}</strong>
          </div>
        ) : (
          <></>
        )}
        {game}
      </div>
    </div>
  );
};
export default MainPageMain;
