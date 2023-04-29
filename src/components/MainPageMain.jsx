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
      <GameCards type={"column"} />
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
            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Error </strong>
            <span class="block sm:inline">{errorMsg}</span>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500 hover:cursor-pointer"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => {
                  setErrorMsg("");
                }}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
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
