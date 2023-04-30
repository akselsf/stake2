import { useState } from "react";
import TargetInfo from "./limbo/TargetInfo";

import { Button, Box, Heading, Text, Input } from "@chakra-ui/react";
const Limbo = (props) => {
  let betAmount = 0;

  const [betamount, setBetAmount] = useState(0);
  const [targetMultiplier, setTargetMultiplier] = useState(0);
  const [ingame, setIngame] = useState(false);
  const [gameMultiplier, setGameMultiplier] = useState(0);
  const [gameResult, setGameResult] = useState(0);
  const [canSendReq, setCanSendReq] = useState(true);
  const [gameReward, setGameReward] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);

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
    if (res.errormessage) {
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }

    if (res.gameinfo) {
      props.setBalance(res.gameinfo.userbalance);
      setGameMultiplier(res.gameinfo.multiplier);
      setGameResult(res.gameinfo.result);
      setGameReward(res.gameinfo.reward);
      let g = [...gameHistory];
      g.push({
        multiplier: res.gameinfo.multiplier,
        result: res.gameinfo.result,
      });
      setGameHistory(g);
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginTop="30px">
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
          <Text fontSize={"md"}>Target</Text>
          <Input
            borderColor={"purple"}
            disabled={ingame}
            focusBorderColor="purple"
            onChange={(e) => {
              handleTargetMultiplierChange(e);
            }}
            type="text"
            placeholder={2}
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
        <Heading size={"2xl"} color={gameResult ? "green" : "red"} margin={3}>
          {gameMultiplier}x
        </Heading>
        <Heading size={"md"} color={gameResult ? "green" : "red"}>
          + ${gameReward}
        </Heading>

        <TargetInfo target={targetMultiplier} />
      </Box>
    </Box>
  );
};

export default Limbo;
