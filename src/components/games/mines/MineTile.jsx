import { Box, Button } from "@chakra-ui/react";
const MineTile = (props) => {
  return (
    <Button
      isDisabled={!props.canSendReq}
      onClick={(e) => {
        e.target.style.animation = "wave 1s";
        setTimeout(() => {
          e.target.style.animation = "";
        }, 1000);
        props.handleClick(e, props.value);
      }}
      _hover={{ backgroundColor: "purple" }}
      key={props.value}
      _disabled={{ opacity: 1, cursor: "not-allowed" }}
      width="70px"
      height="70px"
      margin="2px"
      borderRadius="10px"
      backgroundColor={
        props.board[props.value] == 0
          ? "purple"
          : props.board[props.value] == 1
          ? "green"
          : "red"
      }
      className={"hover:cursor-pointer shadow-md"}
    ></Button>
  );
};
export default MineTile;
