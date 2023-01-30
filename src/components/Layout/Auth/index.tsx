import { Flex, Icon, Box, Text, keyframes } from "@chakra-ui/react";

import { LogoIcon } from "icons";
import { useEffect, useState } from "react";

type AuthProps = {
  children: React.ReactNode;
};

export const Auth = ({ children }: AuthProps) => {
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

  const animationKeyframes = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-800px);}
`;

  const animation = `${animationKeyframes} 4s ease-in-out infinite`;

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bgGradient={`${colors[colorIndex]}, #fbb6ce, #f1a0c9, #e28bc8, #ce79ca, #b369ce, #9961c3, #7f58b6, #6550a9, #544788, #453e68, #373448, #2a2a2a);`}
    >
      <Flex
        justifyContent="flex-end"
        position="absolute"
        zIndex="2"
        w="full"
        bottom="0"
        animation={animation}
      >
        <Box ml="30px" w="30px" h="30px" />
        <Box w="30px" bottom="20px" h="30px" />
      </Flex>
      <Box
        bg="primary.850"
        borderRadius="10px"
        pl="30px"
        zIndex="9999"
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
