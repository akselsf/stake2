import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <p style={{ margin: 5 }} className={"text-4xl font-bold mt-5"}>
        Gamble.com
      </p>
      <Button onClick={() => signIn()} margin={5} padding={5}>
        Log in / Registrer
      </Button>
    </div>
  );
};
export default Login;
