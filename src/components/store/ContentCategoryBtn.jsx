import { Box, Text, Button } from "@chakra-ui/react";
const ContentCategoryButton = (props) => {
  return (
    <Button
      shadow={"md"}
      marginTop={props.isFirst ? "20px" : ""}
      borderRadius={"lg"}
      border={"solid black .5px"}
      width={"100%"}
      height="40px"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bg={props.currentCategory === props.name ? "purple" : "white"}
      color={props.currentCategory === props.name ? "white" : "black"}
      _hover={props.currentCategory === props.name ? "" : { bg: "gray.200" }}
      onClick={() => {
        props.setCategory(props.name);
      }}
    >
      <Text fontWeight={"normal"}>{props.name}</Text>
    </Button>
  );
};

export default ContentCategoryButton;
