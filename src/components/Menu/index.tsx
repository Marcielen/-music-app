import { Box, Flex, Icon, Tooltip, useMediaQuery } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiMusic } from "react-icons/fi";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { RiPlayListFill } from "react-icons/ri";
import { BiUser } from "react-icons/bi";

import { EnumConstRouter } from "constants/enumConstRouter";
import { useMusicContext } from "store/contextMusic";

import { HomeIcon, LogoIconSmall } from "icons";

import { ContainerMenu } from "./ContainerMenu";

export const Menu = () => {
  const router = useRouter();
  const [mobile] = useMediaQuery("(max-width: 900px)");

  const { handleSignOut, setIsExpandPlayer } = useMusicContext();

  return (
    <Box
      position="relative"
      w={mobile ? "full" : "60px"}
      h={mobile ? "40px" : "full"}
    >
      <ContainerMenu
        width={mobile ? "full" : "60px"}
        pt={mobile ? "0px" : "20px"}
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
            mb={mobile ? undefined : "5px"}
            cursor="pointer"
            alignItems="center"
            pt={mobile ? "5px" : "10px"}
            pb={mobile ? "5px" : "10px"}
            pl="10px"
            onClick={() => {
              setIsExpandPlayer(false);
              router.push(EnumConstRouter.HOME);
            }}
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
            cursor="pointer"
            alignItems="center"
            mb={mobile ? undefined : "5px"}
            pt={mobile ? "5px" : "10px"}
            pb={mobile ? "5px" : "10px"}
            pl="10px"
            onClick={() => {
              setIsExpandPlayer(false);
              router.push(EnumConstRouter.COLLECTIONS);
            }}
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
            cursor="pointer"
            alignItems="center"
            mb={mobile ? undefined : "5px"}
            pt={mobile ? "5px" : "10px"}
            pb={mobile ? "5px" : "10px"}
            pl="10px"
            onClick={() => {
              setIsExpandPlayer(false);
              router.push(EnumConstRouter.ALL_COLLECTIONS);
            }}
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
            cursor="pointer"
            alignItems="center"
            mb={mobile ? undefined : "5px"}
            pt={mobile ? "5px" : "10px"}
            pb={mobile ? "5px" : "10px"}
            pl="10px"
            onClick={() => {
              setIsExpandPlayer(false);
              router.push(EnumConstRouter.CREATE_MUSIC);
            }}
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
        {mobile && (
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
              cursor="pointer"
              alignItems="center"
              mb={mobile ? undefined : "5px"}
              pt={mobile ? "5px" : "10px"}
              pb={mobile ? "5px" : "10px"}
              pl="10px"
              onClick={() => handleSignOut()}
              justifyContent="center"
            >
              <Icon
                mr="15px"
                cursor="pointer"
                w="30px"
                h="25px"
                color="white"
                as={BiUser}
              />
            </Flex>
          </Tooltip>
        )}
      </ContainerMenu>
    </Box>
  );
};
