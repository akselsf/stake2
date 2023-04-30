import NavBar from "./nav/NavBar";
import MainPageMain from "./MainPageMain";
import { useEffect, useState } from "react";
import DepositPopup from "./nav/DepositPopup";
import WithdrawPopup from "./nav/WithdrawPopup";
import GameCards from "./GameCards";
import { ChakraProvider } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

import getBalance from "@/functions/getBalance";
const MainPage = (props) => {
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    getBalance().then((res) => {
      setBalance(res);
    });
  }, []);

  const showDeposit = () => {
    setWithdrawOpen(false);
    setDepositOpen(true);
  };
  const showWithdraw = () => {
    setDepositOpen(false);
    setWithdrawOpen(true);
  };
  const resetPopup = () => {
    setDepositOpen(false);
    setWithdrawOpen(false);
  };

  return (
    <ChakraProvider>
      <NavBar
        balance={balance}
        showWithdraw={showWithdraw}
        setBalance={setBalance}
        showDeposit={showDeposit}
      />
      <Divider orientation="horizontal" color={"purple"} opacity={1} />
      {depositOpen ? (
        <DepositPopup setBalance={setBalance} close={resetPopup} />
      ) : null}
      {withdrawOpen ? (
        <WithdrawPopup setBalance={setBalance} close={resetPopup} />
      ) : null}
      {props.gametitle ? (
        <MainPageMain setBalance={setBalance} gametitle={props.gametitle} />
      ) : (
        <GameCards />
      )}
    </ChakraProvider>
  );
};

export default MainPage;
