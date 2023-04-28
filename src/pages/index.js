import { signIn, useSession } from "next-auth/react";
import MainPage from "../components/MainPage";
import Login from "../components/Login";

export default function Component() {
  const { data: session } = useSession();

  return <div>{session ? <MainPage /> : <Login />}</div>;
}
