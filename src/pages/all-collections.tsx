import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { FiSearch } from "react-icons/fi";
import { RiPlayListFill } from "react-icons/ri";
import { useRouter } from "next/router";

import { useMusicContext } from "store/contextMusic";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

import { InputDefault } from "components/Input";
import { Loading } from "components/Loading";
import { CardsMusic } from "components/CardsMusic";

export default function AllCollections() {
  const formMethods = useForm({
    defaultValues: {
      searchMusic: "",
    },
  });
  const { watch } = formMethods;

  const searchMusicWatch = watch("searchMusic");
  const router = useRouter();

  const { listMusic, isLoading, handleDataMusic } = useMusicContext();

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
            All collections
          </Text>
          <Text fontSize="xs" color="white" mb="8">
            Here you will find all the applications music collections
          </Text>
          {isLoading && <Loading />}
          <CardsMusic dataMusic={dataMusic} />
          <Box h="40px" ref={elementRef} />
        </Box>
      </Flex>
    </FormProvider>
  );
}
