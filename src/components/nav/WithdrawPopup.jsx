import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FormLabel, Input } from "@chakra-ui/react";

const WithdrawPopup = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  let amount = 0;

  const deposit = async (amount) => {
    await fetch("/api/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.balance !== undefined) {
          props.setBalance(data.balance);
        }
      });
  };
  return (
    <>
      <Button colorScheme={"purple"} onClick={onOpen} marginLeft={5}>
        Withdraw
      </Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={"300px"}>
          <ModalHeader margin={"0 auto"}>Withdraw</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pb={6}
            display="flex"
            flexDir={"column"}
            alignItems={"center"}
          >
            <FormLabel>Amount</FormLabel>
            <Input
              ref={initialRef}
              width={"90%"}
              onChange={(e) => (amount = e.target.value)}
              placeholder="Amount"
            />
          </ModalBody>

          <ModalFooter display="flex" justifyContent={"center"}>
            <Button
              colorScheme="purple"
              onClick={() => {
                onClose();
                deposit(amount);
              }}
              mr={3}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithdrawPopup;
