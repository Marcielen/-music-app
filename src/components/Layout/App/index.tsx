import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";

import MusicProvider, {
  MusicContext,
  useMusicContext,
} from "store/contextMusic";
import { auth } from "modules/auth";
import { EnumConstRouter } from "constants/enumConstRouter";

import { PlayerMusic } from "components/PlayerMusic";
import { Menu } from "components/Menu";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const loggedUser = auth.getToken();
  const router = useRouter();

  const { isExpandPlayer } = useMusicContext();

  const [mobile] = useMediaQuery("(max-width: 900px)");

  useEffect(() => {
    if (!loggedUser) {
      router.push(EnumConstRouter.LOGIN);
    }
  }, [router, loggedUser]);

  return (
    <MusicProvider>
      <MusicContext.Consumer>
        {({ selectedMusic }) => {
          const isMusicSelected = selectedMusic?.musicUrl ? true : false;
          return (
            <>
              {mobile ? (
                <>
                  {!isExpandPlayer && (
                    <Flex
                      bg="black"
                      pl="3%"
                      h={`calc(100vh - ${isMusicSelected ? "100px" : "40px"})`}
                    >
                      {children}
                    </Flex>
                  )}
                  <Box position="fixed" w="full" bottom="1px" zIndex="9999">
                    {isMusicSelected && <PlayerMusic />}
                    <Menu />
                  </Box>
                </>
              ) : (
                <>
                  <Flex
                    bg="black"
                    h={isMusicSelected ? "calc(100vh - 80px)" : "100vh"}
                  >
                    <Box h="full" pr="3%">
                      <Menu />
                    </Box>

                    {children}
                  </Flex>
                  {isMusicSelected && <PlayerMusic />}
                </>
              )}
            </>
          );
        }}
      </MusicContext.Consumer>
    </MusicProvider>
  );
};
