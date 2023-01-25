import { Box, Flex, Icon, Tooltip } from "@chakra-ui/react";

import { HomeIcon, LogoIconSmall } from "icons";

import { ContainerMenu } from "./ContainerMenu";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";
import { FiMusic } from "react-icons/fi";

export const Menu = () => {
  const router = useRouter();

  return (
    <Box position="relative" w="60px" h="calc(100vh - 80px)">
      <ContainerMenu width="60px" pt="20px">
        <Flex pb="15px" justifyContent="center" alignItems="center">
          <Icon cursor="pointer" w="30px" h="50px" as={LogoIconSmall} />
        </Flex>

        <Tooltip placement="right" color="secondary.100" hasArrow label="Home">
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
        </Tooltip>
        <Tooltip
          hasArrow
          color="secondary.100"
          placement="right"
          label="Collection"
        >
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
            onClick={() => router.push(EnumConstRouter.COLLECTIONS)}
            justifyContent="center"
          >
            <Icon
              mr="15px"
              cursor="pointer"
              w="30px"
              h="25px"
              color="white"
              as={FiMusic}
            />
          </Flex>
        </Tooltip>
      </ContainerMenu>
    </Box>
  );
};
