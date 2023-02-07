import { Box, Flex, Icon, Tooltip, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiMusic } from "react-icons/fi";

import { EnumConstRouter } from "constants/enumConstRouter";

import { HomeIcon, LogoIconSmall } from "icons";

import { ContainerMenu } from "./ContainerMenu";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";

export const Menu = () => {
  const router = useRouter();
  const [mobile] = useMediaQuery("(max-width: 900px)");

  return (
    <Box
      position={mobile ? "fixed" : "relative"}
      bottom="10px"
      zIndex="9999"
      w={mobile ? "full" : "60px"}
      h={mobile ? "40px" : "full"}
    >
      <ContainerMenu
        width={mobile ? "full" : "60px"}
        pt={mobile ? "5px" : "20px"}
        pl={mobile ? "10px" : undefined}
      >
        {!mobile && (
          <Flex pb="15px" justifyContent="center" alignItems="center">
            <Icon
              cursor="pointer"
              color="white"
              w="30px"
              h="50px"
              as={LogoIconSmall}
            />
          </Flex>
        )}

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
          label="Your collections"
        >
          <Flex
            _hover={{
              background: "#282828",
            }}
            mb={mobile ? undefined : "5px"}
            cursor="pointer"
            alignItems="center"
            pt={mobile ? undefined : "10px"}
            pb={mobile ? "5px" : "10px"}
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
        <Tooltip
          hasArrow
          color="secondary.100"
          placement="right"
          label="All collections"
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
            onClick={() => router.push(EnumConstRouter.ALL_COLLECTIONS)}
            justifyContent="center"
          >
            <Icon
              mr="15px"
              cursor="pointer"
              w="30px"
              h="25px"
              color="white"
              as={MdOutlineLibraryMusic}
            />
          </Flex>
        </Tooltip>
        <Tooltip
          hasArrow
          color="secondary.100"
          placement="right"
          label="Create music"
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
            onClick={() => router.push(EnumConstRouter.CREATE_MUSIC)}
            justifyContent="center"
          >
            <Icon
              mr="15px"
              cursor="pointer"
              w="30px"
              h="25px"
              color="white"
              as={RiPlayListFill}
            />
          </Flex>
        </Tooltip>
      </ContainerMenu>
    </Box>
  );
};
