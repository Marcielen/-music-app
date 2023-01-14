import { Box, Flex } from "@chakra-ui/react";
import { Menu } from "components/Menu";
import { useState } from "react";

export default function CreateMusic() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  return (
    <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
      <Menu setMenuIsOpen={setMenuIsOpen} />
      <Box
        pt="35px"
        pl={menuIsOpen ? "40px" : "20px"}
        pr="40px"
        transition="all ease 1.5s"
        w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
      >
        hi
      </Box>
    </Flex>
  );
}
