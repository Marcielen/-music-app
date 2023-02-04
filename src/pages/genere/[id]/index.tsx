import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Image as ImageChakra,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Divider,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillPlayFill, BsPause } from "react-icons/bs";

import { useIntersectionObserver } from "hooks/useIntersectionObserver";
import { fileGenere } from "services/Data/filesGenere";
import { useMusicContext } from "store/contextMusic";

import { Header } from "components/Header";

export default function Genere() {
  const {
    listAllMusic,
    setSelectedMusic,
    handleMusicActive,
    setIsMusicActive,
    handleDataMusic,
  } = useMusicContext();
  const router = useRouter();

  const idRouter = router.query.id as string;

  const genereSelected = fileGenere.find((genere) => genere.id === idRouter);

  const listGenereMusic = listAllMusic.filter(
    (allMusic) => allMusic.genere === idRouter
  );

  const { elementRef } = useIntersectionObserver({
    onIntersecting: handleDataMusic,
  });

  return (
    <Box color="white" h={"calc(100vh - 80px)"} w="full">
      <Box
        pb="25px"
        bgGradient="linear-gradient(to left, #ce79ca, #b06fba, #9464a9, #7a5996, #624e83, #57426f, #4b375b, #3f2d49, #352234, #271922, #190f14, #000000);"
      >
        <Box w="full" pt="20px" pr="2%">
          <Header isCollection={false} />
        </Box>
        <Flex>
          <Box>
            <Image
              style={{
                objectFit: "cover",
                height: "200px",
                width: "350px",
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
            pl="30px"
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
          <Table variant="">
            <Thead>
              <Tr>
                <Th color="white" w="1%">
                  #
                </Th>
                <Th color="white" w="52%">
                  Title
                </Th>
                <Th color="white" w="24%">
                  Genere
                </Th>
                <Th color="white" w="24%">
                  Album
                </Th>
              </Tr>
              <Th p="0" colSpan={5}>
                <Divider />
              </Th>
            </Thead>
            <Tbody>
              {listGenereMusic.map((genere) => {
                return (
                  <Tr key={genere.id}>
                    <Td
                      onClick={() => {
                        handleMusicActive(genere.musicUrl);
                        setIsMusicActive(
                          genere.isActive ? !genere.isActive : true
                        );
                        setSelectedMusic(genere);
                      }}
                      alignItems="baseline"
                      pt="10px"
                      pb="0"
                    >
                      <Icon
                        cursor="pointer"
                        as={genere.isActive ? BsPause : BsFillPlayFill}
                      />
                    </Td>
                    <Td pt="15px" pb="0">
                      <Flex>
                        <ImageChakra
                          h="40px"
                          w="40px"
                          objectFit="cover"
                          alt={genere.nameMusic}
                          src={genere.imageAlbum}
                        />
                        <Flex
                          display="column"
                          justifyContent="left"
                          alignItems="center"
                          pl="10px"
                        >
                          <Text fontSize="12px">{genere.author}</Text>
                          <Text fontSize="12px">{genere.nameMusic}</Text>
                        </Flex>
                      </Flex>
                    </Td>
                    <Td fontSize="12px">{genere.genere}</Td>
                    <Td fontSize="12px">{genere.album}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <Box mt="10px">There are no songs in this genre</Box>
        )}
        <Box h="40px" ref={elementRef} />
      </Box>
    </Box>
  );
}
