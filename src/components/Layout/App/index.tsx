import MusicProvider from "store/contextMusic";

import { PlayerMusic } from "components/PlayerMusic";
import { Box, Flex } from "@chakra-ui/react";
import { Menu } from "components/Menu";
import { useEffect } from "react";
import { auth } from "modules/auth";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const loggedUser = auth.getToken();
  const router = useRouter();

  useEffect(() => {
    if (!loggedUser) {
      router.push(EnumConstRouter.LOGIN);
    }
  }, [router, loggedUser]);

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
