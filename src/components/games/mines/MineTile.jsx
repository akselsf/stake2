import { Box, Button, Spinner } from "@chakra-ui/react";
const MineTile = (props) => {
  return (
    <Button
      isDisabled={!props.canSendReq}
      onClick={(e) => {
        
        props.handleClick(e, props.value);
      }}
      _hover={
        props.board[props.value] == 0
          ? "purple"
          : props.board[props.value] == 1
          ? "green"
          : "red"
      }
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
    >
      {!props.canSendReq ? <Spinner></Spinner> : <></> }
    </Button>
  );
};
export default MineTile;
