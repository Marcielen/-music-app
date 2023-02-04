import { Box, Flex } from "@chakra-ui/react";

import { GenresMusic } from "components/GenresMusic";
import { Header } from "components/Header";

export default function Home() {
  return (
    <Box
      overflow="auto"
      w="full"
      position="relative"
      pr="2%"
      sx={{
        "&::-webkit-scrollbar": {
          height: "0",
          width: "0",
        },
        "& .virtualized_List::-webkit-scrollbar": {
          height: "0",
          width: "0",
        },
      }}
    >
      <Box w="full" mt="20px">
        <Header isCollection={false} />
      </Box>
      <Box w="full" pt="35px">
        <GenresMusic />
      </Box>
    </Box>
  );
}
