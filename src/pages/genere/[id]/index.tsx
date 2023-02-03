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
import { Header } from "components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsFillPlayFill, BsPause } from "react-icons/bs";
import { fileGenere } from "services/Data/filesGenere";
import { useMusicContext } from "store/contextMusic";

export default function Genere() {
  const { listAllMusic } = useMusicContext();
  const router = useRouter();
  const idRouter = router.query.id as string;

  const genereSelected = fileGenere.find((genere) => genere.id === idRouter);

  const listGenereMusic = listAllMusic.filter(
    (allMusic) => allMusic.genere === idRouter
  );

  return (
    <Box color="white" w="full">
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
      <Box pr="3%">
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
            {listGenereMusic.map((genere) => (
              <Tr key={genere.id}>
                <Td pt="0" pb="0">
                  <Icon as={BsFillPlayFill} />
                </Td>
                <Td pt="10px" pb="0">
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
