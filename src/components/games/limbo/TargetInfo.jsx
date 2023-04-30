import { Box, Text } from "@chakra-ui/react";
const TargetInfo = (props) => {
  const getMultiplier = (target) => {
    return target;
  };
  const getChance = (target) => {
    return Math.round((1 / target) * 100000) / 1000;
  };

  return (
    <Box
      width="100%"
      height="50px"
      position="absolute"
      bottom="0px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderTop={"1px solid purple"}
    >
      <Text width="50%" textAlign="center" overflow={"hidden"} noOfLines={1}>
        Return: {getMultiplier(props.target)}x
      </Text>
      <Text width="50%" textAlign="center">
        Chance: {getChance(props.target)}%
      </Text>
    </Box>
  );
};

export default TargetInfo;
