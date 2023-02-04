import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";

import { useMusicContext } from "store/contextMusic";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

import { Loading } from "components/Loading";
import { CardsMusic } from "components/CardsMusic";
import { Header } from "components/Header";

export default function AllCollections() {
  const formMethods = useForm({
    defaultValues: {
      searchMusic: "",
    },
  });
  const { watch } = formMethods;

  const searchMusicWatch = watch("searchMusic");

  const { listAllMusic, isLoading, handleDataMusic } = useMusicContext();

  const filterMusic = () =>
    listAllMusic.filter((repos) =>
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
          pr={["10px", "10px", "40px"]}
          overflow="auto"
        >
          <Header />
          <Text fontWeight="bold" fontSize="lg" color="white" mt="8">
            All collections
          </Text>
          <Text fontSize="xs" color="white" mb="8">
            Here you will find all the applications music collections
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
