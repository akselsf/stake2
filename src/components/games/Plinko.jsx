import { useState } from "react";
import { Button, Box, Heading, Text, Input } from "@chakra-ui/react";
import PlinkoGrid from "./plinko/PlinkoGrid";
import { useRef } from "react";
const Plinko = (props) => {
  const ref = useRef();
  const [betamount, setBetAmount] = useState(0);
  const [ingame, setIngame] = useState(false);
  const [gameMultiplier, setGameMultiplier] = useState(0);
  const [gameResult, setGameResult] = useState(0);
  const [canSendReq, setCanSendReq] = useState(true);
  const [gameReward, setGameReward] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [midAnimation, setMidAnimation] = useState(false);

  const handleBetAmountChange = (e) => {
    if (ingame) return;
    setBetAmount(e.target.value);
  };

  const startGame = async () => {
    if (!canSendReq) return;
    setCanSendReq(false);
    setIngame(true);
    const res = await fetch("/api/games/plinko/start", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
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
      setMidAnimation(true);
      ref.current.startAnimation(
        res.gameinfo.directions,
        res.gameinfo.userbalance
      );

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
          isDisabled={ingame || midAnimation || !canSendReq}
        >
          {ingame ? "Wait" : "Bet"}
        </Button>
      </Box>
      <Box
        position={"relative"}
        borderWidth="1px"
        borderRadius="lg"
        height={"370px"}
        width={"500px"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        shadow={"lg"}
      >
        <PlinkoGrid
          setBalance={props.setBalance}
          setMidAnimation={setMidAnimation}
          ref={ref}
        />
      </Box>
    </Box>
  );
};
export default Plinko;
