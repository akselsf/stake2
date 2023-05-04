import { Box, Heading, Button, Text } from "@chakra-ui/react";
import ContentCategoryButton from "./store/ContentCategoryBtn";
import { useState } from "react";

import StoreColorThemes from "./store/StoreColorThemes";
const Store = (props) => {
  const [category, setCategory] = useState("Colorthemes");

  const categories = ["Colorthemes", "Items", "Games"];
  return (
    <Box
      margin={"0 auto"}
      marginTop={"20px"}
      borderWidth="1px"
      borderRadius="lg"
      height={"370px"}
      width={"800px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      shadow={"lg"}
    >
      {" "}
      <Box
        display={"flex"}
        width={"25%"}
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        height={"100%"}
      >
        <Heading size={"md"} marginTop={"25px"}>
          Categories
        </Heading>
        {categories.map((c, i) => {
          return (
            <ContentCategoryButton
              key={c}
              name={c}
              isFirst={i === 0}
              currentCategory={category}
              setCategory={setCategory}
            />
          );
        })}
      </Box>
      <Box width={"75%"} height={"100%"} borderLeft={"solid black 1px"}>
        {category === "Colorthemes" ? <StoreColorThemes /> : <></>}
      </Box>
    </Box>
  );
};
export default Store;
