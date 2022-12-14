import { Box, Fade, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { LogoIcon, LogoIconSmall } from "icons";

export const Menu = () => {
  const [animation, setAnimation] = useState(true);

  return (
    <Box height="full">
      <Box
        display="flex"
        flexDirection="column"
        bg="black"
        pl="10px"
        pr="10px"
        transform={!animation ? "translateX(0)" : "translateX(-100%)"}
        height="full"
        position="absolute"
        top="0"
        left="0"
        transition="transform 0.9s ease-in-out"
      >
        <Flex
          onClick={() => {
            setTimeout(() => {
              setAnimation(!animation);
            }, 1000);
          }}
          w="60px"
          alignItems="center"
          justifyContent="center"
        >
          <Icon cursor="pointer" w="50px" h="70px" as={LogoIconSmall} />
        </Flex>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        bg="black"
        pl="10px"
        pr="10px"
        transform={animation ? "translateX(0)" : "translateX(-100%)"}
        height="full"
        position="absolute"
        top="0"
        left="0"
        transition="transform 0.9s ease-in-out"
      >
        <Flex
          onClick={() => {
            setAnimation(!animation);
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Icon cursor="pointer" w="160px" h="70px" as={LogoIcon} />
        </Flex>
      </Box>
    </Box>
  );
};
