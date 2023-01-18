import {
  Box,
  Text,
  Image,
  Flex,
  Icon,
  HStack,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { MdGraphicEq } from "react-icons/md";

import { useMusicContext } from "store/contextMusic";

import { ControlMusic } from "./ControlMusic";

export const PlayerMusic = () => {
  const [musicHasSound, setMusicHasSound] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const valueVolumeMusic = useRef(1);

  const {
    selectedMusic,
    isLoopMusic,
    isMusicActive,
    setIsMusicActive,
    setListMusic,
    setProgressMusic,
    setDurationMusic,
    handleNextMusic,
  } = useMusicContext();

  const handleVolumeMusic = useCallback((volume: number) => {
    valueVolumeMusic.current = volume;
    if (audioRef.current?.volume) {
      audioRef.current.volume = volume;
    }
  }, []);

  const handleMusicHasSound = useCallback(() => {
    setMusicHasSound(!musicHasSound);
  }, [musicHasSound]);

  const handleSeek = (amount: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = amount;
      setProgressMusic(amount);
    }
  };

  function progressMusicPlayer() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setDurationMusic(Math.floor(audioRef.current.duration));
      audioRef.current?.addEventListener("timeupdate", () => {
        setProgressMusic(Math.floor(Number(audioRef.current?.currentTime)));
      });
    }
  }

  useEffect(() => {
    if (isMusicActive) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }

    setListMusic((previousValue) => {
      return previousValue.map((music) => ({
        ...music,
        isActive:
          music.musicUrl === selectedMusic.musicUrl ? isMusicActive : false,
      }));
    });
  }, [isMusicActive, selectedMusic, setListMusic]);

  useEffect(() => {
    if (audioRef.current?.volume || audioRef.current?.volume === 0) {
      if (musicHasSound) {
        audioRef.current.volume = valueVolumeMusic.current;
      } else {
        audioRef.current.volume = 0;
      }
    }
  }, [musicHasSound]);

  return (
    <Box bg="#212121" h="80px">
      <audio
        src={selectedMusic.musicUrl}
        ref={audioRef}
        id="audioMusic"
        loop={isLoopMusic}
        autoPlay
        onPlay={() => {
          setIsMusicActive(true);
        }}
        onPause={() => {
          setIsMusicActive(false);
        }}
        onLoadedMetadata={progressMusicPlayer}
        onEnded={() => handleNextMusic()}
      />
      <Flex
        h="full"
        justifyContent={selectedMusic.musicUrl ? "space-between" : "center"}
        alignItems="center"
        pl="20px"
        pr="20px"
      >
        {selectedMusic.musicUrl && (
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
        )}
        <ControlMusic handleSeek={handleSeek} />
        {selectedMusic.musicUrl && (
          <HStack
            w="100px"
            spacing="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              color="white"
              boxSize="20px"
              cursor="pointer"
              onClick={() => {
                handleMusicHasSound();
              }}
              as={musicHasSound ? BsFillVolumeUpFill : BsFillVolumeMuteFill}
            />

            <Slider
              onChange={(volume) => handleVolumeMusic(volume / 100)}
              aria-label="slider-ex-1"
              min={1}
              defaultValue={100}
            >
              <SliderTrack bg="gray.600">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb>
                <Box color="gray" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
          </HStack>
        )}
      </Flex>
    </Box>
  );
};
