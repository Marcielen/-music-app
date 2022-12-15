import { useState } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";

import { HomeIcon, LogoIcon, LogoIconSmall, SearchIcon } from "icons";

import { ContainerMenu } from "./ContainerMenu";

export const Menu = () => {
  const [animation, setAnimation] = useState(true);

  return (
    <Box position="relative" height="full">
      <ContainerMenu
        transform={!animation ? "translateX(0)" : "translateX(-100%)"}
        handleAnimation={() => {
          setTimeout(() => {
            setAnimation(!animation);
          }, 1000);
        }}
        width="80px"
        pt="20px"
      >
        <Flex pb="15px" justifyContent="center" alignItems="center">
          <Icon cursor="pointer" w="38px" h="50px" as={LogoIconSmall} />
        </Flex>
        <Flex
          _hover={{
            background: "#282828",
          }}
          mb="5px"
          cursor="pointer"
          alignItems="center"
          pt="10px"
          pb="10px"
          pl="10px"
          justifyContent="center"
        >
          <Icon mr="15px" cursor="pointer" w="30px" h="25px" as={HomeIcon} />
        </Flex>
        <Flex
          _hover={{
            background: "#282828",
          }}
          mb="5px"
          cursor="pointer"
          alignItems="center"
          pt="10px"
          pb="10px"
          pl="10px"
          justifyContent="center"
        >
          <Icon mr="15px" cursor="pointer" w="30px" h="25px" as={SearchIcon} />
        </Flex>
      </ContainerMenu>

      <ContainerMenu
        transform={animation ? "translateX(0)" : "translateX(-100%)"}
        handleAnimation={() => {
          setAnimation(!animation);
        }}
        w="200px"
        pt="20px"
      >
        <Flex pb="15px" justifyContent="center" alignItems="center">
          <Icon cursor="pointer" w="120px" h="50px" as={LogoIcon} />
        </Flex>
        <Flex
          _hover={{
            background: "#282828",
          }}
          mb="5px"
          cursor="pointer"
          alignItems="center"
          pt="10px"
          pb="10px"
          pl="15px"
        >
          <Icon mr="15px" cursor="pointer" w="30px" h="25px" as={HomeIcon} />
          <Text color="white" fontSize="14px" fontWeight="bold">
            Home
          </Text>
        </Flex>
        <Flex
          _hover={{
            background: "#282828",
          }}
          cursor="pointer"
          alignItems="center"
          pt="10px"
          pb="10px"
          pl="15px"
        >
          <Icon mr="15px" cursor="pointer" w="30px" h="25px" as={SearchIcon} />
          <Text color="white" fontSize="14px" fontWeight="bold">
            Search
          </Text>
        </Flex>
      </ContainerMenu>
    </Box>
  );
};
