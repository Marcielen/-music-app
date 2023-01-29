import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { RiPlayListFill } from "react-icons/ri";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { useRouter } from "next/router";

import { useMusicContext } from "store/contextMusic";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

import { InputDefault } from "components/Input";
import { Loading } from "components/Loading";

export default function Search() {
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
    isLoading,
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

  const filterMusic = () =>
    listMusic.filter((valueMusic) =>
      Object.values(valueMusic)
        .flat()
        .some((nameMusic) =>
          `${nameMusic}`
            .toLowerCase()
            .includes(`${searchMusicWatch}`.toLowerCase())
        )
    );
  const dataMusic = filterMusic();

  const { elementRef } = useIntersectionObserver({
    onIntersecting: handleDataMusic,
  });

  return (
    <FormProvider {...formMethods}>
      <Flex
        w="full"
        zIndex="2"
        justifyContent="space-between"
        bg="black"
        overflow="auto"
      >
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
          w="full"
          pt="35px"
          pr="40px"
          maxH="calc(100vh - 80px)"
          overflow="auto"
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
                background: "pink.400",
              }}
              onClick={() => router.push(EnumConstRouter.CREATE_MUSIC)}
            >
              Create music
            </Button>
          </Flex>
          <Text fontWeight="bold" fontSize="lg" color="white" mt="8">
            Collection of musics
          </Text>
          <Text fontSize="xs" color="white" mb="8">
            Here you can find all your music collections
          </Text>
          {isLoading && <Loading />}
          <Grid
            mt="20px"
            templateColumns="repeat(auto-fill, 210px)"
            position="relative"
            rowGap="50px"
            columnGap="5.6%"
            color="white"
          >
            {dataMusic.map((music) => (
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
                <Box h="290px" mt="-300px" w="210px" position="absolute">
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
                      right="2"
                      borderRadius="100px"
                      bg="white"
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

                  <Box pl="15px" mt="10px">
                    <Text
                      fontSize="12px"
                      fontWeight="bold"
                      color="secondary.200"
                    >
                      {music.album}
                    </Text>
                    <Text fontSize="14px" mt="3px" fontWeight="bold">
                      {music.nameMusic}
                    </Text>
                    <Text mt="3px">{music.author}</Text>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
          <Box h="40px" ref={elementRef} />
        </Box>
      </Flex>
    </FormProvider>
  );
}
