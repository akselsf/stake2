import { useState } from "react";
import MineTile from "./mines/MineTile";
import { Box, Heading, Input, Button, Text } from "@chakra-ui/react";
const Mines = (props) => {
  let mineCount = 1;
  let betAmount = 0;

  const [betamount, setBetAmount] = useState(0);
  const [minecount, setMineCount] = useState(1);
  const [ingame, setIngame] = useState(false);
  const [multiplier, setMultiplier] = useState("");
  const [canSendReq, setCanSendReq] = useState(true);
  const [canCashOut, setCanCashOut] = useState(false);

  const [board, setBoard] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const clickTile = async (e, value) => {
    if (!canSendReq) return;
    if (ingame) {
      setCanSendReq(false);

      const tilevalue = value;
      const gamedata = await fetch("/api/games/mines/clicktile", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          tilevalue: tilevalue,
        }),
      }).then((res) => res.json());
      setCanSendReq(true);
      if (gamedata.errormessage) {
        props.setError(gamedata.errormessage);
        return;
      } else {
        props.setError("");
      }
      if (gamedata.gameinfo) {
   
        setMultiplier(
          `${gamedata.gameinfo.multiplier}x - $${gamedata.gameinfo.reward}`
        );

        let b = [...board];

        gamedata.gameinfo.opened.forEach((tile) => {
          b[Number(tile)] = 1;
        });
        if (gamedata.gameinfo.gameover) {
          setIngame(false);
          gamedata.gameinfo.mines.forEach((tile) => {
            b[Number(tile)] = 2;
          });

          setBoard(b);
          setCanCashOut(false);
        } else {
          setCanCashOut(true);
        }

        setBoard(b);

    
      }
    }
  };
  const handleMineCountChange = (e) => {
    if (ingame) return;
    setMineCount(e.target.value);
  };
  const handleBetAmountChange = (e) => {
    if (ingame) return;
    setBetAmount(e.target.value);
  };

  const startGame = async () => {
    if (!canSendReq) return;
    setCanSendReq(false);
    const res = await fetch("/api/games/mines/start", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        minecount: minecount,
        betamount: betamount,
      }),
    }).then((res) => res.json());
    setCanSendReq(true);
    if (res.errormessage) {
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }

    if (res.gameinfo) {
      setMultiplier(`${res.gameinfo.multiplier}x - $${res.gameinfo.reward}`);
      setIngame(true);
      setCanCashOut(false);

      let b = [];
      for (let i = 0; i < 25; i++) {
        b.push(0);
      }
      setBoard(b);
      props.setBalance(res.gameinfo.userbalance);
    }
  };

  const cashOut = async () => {
    if (!canSendReq) return;
    setCanSendReq(false);
    const res = await fetch("/api/games/mines/cashout", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then((res) => res.json());
    setCanSendReq(true);
    if (res.errormessage) {
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }
    if (res.gameinfo) {
      setCanCashOut(false);
      setIngame(false);
      setMultiplier(
        `Win: ${res.gameinfo.multiplier}x - $${res.gameinfo.reward}`
      );
      let b = [...board];
      res.gameinfo.mines.forEach((tile) => {
        b[Number(tile)] = 2;
      });
      setBoard(b);
      props.setBalance(res.gameinfo.userbalance);
    }
  };

  const getBoard = () => {
    return (
      <div>
        {[0, 1, 2, 3, 4].map((row) => {
          return (
            <div key={row} style={{ display: "flex" }}>
              {[0, 1, 2, 3, 4].map((col) => {
                return (
                  <MineTile
                    canSendReq={canSendReq}
                    board={board}
                    key={row * 5 + col}
                    value={row * 5 + col}
                    handleClick={clickTile}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
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
          <Text fontSize={"md"}>Mines</Text>
          <Input
            borderColor={"purple"}
            disabled={ingame}
            focusBorderColor="purple"
            onChange={(e) => {
              handleMineCountChange(e);
            }}
            type="text"
            placeholder={mineCount}
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
        <Text marginTop={5}>
          {multiplier != "" ? <p>{multiplier}</p> : <></>}
        </Text>

        <Button
          position={"absolute"}
          colorScheme="purple"
          bottom={5}
          isDisabled={(!canCashOut && ingame) || !canSendReq}
          onClick={
            ingame
              ? () => {
                  cashOut();
                }
              : () => {
                  startGame();
                }
          }
        >
          {ingame ? "Cash out" : "Bet"}
        </Button>
      </Box>
      {getBoard()}
    </div>
  );
};

export default Mines;
