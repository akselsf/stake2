import { signIn } from "next-auth/react";
import { Button, Box, Heading } from "@chakra-ui/react";
const Login = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Heading marginBottom={5} size={"2xl"}>
        Gamble.com
      </Heading>
      <Button colorScheme="gray" onClick={() => signIn()}>
        Log in / Registrer
      </Button>
    </Box>
  );
};
export default Login;
