import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { AiOutlineMenu, AiOutlinePoweroff } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

import { auth } from "modules/auth";

import { InputDefault } from "components/Input";

export const HeaderCollection = () => {
  const router = useRouter();
  const clearDataUser = auth.clearToken;

  const signOut = useCallback(() => {
    clearDataUser();
    router.reload();
  }, [clearDataUser, router]);

  return (
    <Flex pr="15px" w="full" justifyContent="space-between">
      <Box w={["full", "full", "350px"]}>
        <InputDefault
          autoFocus
          bg="primary.850"
          color="white"
          textFillColor="primary.600"
          borderColor="primary.600"
          placeholder="Search"
          borderRadius="10px"
          iconLeftElement={FiSearch}
          name="searchMusic"
        />
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          bg="primary.850"
          color="white"
          borderColor="primary.600"
          borderRadius="10px"
          _hover={{
            background: "black",
          }}
          _active={{
            background: "primary.800",
          }}
          icon={<AiOutlineMenu />}
          variant="outline"
        />
        <MenuList
          borderRadius="10px"
          borderColor="primary.600"
          bg="primary.850"
        >
          <MenuItem
            bg="none"
            _hover={{
              background: "primary.800",
            }}
            borderColor="primary.600"
            color="white"
            onClick={() => signOut()}
          >
            <Box ml="5px" mr="15px">
              <AiOutlinePoweroff />
            </Box>{" "}
            Sing out
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
