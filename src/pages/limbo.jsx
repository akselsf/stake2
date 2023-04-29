import Mines from "@/components/games/Mines";
import MainPage from "@/components/MainPage";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Limbo from "@/components/games/Limbo";
const LimboPage = () => {
  const { data: session } = useSession();

  return session ? <MainPage gametitle={"Limbo"} /> : <Login />;
};

export default LimboPage;
