import { useSession } from "next-auth/react";
import MainPage from "@/components/MainPage";
import Login from "@/components/Login";

const HiloPage = () => {
  const { data: session } = useSession();

  return session ? <MainPage gametitle={"Hilo"} /> : <Login />;
};
export default HiloPage;
