import { Box, Text, Input, Heading, Button } from "@chakra-ui/react";
import { GiClubs, GiHearts, GiDiamonds, GiSpades } from "react-icons/gi";
import { useState } from "react";

const Hilo = (props) => {
  const [betAmount, setBetAmount] = useState(0);
  const [ingame, setIngame] = useState(false);
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  const [canSendReq, setCanSendReq] = useState(true);
  const [allCards, setAllCards] = useState([{ card: 1, type: 1 }]);
  const [cardChance, setCardChance] = useState({ lower: 0, higher: 0 });
  const handleBetAmountChange = (e) => {
    if (ingame) return;
    setBetAmount(e.target.value);
  };

  const getCurrentCard = () => {
    if (allCards.length === 0) return { card: 0 };
    return allCards[allCards.length - 1];
  };

  const getCardIcon = (card) => {
    switch (card) {
      case 0:
        return <GiSpades size={50} color="black" />;
      case 1:
        return <GiHearts size={50} color="red" />;
      case 2:
        return <GiDiamonds size={50} color="red" />;
      case 3:
        return <GiClubs size={50} color="black" />;
      default:
        return <></>;
    }
  };

  const cardnumToName = (cardnum) => {
    if (cardnum === 1) return "A";
    if (cardnum === 11) return "J";
    if (cardnum === 12) return "Q";
    if (cardnum === 13) return "K";
    return cardnum;
  };

  const cashOut = async () => {
    if (!ingame) return;
    setCanSendReq(false);
    const res = await fetch("/api/games/hilo/cashout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    setCanSendReq(true);

    if (res.errormessage) {
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }
    if (res.gameinfo) {
      props.setBalance(res.gameinfo.userbalance);
      setAllCards(res.gameinfo.allcards);
      setIngame(false);
    }
  };

  const chooseOption = async (option) => {
    if (!ingame) return;
    setCanSendReq(false);
    const res = await fetch("/api/games/hilo/choose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        option: option,
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
      props.setBalance(res.gameinfo.userbalance);
      setAllCards(res.gameinfo.allcards);
      if (res.gameinfo.gameover) {
        setIngame(false);
      } else {
        setCardChance(
          res.gameinfo.chance ? res.gameinfo.chance : { lower: 0, higher: 0 }
        );
      }
      setCurrentMultiplier(res.gameinfo.currentmultiplier);
    }
  };

  const startGame = async () => {
    if (ingame) return;
    setCanSendReq(false);
    setIngame(true);
    setCurrentMultiplier(1);

    const res = await fetch("/api/games/hilo/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        betamount: betAmount,
      }),
    }).then((res) => res.json());
    setCanSendReq(true);
    if (res.errormessage) {
      setIngame(false);
      setCurrentMultiplier(1);
      setCardChance({ lower: 0, higher: 0 });
      props.setError(res.errormessage);
      return;
    } else {
      props.setError("");
    }
    if (res.gameinfo) {
      props.setBalance(res.gameinfo.userbalance);

      setAllCards(res.gameinfo.allcards);

      setCardChance(
        res.gameinfo.chance ? res.gameinfo.chance : { lower: 0, higher: 0 }
      );

      setCurrentMultiplier(res.gameinfo.currentmultiplier);
    }
    setCanSendReq(true);
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
        {ingame ? (
          <Box marginTop={5} width={"80%"}>
            <Button
              margin={1}
              width={"100%"}
              colorScheme="purple"
              isDisabled={!canSendReq || !ingame}
              onClick={() => {
                chooseOption("lower");
              }}
            >
              {getCurrentCard().card == 1
                ? "Same"
                : "Lower" + (getCurrentCard().card != 13 ? "/Same" : "")}
            </Button>
            <Button
              margin={1}
              width={"100%"}
              colorScheme="purple"
              isDisabled={!canSendReq || !ingame}
              onClick={() => {
                chooseOption("higher");
              }}
            >
              {getCurrentCard().card == 13
                ? "Same"
                : "Higher" + (getCurrentCard().card != 1 ? "/Same" : "")}
            </Button>

            <Button
              margin={1}
              width={"100%"}
              colorScheme="purple"
              isDisabled={!canSendReq || !ingame}
              onClick={() => {
                chooseOption("skip");
              }}
            >
              Skip
            </Button>
          </Box>
        ) : (
          <></>
        )}
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
          isDisabled={(ingame && currentMultiplier <= 1) || !canSendReq}
        >
          {ingame ? "Cash out" : "Bet"}
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
        <Box
          overflowX="scroll"
          width="370px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            height="100%"
          >
            {[...allCards].reverse().map((card, i) => {
              return (
                <Box
                  key={i}
                  color={card.skipped ? "gray" : "green"}
                  height={200 * (i === 0 ? 1 : 0.8) + "px"}
                  width={120 * (i === 0 ? 1 : 0.8) + "px"}
                  display={"flex"}
                  border={"1px solid black"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  position={"relative"}
                  borderRadius={10}
                  margin={2}
                  marginLeft={i === 0 ? 370 / 2 - 120 / 2 + "px" : 0}
                  marginRight={i === allCards.length - 1 ? 5 : 2}
                >
                  <Heading
                    position={"absolute"}
                    top={"0"}
                    left={"0"}
                    padding={2}
                  >
                    {cardnumToName(card.card)}
                  </Heading>
                  <Heading
                    position={"absolute"}
                    bottom={"0"}
                    right={"0"}
                    padding={2}
                  >
                    {cardnumToName(card.card)}
                  </Heading>
                  {getCardIcon(card.type)}
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          marginTop={3}
        >
          {!ingame && allCards.length == 1 ? (
            <></>
          ) : (
            <Text
              fontWeight={"bold"}
              color={
                currentMultiplier == 1
                  ? "black"
                  : currentMultiplier == 0
                  ? "red"
                  : "green"
              }
            >
              {ingame ? "Current" : "Result"} : {currentMultiplier}x
            </Text>
          )}
          {ingame ? (
            <Box>
              <Text fontWeight={"bold"}>
                {getCurrentCard().card == 1
                  ? "Same"
                  : "Lower" + (getCurrentCard().card != 13 ? "/Same" : "")}
                : {Math.round(Number(cardChance.lower) * 10000) / 100}%
              </Text>
              <Text fontWeight={"bold"}>
                {getCurrentCard().card == 13
                  ? "Same"
                  : "Higher" + (getCurrentCard().card != 1 ? "/Same" : "")}
                : {Math.round(Number(cardChance.higher) * 10000) / 100}%
              </Text>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Hilo;
