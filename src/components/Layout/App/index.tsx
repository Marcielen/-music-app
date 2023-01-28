import MusicProvider from "store/contextMusic";

import { PlayerMusic } from "components/PlayerMusic";
import { Box, Flex } from "@chakra-ui/react";
import { Menu } from "components/Menu";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <MusicProvider>
      <Flex bg="black" maxW="100vw">
        <Box h="full" pr="3%">
          <Menu />
        </Box>
        {children}
      </Flex>
      <PlayerMusic />
    </MusicProvider>
  );
};
