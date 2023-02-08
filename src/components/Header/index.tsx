import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

import { auth } from "modules/auth";
import { useMusicContext } from "store/contextMusic";

import { InputDefault } from "components/Input";

type HeaderCollectionProps = {
  isCollection?: boolean;
};

export const Header = ({ isCollection = true }: HeaderCollectionProps) => {
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [photoUser, setPhotoUser] = useState("");

  const [mobile] = useMediaQuery("(max-width: 900px)");

  const { handleSignOut } = useMusicContext();

  useEffect(() => {
    const name = auth.getNameUser();
    const photo = auth.getPhotoUser();
    const email = auth.getEmail();

    setNameUser(name);
    setEmailUser(email);
    setPhotoUser(photo);
  }, []);

  return (
    <Flex
      pr={["1px", "5px", "15px"]}
      w="full"
      justifyContent={isCollection ? "space-between" : "flex-end"}
    >
      {isCollection && (
        <Box mr={["20px", "20px", "0"]} w={["80%", "80%", "350px"]}>
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
      )}
      {!mobile && (
        <Menu>
          <MenuButton
            as={Button}
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
            rightIcon={<Icon boxSize="15px" as={IoIosArrowDown} />}
            variant="outline"
          >
            <Flex>
              {nameUser !== null ? (
                <>
                  <Avatar mt="2px" mr="8px" boxSize="25px" src={photoUser} />

                  <Flex
                    display={emailUser === null ? "flex" : "column"}
                    alignItems="center"
                  >
                    <Box>
                      {emailUser !== null && (
                        <Box fontSize="12px" textAlign="left">
                          {emailUser}
                        </Box>
                      )}
                    </Box>
                    <Box>
                      <Box fontSize="12px" textAlign="left">
                        {nameUser}
                      </Box>
                    </Box>
                  </Flex>
                </>
              ) : (
                <Text fontSize="12px" textAlign="left">
                  Hi, welcome!
                </Text>
              )}
            </Flex>
          </MenuButton>
          <MenuList
            w="full"
            borderRadius="10px"
            borderColor="primary.600"
            bg="primary.850"
            zIndex="9999"
          >
            <MenuItem
              bg="none"
              _hover={{
                background: "primary.800",
              }}
              borderColor="primary.600"
              color="white"
              onClick={() => handleSignOut()}
              fontSize="12px"
            >
              <Box ml="5px" mr="15px">
                <AiOutlinePoweroff />
              </Box>{" "}
              Sing out
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
