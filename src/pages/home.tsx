import { Box, Flex } from "@chakra-ui/react";

import { GenresMusic } from "components/GenresMusic";
import { Header } from "components/HeaderCollection";

export default function Home() {
  return (
    <Box w="full" position="relative" pr="2%" h="calc(100vh - 80px)">
      <Box w="full" mt="20px">
        <Header isCollection={false} />
      </Box>
      <Box w="full" pt="35px">
        <GenresMusic />
      </Box>
    </Box>
  );
}
