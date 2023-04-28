import Mines from "@/components/games/Mines";
import MainPage from "@/components/MainPage";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Limbo from "@/components/games/Limbo";
const dice = () => {
  const { data: session } = useSession();

  return session ? <MainPage gametitle={"Dice"} /> : <Login />;
};

export default dice;
