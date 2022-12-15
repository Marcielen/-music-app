import { Box, Flex, Icon } from "@chakra-ui/react";
import { GenresMusic } from "components/GenresMusic";
import { PlayerMusic } from "components/PlayerMusic";
import { Menu } from "../components/Menu";
import { LogoIconSmall } from "../icons";

export default function Home() {
  return (
    <>
      <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
        <Menu />
        <Box pt="35px" pl="40px" pr="40px" w="calc(100vw - 200px)">
          <GenresMusic />
        </Box>
      </Flex>
      <PlayerMusic />
    </>
  );
}
