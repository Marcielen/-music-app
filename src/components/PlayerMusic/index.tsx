import {
  Box,
  Button,
  Text,
  Input,
  Image,
  Flex,
  Icon,
  HStack,
  Progress,
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
  const [isLoopMusic, setIsLoopMusic] = useState(false);
  const [progressMusic, setProgressMusic] = useState(0);
  const [durationMusic, setDurationMusic] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleisMusicActive = useCallback(() => {
    setIsMusicActive(!isMusicActive);
  }, [isMusicActive]);

  const handleisMusicLoop = useCallback(() => {
    setIsLoopMusic(!isLoopMusic);
  }, [isLoopMusic]);
  console.log(progressMusic, durationMusic);

  function progressMusicPlayer() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setDurationMusic(Math.floor(audioRef.current.duration));
      audioRef.current?.addEventListener("timeupdate", () => {
        setProgressMusic(Math.floor(Number(audioRef.current?.currentTime)));
      });
    }
  }

  const valueProgressMusic = useCallback(() => {
    const progress = progressMusic * 100;

    return progress / durationMusic;
  }, [durationMusic, progressMusic])();

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
        loop={isLoopMusic}
        autoPlay
        onPlay={() => {
          setIsMusicActive(true);
        }}
        onPause={() => {
          setIsMusicActive(false);
        }}
        onLoadedMetadata={progressMusicPlayer}
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
        <Box>
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
            <Box position="relative">
              <Icon
                color="white"
                cursor="pointer"
                onClick={() => handleisMusicLoop()}
                boxSize="17px"
                mt="-3px"
                as={RepeatMusicIcon}
              />
              {isLoopMusic && (
                <Text
                  fontSize="5px"
                  left="7px"
                  top="8.8px"
                  position="absolute"
                  color="white"
                >
                  1
                </Text>
              )}
            </Box>
          </HStack>
          <Flex ml="-10px" justifyContent="center" alignItems="center">
            <Text fontSize="10px" mr="5px" color="white">
              {(durationMusic / 60).toFixed(2)}
            </Text>
            <Progress
              value={valueProgressMusic}
              w="350px"
              size="xs"
              colorScheme="gray"
            />
            <Text fontSize="10px" ml="5px" color="white">
              {(progressMusic / 60).toFixed(2)}
            </Text>
          </Flex>
        </Box>
        <HStack
          w="60px"
          spacing="10px"
          justifyContent="center"
          alignItems="center"
        >
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
