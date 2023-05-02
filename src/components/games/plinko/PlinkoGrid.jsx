import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import Plinko from "../Plinko";
const PlinkoGrid = forwardRef((props, ref) => {
  const [ballPos, setBallPos] = useState(0);

  useImperativeHandle(ref, () => ({
    startAnimation,
  }));
  const startAnimation = (dir, newBalance) => {
    setBallPos(0);

    let j = 0;
    let row = 0;
    if (!dir) return;
    const interval = setInterval(() => {
      if (row >= dir.length) {
        clearInterval(interval);
        props.setMidAnimation(false);
        setBallPos(j * 1000 + 1);
        props.setBalance(newBalance);
        console.log(dir);
        return;
      }

      if (dir[row] == 1) {
        j++;
        setBallPos(16 * (row + 1) + j);
      } else {
        setBallPos(16 * (row + 1) + j);
      }

      row++;
    }, 50);
  };

  return (
    <Box
      onClick={(e) => {
        startAnimation();
      }}
      width={"500px"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDir={"column"}
    >
      {[...Array(16)].map((_, i) => {
        return (
          <Box key={i} display={"flex"}>
            {[...Array(i + 1)].map((_, j) => (
              <Box
                onClick={(e) => {
                  console.log(i * 16 + j);
                }}
                backgroundColor={i * 16 + j == ballPos ? "red" : "white"}
                key={j + 16 * i}
                width={"20px"}
                height={"20px"}
                border={"1px solid black"}
              ></Box>
            ))}
          </Box>
        );
      })}
      <Box display={"flex"}>
        {[
          1000, 130, 26, 9, 4, 2, 1.5, 0.2, 0.2, 0.2, 1.5, 2, 4, 9, 26, 130,
          1000,
        ].map((multi, i) => (
          <Box
            display={"flex"}
            fontSize={"7px"}
            justifyContent={"center"}
            alignItems={"center"}
            key={i}
            bg={ballPos == 1 + i * 1000 ? "green" : "white"}
            width={"20px"}
            height={"20px"}
            border={"1px solid black"}
          >
            {multi}
          </Box>
        ))}
      </Box>
    </Box>
  );
});
PlinkoGrid.displayName = "PlinkoGrid";
export default PlinkoGrid;
