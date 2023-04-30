import { Box } from "@chakra-ui/react";
const RollBar = (props) => {
  return (
    <Box
      height="20px"
      width="300px"
      bg={props.aboveTarget ? "green" : "red"}
      boxShadow="0px 0px 3px 0px rgba(0000.75)"
      position="relative"
      overflow="hidden"
    >
      <Box
        height="100%"
        width={props.target * 300 + "px"}
        bg={props.aboveTarget ? "red" : "green"}
      ></Box>
      {props.rollresult != 0 ? (
        <Box
          height="20px"
          width="3px"
          bg="white"
          border="1px solid black"
          position="absolute"
          zIndex={3}
          left={props.rollresult * 300 - 1.5 + "px"}
          margin="0px"
          padding="0px"
          top="0px"
        ></Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default RollBar;
