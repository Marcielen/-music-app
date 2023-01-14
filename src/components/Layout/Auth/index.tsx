import { Flex, Icon, Box, Text } from "@chakra-ui/react";

import { LogoIcon } from "icons";

type AuthProps = {
  children: React.ReactNode;
};

export const Auth = ({ children }: AuthProps) => {
  return (
    <Flex
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear-gradient(to left bottom, #fbb6ce, #f1a0c9, #e28bc8, #ce79ca, #b369ce, #9961c3, #7f58b6, #6550a9, #544788, #453e68, #373448, #2a2a2a);"
    >
      <Box>
        <Icon
          cursor="pointer"
          textAlign="left"
          w="full"
          h="40px"
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
