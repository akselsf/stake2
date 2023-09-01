import NavBar from "./nav/NavBar";
import MainPageMain from "./MainPageMain";
import { useEffect, useState } from "react";

import GameCards from "./GameCards";
import { ChakraProvider } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import getBalance from "@/functions/getBalance";

const MainPage = (props) => {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    getBalance().then((res) => {
      setBalance(res);
    });
  }, []);
  return (
    <ChakraProvider>
      <NavBar balance={balance} setBalance={setBalance} />
      <Divider orientation="horizontal" color={"purple"} opacity={1} />

      {props.gametitle ? (
        <MainPageMain setBalance={setBalance} gametitle={props.gametitle} />
      ) : (
        <GameCards />
      )}
    </ChakraProvider>
  );
};

export default MainPage;
