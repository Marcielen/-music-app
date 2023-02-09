import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import { fileGenere } from "services/Data/filesGenere";
import { useMusicContext } from "store/contextMusic";

import { Header } from "components/Header";
import { CardsMusic } from "components/CardsMusic";

export default function Genere() {
  const { listAllMusic, handleDataMusic } = useMusicContext();
  const router = useRouter();

  const idRouter = router.query.id as string;

  const genereSelected = fileGenere.find((genere) => genere.id === idRouter);

  const listGenereMusic = listAllMusic.filter(
    (allMusic) => allMusic.genere === idRouter
  );

  const [mobile] = useMediaQuery("(max-width: 900px)");
  const [is500MediaQuery] = useMediaQuery("(max-width: 500px)");

  const { elementRef } = useIntersectionObserver({
    onIntersecting: handleDataMusic,
  });

  return (
    <Box
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
      overflow="auto"
      h={mobile ? "85vh" : undefined}
      color="white"
      w="full"
    >
      <Box
        pb="25px"
        bgGradient="linear-gradient(to left, #ce79ca, #b06fba, #9464a9, #7a5996, #624e83, #57426f, #4b375b, #3f2d49, #352234, #271922, #190f14, #000000);"
      >
        <Box w="full" pt="20px" pr="2%">
          <Header isCollection={false} />
        </Box>
        <Flex direction={mobile ? "column" : "row"}>
          <Box pr={mobile ? "3%" : undefined}>
            <Image
              style={{
                objectFit: "cover",
                height: mobile
                  ? is500MediaQuery
                    ? "200px"
                    : "220px"
                  : "200px",
                width: mobile ? undefined : "350px",
                borderRadius: "10px",
              }}
              alt={genereSelected?.alt || ""}
              src={genereSelected?.src || ""}
            />
          </Box>
          <Flex
            pt="20px"
            pb="20px"
            flexDirection="column"
            justifyContent="space-between"
            pl={mobile ? "10px" : "30px"}
          >
            <Text fontWeight="bold" fontSize="12px">
              GENERE
            </Text>
            <Text fontWeight="bold" fontSize="40px">
              {genereSelected?.typeGenere}
            </Text>
            <Text fontSize="14px">The best songs you find here!</Text>
          </Flex>
        </Flex>
      </Box>
      <Box
        overflow="auto"
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
        h="52%"
        mt="10px"
        pr="3%"
      >
        {listGenereMusic.length > 0 ? (
          <CardsMusic dataMusic={listGenereMusic} />
        ) : (
          <Box mt="10px">There are no songs in this genre</Box>
        )}
        <Box h="40px" ref={elementRef} />
      </Box>
    </Box>
  );
}
