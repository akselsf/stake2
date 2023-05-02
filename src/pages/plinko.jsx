import Plinko from "@/components/games/Plinko";
import MainPage from "@/components/MainPage";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
const PlinkoPage = () => {
  const { data: session } = useSession();

  return session ? (
    <MainPage game={<Plinko />} gametitle={"Plinko"} />
  ) : (
    <Login />
  );
};

export default PlinkoPage;
