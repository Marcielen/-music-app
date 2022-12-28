import {
  Box,
  Button,
  Text,
  Input,
  Image,
  Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMusicContext } from "store/contextMusic";
import {
  AiFillCaretRight,
  AiFillPauseCircle,
  AiFillFastForward,
  AiFillPlayCircle,
  AiFillFastBackward,
} from "react-icons/ai";

import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { AleatoryMusicIcon, RepeatMusicIcon } from "icons";

export const PlayerMusic = () => {
  const { selectedMusic } = useMusicContext();

  const [isMusicActive, setIsMusicActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleisMusicActive = useCallback(() => {
    setIsMusicActive(!isMusicActive);
  }, [isMusicActive]);

  useEffect(() => {
    if (isMusicActive) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isMusicActive]);

  return (
    <Box bg="#181818" h="80px">
      <audio
        src={`https://docs.google.com/uc?export=download&id=${selectedMusic.musicUrl}`}
        ref={audioRef}
        /* loop={} */
        autoPlay
        onPlay={() => {
          setIsMusicActive(true);
        }}
        onPause={() => {
          setIsMusicActive(false);
        }}
        /*  onEnded={}
            onLoadedMetadata={} */
      />
      <Flex
        h="full"
        justifyContent="space-between"
        alignItems="center"
        pl="20px"
        pr="20px"
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
        <HStack
          pr="20px"
          spacing="10px"
          justifyContent="center"
          alignItems="center"
        >
          <Icon color="white" boxSize="15px" as={AleatoryMusicIcon} />
          <Icon color="white" boxSize="20px" as={AiFillFastBackward} />
          <Icon
            color="white"
            boxSize="40px"
            cursor="pointer"
            onClick={() => handleisMusicActive()}
            as={isMusicActive ? AiFillPauseCircle : AiFillPlayCircle}
          />
          <Icon color="white" boxSize="20px" as={AiFillFastForward} />
          <Icon color="white" boxSize="15px" as={RepeatMusicIcon} />
        </HStack>
        <HStack spacing="10px" justifyContent="center" alignItems="center">
          <Icon
            color="white"
            boxSize="20px"
            onClick={() => audioRef.current?.loop}
            as={BsFillVolumeUpFill}
          />
        </HStack>
      </Flex>
    </Box>
  );
};
