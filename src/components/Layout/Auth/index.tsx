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
      bgGradient="linear-gradient(to right bottom, #f687b3, #b36482, #744354, #3b242b, #000000);"
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
