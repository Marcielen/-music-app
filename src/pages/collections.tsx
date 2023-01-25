import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { RiPlayListFill } from "react-icons/ri";
import {
  AiFillCaretRight,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";

import { useMusicContext } from "store/contextMusic";

import { InputDefault } from "components/Input";
import { Menu } from "components/Menu";
import { Pagination } from "components/Pagination";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useRouter } from "next/router";
import { VirtualizedInfinite } from "components/VirtualizedInfinite";

export default function Search() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const formMethods = useForm({
    defaultValues: {
      searchMusic: "",
    },
  });
  const { watch } = formMethods;

  const searchMusicWatch = watch("searchMusic");
  const router = useRouter();

  const {
    setSelectedMusic,
    listMusic,
    handleDataMusic,
    setListMusic,
    setIsMusicActive,
  } = useMusicContext();

  function handleMusicActive(url: string) {
    setListMusic((previousValue) => {
      return previousValue.map((music) => ({
        ...music,
        isActive: music.musicUrl === url ? !music.isActive : false,
      }));
    });
  }

  const currentTableData = useCallback(() => {
    const firstPageIndex = (page - 1) * 5;
    const lastPageIndex = firstPageIndex + 5;

    return listMusic.slice(firstPageIndex, lastPageIndex);
  }, [listMusic, page])();

  const filterMusic = () =>
    currentTableData.filter((valueMusic) =>
      Object.values(valueMusic)
        .flat()
        .some((nameMusic) =>
          `${nameMusic}`
            .toLowerCase()
            .includes(`${searchMusicWatch}`.toLowerCase())
        )
    );
  const ListMusic = filterMusic();

  return (
    <FormProvider {...formMethods}>
      <Flex
        zIndex="2"
        justifyContent="space-between"
        bg="black"
        h="calc(100vh - 80px)"
      >
        <Box bg="red" h="full" maxWidth="200px">
          <Menu setMenuIsOpen={setMenuIsOpen} />
        </Box>
        <Box
          pt="35px"
          pl={menuIsOpen ? "40px" : "20px"}
          pr="40px"
          transition="all ease 1.5s"
          w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
        >
          <Flex pr="15px" w="full" justifyContent="space-between">
            <Box w={["full", "full", "350px"]}>
              <InputDefault
                autoFocus
                bg="primary.850"
                color="white"
                textFillColor="primary.600"
                borderColor="primary.600"
                placeholder="Search"
                borderRadius="10px"
                iconLeftElement={FiSearch}
                name="searchMusic"
              />
            </Box>
            <Button
              leftIcon={<Icon as={RiPlayListFill} mr="10px" />}
              variant="solid"
              color="white"
              borderWidth="2px"
              borderColor="primary.600"
              bg="primary.850"
              _hover={{
                background: "ed64a6",
              }}
              onClick={() => router.push(EnumConstRouter.CREATE_MUSIC)}
            >
              Create music
            </Button>
          </Flex>
          <Text fontWeight="bold" fontSize="lg" color="white" mt="8">
            Collection of musics
          </Text>
          {/*  <Box bg="gray.800" p="4" color="white" borderRadius="md" mt="4"> */}
          {/* <VirtualizedInfinite /> */}
          {/* <Pagination
              nPages={listMusic.length}
              currentPage={page}
              setCurrentPage={setPage}
              itemsPerPage={5}
              tableHeaders={[
                {
                  key: "title",
                  content: "Title",
                  width: "40%",
                  justifyContent: "left",
                },
                {
                  key: "album",
                  content: "Album",
                  width: "40%",
                  justifyContent: "right",
                },
                {
                  key: "timer",
                  content: "Genere",
                  justifyContent: "right",
                  pr: "10px",
                },
              ]}
              renderTableRows={ListMusic.map((music, index) => {
                return (
                  <>
                    <Tr
                      onClick={() => {
                        handleMusicActive(music.musicUrl);
                        setIsMusicActive(
                          music.isActive ? !music.isActive : true
                        );
                        setSelectedMusic(music);
                      }}
                      cursor="pointer"
                      key={music.nameMusic}
                    >
                      <Td fontSize="12px" pt="7px" pb="7px" pl="70px">
                        <Flex>
                          <Flex justifyContent="center" alignItems="center">
                            <Icon
                              color="white"
                              boxSize="20px"
                              ml="-30px"
                              mr="15px"
                              as={
                                music.isActive
                                  ? AiFillPauseCircle
                                  : AiFillCaretRight
                              }
                            />
                          </Flex>
                          <Image
                            alt="image album music"
                            objectFit="cover"
                            h="40px"
                            w="40px"
                            src={music.imageAlbum}
                          />
                          <Box ml="10px">
                            <Text mt="5px" color="white">
                              {music.nameMusic}
                            </Text>
                            <Text fontSize="10px" mt="-3px" color="white">
                              {music.author}
                            </Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td w="40%" color="white" fontSize="12px" pt="0" pb="7px">
                        <Flex justifyContent="right">{music.album}</Flex>
                      </Td>
                      <Td
                        pr="40px"
                        color="white"
                        fontSize="12px"
                        pt="0"
                        pb="7px"
                      >
                        <Flex justifyContent="right">{music.genere}</Flex>
                      </Td>
                    </Tr>

                    {index + 1 !== listMusic.length && (
                      <Tr>
                        <Td pt="0" pb="0" colSpan={4}>
                          <Flex w="full">
                            <Divider w="full" />
                          </Flex>
                        </Td>
                      </Tr>
                    )}
                  </>
                );
              })}
            /> */}
          {/* </Box> */}
          <Grid
            mt="20px"
            templateColumns="repeat(5, 1fr)"
            gap={6}
            position="relative"
            color="white"
          >
            {listMusic.map((music, index) => (
              <GridItem key={music.musicUrl}>
                <Box
                  backgroundImage={music.imageAlbum}
                  backgroundPosition="bottom"
                  backgroundRepeat="no-repeat"
                  borderRadius="6px"
                  backgroundSize="cover"
                  h="290px"
                  w="210px"
                  opacity="0.2"
                ></Box>
                <Box
                  h="290px"
                  top="0"
                  w="210px"
                  zIndex="9999"
                  position="absolute"
                >
                  <Image
                    w="210px"
                    borderTopEndRadius="6px"
                    borderTopStartRadius="6px"
                    objectFit="cover"
                    h="200"
                    alt={music.nameMusic}
                    src={music.imageAlbum}
                  />

                  <Flex alignItems="center" justifyContent="flex-end" w="full">
                    <Icon
                      boxSize="40px"
                      position="absolute"
                      top="180"
                      bg="white"
                      borderRadius="100px"
                      right="2"
                      color="secondary.200"
                      cursor="pointer"
                      onClick={() => {
                        handleMusicActive(music.musicUrl);
                        setIsMusicActive(
                          music.isActive ? !music.isActive : true
                        );
                        setSelectedMusic(music);
                      }}
                      as={music.isActive ? AiFillPauseCircle : AiFillPlayCircle}
                    />
                  </Flex>

                  <Box mt="10px">
                    <Text
                      fontSize="12px"
                      fontWeight="bold"
                      color="secondary.200"
                    >
                      {music.album}
                    </Text>
                    <Text fontSize="14px" fontWeight="bold">
                      {music.nameMusic}
                    </Text>
                    <Text>{music.author}</Text>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Flex>
    </FormProvider>
  );
}
