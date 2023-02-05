import MusicProvider from "store/contextMusic";

import { PlayerMusic } from "components/PlayerMusic";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";
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

  const [mobile] = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!loggedUser) {
      router.push(EnumConstRouter.LOGIN);
    }
  }, [router, loggedUser]);

  return (
    <MusicProvider>
      {mobile ? (
        <>
          <Flex bg="black" pl="3%" h="calc(100vh - 40px)">
            {children}
          </Flex>
          <Menu />
        </>
      ) : (
        <>
          <Flex bg="black" maxH="calc(100vh - 80px)">
            <Box h="full" pr="3%">
              <Menu />
            </Box>

            {children}
          </Flex>
          <PlayerMusic />
        </>
      )}
    </MusicProvider>
  );
};
