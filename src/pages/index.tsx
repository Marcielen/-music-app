import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { GenresMusic } from "components/GenresMusic";
import { PlayerMusic } from "components/PlayerMusic";

import { useState } from "react";
import { Menu } from "../components/Menu";

export default function Home() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  return (
    <>
      <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
        <Menu setMenuIsOpen={setMenuIsOpen} />
        <Box
          pt="35px"
          pl={menuIsOpen ? "40px" : "20px"}
          pr="40px"
          transition="all ease 1.5s"
          w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
        >
          <GenresMusic />
        </Box>
      </Flex>
    </>
  );
}
