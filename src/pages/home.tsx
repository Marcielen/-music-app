import { Box, Flex } from "@chakra-ui/react";

import { GenresMusic } from "components/GenresMusic";
import { Menu } from "components/Menu";

export default function Home() {
  return (
    <Flex justifyContent="space-between" bg="black" h="calc(100vh - 80px)">
      <Menu />
      <Box
        pt="35px"
        pl="40px"
        pr="50px"
        transition="all ease 1.5s"
        w={`calc(100vw - 70px)`}
      >
        <GenresMusic />
      </Box>
    </Flex>
  );
}
