import { useEffect, useState } from "react";
import { GiMusicalNotes, GiMusicalScore } from "react-icons/gi";
import { Flex, Icon, Box, Text, keyframes, HStack } from "@chakra-ui/react";

import { CardAnimation } from "components/CardAnimation";
import { LogoIcon } from "icons";

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

  const animationKeyframesStart = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(-800px);}
`;

  const animationKeyframesEnd = keyframes`
  0% { transform: translateY(-800px); }
  100% { transform: translateY(0);}
`;

  const animation4s = `${animationKeyframesStart} 4s ease-in-out infinite`; //
  const animation41s = `${animationKeyframesStart} 4.1s ease-in-out infinite`; //
  const animation46s = `${animationKeyframesStart} 4.6s ease-in-out infinite`; //
  const animationEnd4s = `${animationKeyframesEnd} 4s ease-in-out infinite`; //
  const animationEnd41s = `${animationKeyframesEnd} 4.1s ease-in-out infinite`;
  const animationEnd46 = `${animationKeyframesEnd} 4.6s ease-in-out infinite`;

  const itensAnimation = [
    {
      animation: animation4s,
      color: "#f1a0c9",
      icon: GiMusicalNotes,
    },
    {
      animation: animation41s,
      color: "#9961c3",
      icon: GiMusicalScore,
    },
    {
      animation: animationEnd41s,
      color: "white",
      icon: GiMusicalNotes,
    },
    {
      animation: animationEnd4s,
      color: "#373448",
      icon: GiMusicalNotes,
    },
    {
      animation: animation46s,
      color: "#f1a0c9",
      icon: GiMusicalScore,
    },

    {
      animation: animationEnd46,
      color: "white",
      icon: GiMusicalScore,
    },
  ];

  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      sx={{
        "&::-webkit-scrollbar": {
          height: "0",
          width: "0",
        },
        "& .virtualized_List::-webkit-scrollbar": {
          height: "0",
          width: "0",
        },
      }}
      position="relative"
      alignItems="center"
      bgGradient={`${colors[colorIndex]}, #fbb6ce, #f1a0c9, #e28bc8, #ce79ca, #b369ce, #9961c3, #7f58b6, #6550a9, #544788, #453e68, #373448, #2a2a2a);`}
    >
      <HStack
        position="absolute"
        justifyContent="space-between"
        pl={["0", "0", "5%"]}
        pr={["0", "0", "5%"]}
        zIndex="2"
        w="full"
        spacing={["0", "0", "20px"]}
        bottom="0"
      >
        <CardAnimation itensAnimation={itensAnimation} />
      </HStack>
      <Box
        bg="primary.850"
        borderRadius="10px"
        h={["520px", "550px", "550px"]}
        pl={["20px", "30px", "30px"]}
        w={["300px", "390px", "390px"]}
        zIndex="9999"
        pr={["20px", "30px", "30px"]}
        pt={["20px", "40px", "40px"]}
        pb="40px"
      >
        <Icon
          cursor="pointer"
          textAlign="left"
          w="full"
          h="40px"
          color="secondary.200"
          mb={["20px", "40px", "40px"]}
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
