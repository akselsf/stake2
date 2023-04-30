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
        e.target.style.animation = "wave 1s";

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
        }

        setBoard(b);

        setTimeout(() => {
          e.target.style.animation = "";
        }, 1000);
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
      {/*
      <div
        style={{
          width: "200px",
          height: "370px",
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
          <p className={"text-lg font-bold "}>Mines</p>
          <input
            onChange={(e) => {
              handleMineCountChange(e);
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

        {multiplier != "" ? <p>{multiplier}</p> : <></>}
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
              ? () => {
                  cashOut();
                }
              : () => {
                  startGame();
                }
          }
        >
          {ingame ? "Cash out" : "Bet"}
        </button>
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
