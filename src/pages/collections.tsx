import {
  Box,
  Button,
  Divider,
  Flex,
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
import { AiFillCaretRight, AiFillPauseCircle } from "react-icons/ai";

import { useMusicContext } from "store/contextMusic";

import { InputDefault } from "components/Input";
import { Menu } from "components/Menu";
import { Pagination } from "components/Pagination";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useRouter } from "next/router";

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

  const { setSelectedMusic, listMusic, setListMusic, setIsMusicActive } =
    useMusicContext();

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
        bg="#0E0E0E"
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
          <Flex pl="15px" pr="15px" w="full" justifyContent="space-between">
            <Box w={["full", "full", "350px"]}>
              <InputDefault
                autoFocus
                borderRadius="10px"
                iconLeftElement={FiSearch}
                name="searchMusic"
              />
            </Box>
            <Button
              leftIcon={<Icon as={RiPlayListFill} />}
              variant="solid"
              color="white"
              bg="primary.500"
              _hover={{
                background: "ed64a6",
              }}
              w="200px"
              onClick={() => router.push(EnumConstRouter.CREATE_MUSIC)}
            >
              Create music
            </Button>
          </Flex>
          <Pagination
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
                      setIsMusicActive(music.isActive ? !music.isActive : true);
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
                    <Td pr="40px" color="white" fontSize="12px" pt="0" pb="7px">
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
          />
        </Box>
      </Flex>
    </FormProvider>
  );
}