import { Box, Button, Text, Input, Image, Flex, Icon } from "@chakra-ui/react";
import { useRef } from "react";
import { useMusicContext } from "store/contextMusic";
import {
  AiFillCaretRight,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";

export const PlayerMusic = () => {
  const { selectedMusic } = useMusicContext();
  const audioRef = useRef<HTMLAudioElement>(null);

  /* audioRef.current.play(); */

  return (
    <Box bg="#181818" h="80px">
      <audio
        src="https://docs.google.com/uc?export=download&id=1irol4IgCI4L_k5Fo2oZsqFWA-gwXJ3tj"
        ref={audioRef}
      />
      <Flex
        h="full"
        justifyContent="space-between"
        alignItems="center"
        pl="20px"
      >
        <Flex>
          <Image
            objectFit="cover"
            h="60px"
            w="60px"
            alt="image album music"
            src={selectedMusic.imageAlbum}
          />
          <Box ml="10px">
            <Text mt="5px" color="gray.300">
              {selectedMusic.nameMusic}
            </Text>
            <Text fontSize="10px" mt="5px" color="gray.300">
              {selectedMusic.author}
            </Text>
          </Box>
        </Flex>
        <Flex>
          <Icon as={AiFillPlayCircle} />
        </Flex>
      </Flex>
    </Box>
  );
};
