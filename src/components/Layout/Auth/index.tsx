import { Flex, Icon, Box, Text } from "@chakra-ui/react";

import { LogoIcon } from "icons";
import { useEffect, useState } from "react";

type AuthProps = {
  children: React.ReactNode;
};

export const Auth = ({ children }: AuthProps) => {
  const [animationBackground, setAnimationBackground] = useState(
    "linear-gradient(to left bottom"
  );

  const colors = [
    "linear-gradient(to left bottom",
    "linear-gradient(to left top",
    "linear-gradient(to right",
    "linear-gradient(to right top",
    "radial-gradient(circle",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex((colorIndex + 1) % colors.length);
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [colorIndex, colors.length]);

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bgGradient={`${colors[colorIndex]}, #fbb6ce, #f1a0c9, #e28bc8, #ce79ca, #b369ce, #9961c3, #7f58b6, #6550a9, #544788, #453e68, #373448, #2a2a2a);`}
      bg={colors[colorIndex]}
    >
      <Box
        bg="primary.850"
        borderRadius="10px"
        pl="30px"
        pr="30px"
        pt="40px"
        pb="40px"
      >
        <Icon
          cursor="pointer"
          textAlign="left"
          w="full"
          h="40px"
          color="secondary.200"
          mb="40px"
          as={LogoIcon}
        />
        <Text color="white" fontWeight="black" fontSize="16px">
          Hey, hello 👋
        </Text>
        {children}
      </Box>
    </Flex>
  );
};
