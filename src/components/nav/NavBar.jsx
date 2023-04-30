import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button, Heading } from "@chakra-ui/react";

const NavBar = (props) => {
  return (
    <div
      className={"h-24 w-full flex items-center justify-between"}
      style={{ backgroundColor: "white" }}
    >
      <Heading marginLeft={10} size="lg" fontSize="50px">
        Gamble.com
      </Heading>

      <div className="flex items-center justify-end">
        <p className={"m-5 mr-2 text-xl font-semibold"}>
          ${Math.round(props.balance * 100) / 100}
        </p>
        <Button
          onClick={() => props.showWithdraw()}
          marginLeft={5}
          colorScheme="purple"
        >
          Withdraw
        </Button>

        <Button
          onClick={() => props.showDeposit()}
          margin={5}
          colorScheme="purple"
        >
          Deposit
        </Button>

        <Button onClick={() => signOut()} marginRight={20} colorScheme="red">
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
