import { useState } from "react";
import TargetInfo from "./limbo/TargetInfo";
const Mines = (props) => {
  const [squareHeight, setSquareHeight] = useState(70);
  let mineCount = 1;
  let betAmount = 0;

  const [betamount, setBetAmount] = useState(0);
  const [targetMultiplier, setTargetMultiplier] = useState(0);
  const [ingame, setIngame] = useState(false);
  const [gameMultiplier, setGameMultiplier] = useState(0);
  const [gameResult, setGameResult] = useState(0);
  const [canSendReq, setCanSendReq] = useState(true);
  const [gameReward, setGameReward] = useState(0);

  const handleTargetMultiplierChange = (e) => {
    if (ingame) return;
    if (e.target.value[0] == 0 || "-" == e.target.value[0]) {
      setTargetMultiplier(1.01);
      e.target.value = 1.01;
      return;
    }
    setTargetMultiplier(e.target.value);
  };
  const handleBetAmountChange = (e) => {
    if (ingame) return;
    setBetAmount(e.target.value);
  };

  const startGame = async () => {
    if (!canSendReq) return;
    setCanSendReq(false);
    setIngame(true);
    const res = await fetch("/api/games/limbo/start", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        targetmultiplier: targetMultiplier,
        betamount: betamount,
      }),
    }).then((res) => res.json());
    setCanSendReq(true);
    setIngame(false);
    if (res.gameinfo) {
      console.log(res.gameinfo);
      props.setBalance(res.gameinfo.userbalance);
      setGameMultiplier(res.gameinfo.multiplier);
      setGameResult(res.gameinfo.result);
      setGameReward(res.gameinfo.reward);
    }
  };

  return (
    <div
      style={{
        color: "black",
        display: "flex",
        justifyContent: "center",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          width: "200px",
          height: `${squareHeight * 5 + 2 * 10}px`,
          backgroundColor: "#9A48D0",
          border: "1px solid #63458A",
          borderRadius: "10px",
          marginRight: "5px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ marginTop: "25px" }} className={"text-2xl font-bold "}>
          Config
        </p>
        <div>
          <p className={"text-lg font-bold "}>Target multiplier</p>
          <input
            onChange={(e) => {
              handleTargetMultiplierChange(e);
            }}
            disabled={ingame}
            type="text"
            placeholder={mineCount}
            className={
              "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            }
          ></input>
        </div>
        <div>
          <p className={"text-lg font-bold "}>Bet</p>
          <input
            disabled={ingame}
            onChange={(e) => {
              handleBetAmountChange(e);
            }}
            type="text"
            placeholder={betAmount}
            className={
              "text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            }
          ></input>
        </div>

        <button
          className={
            " hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          }
          style={{
            backgroundColor: "#588157",
            color: "white",
            marginBottom: "30px",
          }}
          onClick={
            ingame
              ? () => {}
              : () => {
                  startGame();
                }
          }
        >
          {ingame ? "Wait" : "Bet"}
        </button>
      </div>
      <div
        style={{
          width: "370px",
          height: "370px",
          padding: "10px",
          backgroundColor: "#9A48D0",
          border: "1px solid #63458A",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <p
          className={"text-4xl font-bold"}
          style={{
            color: gameResult ? "darkgreen" : "darkred",
            marginBottom: "10px",
          }}
        >
          {gameMultiplier}x
        </p>
        <p
          className={"text-xl font-bold"}
          style={{ color: gameResult ? "darkgreen" : "darkred" }}
        >
          + ${gameReward}
        </p>
        <TargetInfo target={targetMultiplier} />
      </div>
    </div>
  );
};

export default Mines;
