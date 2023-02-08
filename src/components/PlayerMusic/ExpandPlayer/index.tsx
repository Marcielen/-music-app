import { Box, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import router from "next/router";

import { EnumConstRouter } from "constants/enumConstRouter";
import { useMusicContext } from "store/contextMusic";

import { ControlMusic } from "../ControlMusic";

type ExpandPlayerProps = {
  handleClick?: () => void;
  handleSeek: (amount: number) => void;
};

export const ExpandPlayer = ({
  handleClick,
  handleSeek,
}: ExpandPlayerProps) => {
  const { selectedMusic } = useMusicContext();
  return (
    <Flex
      pt="10%"
      pl="4%"
      h="full"
      pr="4%"
      color="white"
      display="column"
      justifyContent="space-between"
    >
      <Flex>
        <Icon
          onClick={() => {
            if (handleClick) {
              handleClick();
              router.push(EnumConstRouter.ALL_COLLECTIONS);
            }
          }}
          boxSize="20px"
          cursor="pointer"
          as={AiOutlineArrowLeft}
        />
      </Flex>
      <Flex
        pt="40px"
        w="full"
        h="full"
        display="column"
        justifyContent="center"
      >
        <Flex justifyContent="center">
          <Image
            borderRadius="12px"
            h="250px"
            w="250px"
            objectFit="cover"
            alt="image album music"
            src={selectedMusic.imageAlbum}
          />
        </Flex>
        <Box mb="30px" mt="15px" w="full" alignItems="center">
          <Text fontSize="16px" textAlign="center">
            {selectedMusic.author}
          </Text>
          <Text fontSize="14px" mt="5px" color="primary.400" textAlign="center">
            {selectedMusic.nameMusic}
          </Text>
        </Box>
        <ControlMusic handleSeek={handleSeek} />
      </Flex>
    </Flex>
  );
};
