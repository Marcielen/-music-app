import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import { useMusicContext } from "store/contextMusic";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

import { Header } from "components/Header";
import { CardsMusic } from "components/CardsMusic";

export default function Search() {
  const formMethods = useForm({
    defaultValues: {
      searchMusic: "",
    },
  });
  const { watch } = formMethods;

  const searchMusicWatch = watch("searchMusic");
  const { listMusic, isLoading, handleDataMusic } = useMusicContext();

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
          <Header />
          <Text fontWeight="bold" fontSize="lg" color="white" mt="8">
            Collection of musics
          </Text>
          <Text fontSize="xs" color="white" mb="8">
            Here you can find all your music collections
          </Text>

          <CardsMusic dataMusic={dataMusic} />
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
