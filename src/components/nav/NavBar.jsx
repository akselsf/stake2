import { signOut } from "next-auth/react";

import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import getBalance from "@/functions/getBalance";
import { ChevronDownIcon } from "@chakra-ui/icons";
import DepositPopup from "./DepositPopup";
import WithdrawPopup from "./WithdrawPopup";

const NavBar = (props) => {
  return (
    <div
      className={"h-24 w-full flex items-center justify-between"}
      style={{ backgroundColor: "white" }}
    >
      <Heading marginLeft={10} size="2xl">
        Gamble.com
      </Heading>

      <div className="flex items-center justify-end">
        <p className={"m-5 mr-2 text-xl font-semibold"}>
          ${Math.round(props.balance * 100) / 100}
        </p>
        <Menu>
          <MenuButton
            marginLeft={5}
            as={Button}
            rightIcon={<ChevronDownIcon />}
          >
            Games
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="/Mines" position={"relative"}>
                Mines
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/limbo" position={"relative"}>
                Limbo
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="/dice" position={"relative"}>
                Dice
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
        <WithdrawPopup setBalance={props.setBalance} />
        <DepositPopup setBalance={props.setBalance} />

        <Button onClick={() => signOut()} marginRight={20} colorScheme="red">
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
