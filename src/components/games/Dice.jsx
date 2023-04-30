import { useState } from "react";
import TargetInfo from "./dice/TargetInfo";
import RollBar from "./dice/RollBar";
import { Button, Box, Heading, Text, Input, Select } from "@chakra-ui/react";
const Dice = (props) => {
  const [squareHeight, setSquareHeight] = useState(70);

  const [betamount, setBetAmount] = useState(0);
  const [target, setTarget] = useState(0.5);
  const [ingame, setIngame] = useState(false);
  const [gameMultiplier, setGameMultiplier] = useState(0);
  const [gameResult, setGameResult] = useState(0);
  const [canSendReq, setCanSendReq] = useState(true);
  const [gameReward, setGameReward] = useState(0);
  const [aboveTarget, setAboveTarget] = useState(true);
  const [rollresult, setRollResult] = useState(0);

  const handleTargetChange = (e) => {
    if (ingame) return;
    setTarget(e.target.value);
  };
  const handleBetAmountChange = (e) => {
    if (ingame) return;
    setBetAmount(e.target.value);
  };
  const handleAboveTargetChange = (e) => {
    if (ingame) return;
    console.log(aboveTarget);
    setAboveTarget(e.target.value == "1" ? true : false);
  };

  const startGame = async () => {
    if (!canSendReq) return;
    setCanSendReq(false);
    setIngame(true);
    const res = await fetch("/api/games/dice/start", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        target: target,
        above: aboveTarget,
        betamount: betamount,
      }),
    }).then((res) => res.json());
    setCanSendReq(true);
    setIngame(false);
    if (res.errormessage) {
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }
    if (res.gameinfo) {
      console.log(res.gameinfo);
      props.setBalance(res.gameinfo.userbalance);
      setGameMultiplier(res.gameinfo.multiplier);
      setGameResult(res.gameinfo.result);
      setGameReward(res.gameinfo.reward);
      setRollResult(res.gameinfo.rollresult);
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="30px">
      {/*<div
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
          <p className={"text-lg font-bold "}>Roll</p>
          <div>
            <button
              style={{
                width: "50%",
                backgroundColor: aboveTarget ? "#e4b7e5" : "#9A48D0",
                border: "1px solid #63458A",
              }}
              onClick={() => {
                setAboveTarget(true);
              }}
            >
              Above
            </button>
            <button
              style={{
                width: "50%",
                border: "1px solid #63458A",
                backgroundColor: aboveTarget ? "#9A48D0" : "#e4b7e5",
              }}
              onClick={() => {
                setAboveTarget(false);
              }}
            >
              Below
            </button>
          </div>
          <input
            disabled={ingame}
            onChange={(e) => {
              handleTargetChange(e);
            }}
            type="text"
            placeholder={"0.5"}
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
            placeholder={betamount}
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
        <RollBar
          aboveTarget={aboveTarget}
          rollresult={rollresult}
          target={target}
        />
        {rollresult != 0 ? (
          <p
            className={"text-xl font-bold"}
            style={{
              color: gameResult ? "darkgreen" : "darkred",
              marginTop: "10px",
            }}
          >
            ${gameReward}
          </p>
        ) : (
          <></>
        )}
        <TargetInfo target={target} aboveTarget={aboveTarget} />
      </div>
    </div>
     */}
      <Box
        position={"relative"}
        borderWidth="1px"
        borderRadius="lg"
        height={"370px"}
        width={"240px"}
        marginRight={"5px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        shadow={"lg"}
      >
        <Heading size={"md"} marginTop={5}>
          Config
        </Heading>
        <Box marginTop={3} width={"80%"}>
          <Text fontSize={"md"}>Roll</Text>
          <Select
            size="sm"
            borderColor={"purple"}
            disabled={ingame}
            focusBorderColor="purple"
            marginBottom={1}
            borderRadius={5}
            onChange={(e) => {
              handleAboveTargetChange(e);
            }}
          >
            <option value="1">Above</option>
            <option value="0">Below</option>
          </Select>
          <Input
            disabled={ingame}
            onChange={(e) => {
              handleTargetChange(e);
            }}
            type="text"
            placeholder={"0.5"}
            borderColor={"purple"}
            isDisabled={ingame}
            focusBorderColor="purple"
          ></Input>
        </Box>
        <Box marginTop={3} width={"80%"}>
          <Text fontSize={"md"}>Bet</Text>
          <Input
            borderColor={"purple"}
            disabled={ingame}
            focusBorderColor="purple"
            onChange={(e) => {
              handleBetAmountChange(e);
            }}
            type="text"
            placeholder={0}
          ></Input>
        </Box>

        <Button
          position={"absolute"}
          colorScheme="purple"
          bottom={5}
          onClick={
            ingame
              ? () => {}
              : () => {
                  startGame();
                }
          }
          isDisabled={ingame}
        >
          {ingame ? "Wait" : "Bet"}
        </Button>
      </Box>
      <Box
        position={"relative"}
        borderWidth="1px"
        borderRadius="lg"
        height={"370px"}
        width={"370px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        shadow={"lg"}
      >
        <RollBar
          aboveTarget={aboveTarget}
          target={target}
          rollresult={rollresult}
        />
        {rollresult != 0 ? (
          <p
            className={"text-xl font-bold"}
            style={{
              color: gameResult ? "darkgreen" : "darkred",
              marginTop: "10px",
            }}
          >
            ${gameReward}
          </p>
        ) : (
          <></>
        )}
        <TargetInfo target={target} aboveTarget={aboveTarget} />
      </Box>
    </Box>
  );
};

export default Dice;
