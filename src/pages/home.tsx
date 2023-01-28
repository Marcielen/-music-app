import { Box, Flex } from "@chakra-ui/react";

import { GenresMusic } from "components/GenresMusic";
import { Menu } from "components/Menu";

export default function Home() {
  return (
    <Flex
      w="full"
      position="relative"
      justifyContent="space-between"
      h="calc(100vh - 80px)"
      pr="11%"
    >
      <Box w="full" pt="35px">
        <GenresMusic />
      </Box>
    </Flex>
  );
}
