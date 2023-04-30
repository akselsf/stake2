import { Box, Text } from "@chakra-ui/react";

const TargetInfo = (props) => {
  const getMultiplier = (target, above) => {
    return Math.round((above ? 1 / (1 - target) : 1 / target) * 100) / 100;
  };
  const getChance = (target, above) => {
    return Math.round((above ? 1 - target : target) * 100000) / 1000;
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
        Return: {getMultiplier(props.target, props.aboveTarget)}x
      </Text>
      <Text width="50%" textAlign="center">
        Chance: {getChance(props.target, props.aboveTarget)}%
      </Text>
    </Box>
  );
};

export default TargetInfo;
