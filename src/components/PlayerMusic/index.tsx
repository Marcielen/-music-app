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
  useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AiFillFastBackward,
  AiFillFastForward,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { MdGraphicEq } from "react-icons/md";

import { EnumConstRouter } from "constants/enumConstRouter";
import { useMusicContext } from "store/contextMusic";

import { ControlMusic } from "./ControlMusic";
import { ExpandPlayer } from "./ExpandPlayer";

export const PlayerMusic = () => {
  const [musicHasSound, setMusicHasSound] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const valueVolumeMusic = useRef(1);

  const {
    selectedMusic,
    isLoopMusic,
    isMusicActive,
    isExpandPlayer,
    setIsMusicActive,
    setListMusic,
    handleIsMusicActive,
    handleExpandPlayer,
    setListAllMusic,
    handlePreviousMusic,
    setProgressMusic,
    setDurationMusic,
    handleNextMusic,
  } = useMusicContext();

  const { pathname } = useRouter();

  const [mobile] = useMediaQuery("(max-width: 900px)");

  const routeAllCollection =
    pathname.includes(EnumConstRouter.ALL_COLLECTIONS) ||
    pathname.includes(EnumConstRouter.GENERE);

  const isAllCollection = routeAllCollection;

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

    if (isAllCollection) {
      setListAllMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive:
            music.musicUrl === selectedMusic.musicUrl ? isMusicActive : false,
        }));
      });
    } else {
      setListMusic((previousValue) => {
        return previousValue.map((music) => ({
          ...music,
          isActive:
            music.musicUrl === selectedMusic.musicUrl ? isMusicActive : false,
        }));
      });
    }
  }, [
    isMusicActive,
    selectedMusic,
    isAllCollection,
    setListAllMusic,
    setListMusic,
  ]);

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
    <Box
      bg="primary.850"
      zIndex="9999"
      h={mobile ? (isExpandPlayer ? "calc(100vh - 40px)" : "60px") : "80px"}
    >
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

      {isExpandPlayer ? (
        <ExpandPlayer handleSeek={handleSeek} />
      ) : (
        <Flex
          h="full"
          justifyContent={selectedMusic.musicUrl ? "space-between" : "center"}
          alignItems="center"
          onClick={() => {
            if (mobile && !isExpandPlayer) {
              handleExpandPlayer();
            }
          }}
          pl={mobile ? "10px" : "20px"}
          pr={mobile ? "10px" : "20px"}
        >
          {selectedMusic.musicUrl && (
            <Flex alignItems="center">
              <Image
                objectFit="cover"
                h={mobile ? "40px" : "60px"}
                w={mobile ? "40px" : "60px"}
                alt="image album music"
                src={selectedMusic.imageAlbum}
              />
              <Box ml="10px">
                <Text mt="5px" fontSize="12px" color="gray.300">
                  {selectedMusic.nameMusic}
                </Text>
                <Text fontSize="10px" mt="2px" color="gray.300">
                  {selectedMusic.author}
                </Text>
              </Box>
            </Flex>
          )}
          {mobile ? (
            <HStack
              mt="10px"
              spacing="5px"
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                color="white"
                boxSize="15px"
                cursor="pointer"
                _hover={{
                  color: "secondary.200",
                }}
                onClick={() => handlePreviousMusic()}
                as={AiFillFastBackward}
              />
              <Icon
                boxSize="35px"
                cursor="pointer"
                color="white"
                _hover={{
                  color: "secondary.200",
                }}
                onClick={() => handleIsMusicActive()}
                as={isMusicActive ? AiFillPauseCircle : AiFillPlayCircle}
              />
              <Icon
                cursor="pointer"
                color="white"
                boxSize="15px"
                _hover={{
                  color: "secondary.200",
                }}
                onClick={() => handleNextMusic()}
                as={AiFillFastForward}
              />
            </HStack>
          ) : (
            <>
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
                    as={
                      musicHasSound ? BsFillVolumeUpFill : BsFillVolumeMuteFill
                    }
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
                    <SliderThumb
                      boxSize={4}
                      borderWidth="3px"
                      borderColor="secondary.500"
                      _focus={{ boxShadow: "none" }}
                    >
                      <Box
                        color="primary.300"
                        borderColor="primary.300"
                        as={MdGraphicEq}
                      />
                    </SliderThumb>
                  </Slider>
                </HStack>
              )}
            </>
          )}
        </Flex>
      )}
    </Box>
  );
};
