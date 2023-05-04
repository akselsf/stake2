import Mines from "@/components/games/Mines";
import MainPage from "@/components/MainPage";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Store from "@/components/Store";
const StorePage = () => {
  const { data: session } = useSession();

  return session ? (
    <MainPage game={<Store />} gametitle={"Store"} />
  ) : (
    <Login />
  );
};

export default StorePage;
