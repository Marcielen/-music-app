import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { useRouter } from "next/router";

import { useMusicContext } from "store/contextMusic";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

import { HeaderCollection } from "components/HeaderCollection";

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
    setListAllMusic,
    setIsMusicActive,
  } = useMusicContext();

  const routeAllCollection = router.pathname.includes(
    EnumConstRouter.ALL_COLLECTIONS
  );

  const isAllCollection = routeAllCollection;

  function handleMusicActive(url: string) {
    if (isAllCollection) {
      setListAllMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive: music.musicUrl === url ? !music.isActive : false,
        }));
      });
    } else {
      setListMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive: music.musicUrl === url ? !music.isActive : false,
        }));
      });
    }
  }

  const filterMusic = () =>
    listMusic.filter((repos) =>
      repos.nameMusic.toLowerCase().includes(searchMusicWatch.toLowerCase())
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
          <HeaderCollection />
          <Text fontWeight="bold" fontSize="lg" color="white" mt="8">
            Collection of musics
          </Text>
          <Text fontSize="xs" color="white" mb="8">
            Here you can find all your music collections
          </Text>

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
          <Flex justifyContent="center" alignItems="center">
            {isLoading && (
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="secondary.500"
                h="30px"
                w="30px"
              />
            )}
          </Flex>
          <Box h="40px" ref={elementRef} />
        </Box>
      </Flex>
    </FormProvider>
  );
}
