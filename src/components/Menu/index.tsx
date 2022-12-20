import { Dispatch, SetStateAction, useState } from "react";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";

import { HomeIcon, LogoIcon, LogoIconSmall, SearchIcon } from "icons";

import { ContainerMenu } from "./ContainerMenu";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";

type MenuProps = {
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Menu = ({ setMenuIsOpen }: MenuProps) => {
  const [animation, setAnimation] = useState(true);

  const router = useRouter();

  return (
    <Box position="relative" maxWidth="200px" height="full">
      <ContainerMenu
        transform={!animation ? "translateX(0)" : "translateX(-100%)"}
        width="80px"
        pt="20px"
      >
        <Flex
          onClick={() => {
            setTimeout(() => {
              setMenuIsOpen(true);
              setAnimation(!animation);
            }, 1000);
          }}
          pb="15px"
          justifyContent="center"
          alignItems="center"
        >
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
          onClick={() => router.push(EnumConstRouter.HOME)}
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
          onClick={() => router.push(EnumConstRouter.SEARCH)}
          justifyContent="center"
        >
          <Icon mr="15px" cursor="pointer" w="30px" h="25px" as={SearchIcon} />
        </Flex>
      </ContainerMenu>

      <ContainerMenu
        transform={animation ? "translateX(0)" : "translateX(-100%)"}
        w="200px"
        pt="20px"
      >
        <Flex
          onClick={() => {
            setMenuIsOpen(false);
            setAnimation(!animation);
          }}
          pb="15px"
          justifyContent="center"
          alignItems="center"
        >
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
          onClick={() => router.push(EnumConstRouter.HOME)}
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
          onClick={() => router.push(EnumConstRouter.SEARCH)}
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
