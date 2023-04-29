import Mines from "@/components/games/Mines";
import MainPage from "@/components/MainPage";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
const MinesPage = () => {
  const { data: session } = useSession();

  return session ? (
    <MainPage game={<Mines />} gametitle={"Mines"} />
  ) : (
    <Login />
  );
};

export default MinesPage;
