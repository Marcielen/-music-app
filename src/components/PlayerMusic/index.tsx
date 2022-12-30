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
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
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
import { MdGraphicEq } from "react-icons/md";

export const PlayerMusic = () => {
  const { selectedMusic } = useMusicContext();

  const [isMusicActive, setIsMusicActive] = useState(false);
  const [isLoopMusic, setIsLoopMusic] = useState(false);
  const [progressMusic, setProgressMusic] = useState(0);
  const [durationMusic, setDurationMusic] = useState(0);
  const [musicHasSound, setMusicHasSound] = useState(true);
  const [valueVolumeMusic, setValueVolumeMusic] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleisMusicActive = useCallback(() => {
    setIsMusicActive(!isMusicActive);
  }, [isMusicActive]);

  const handleisMusicLoop = useCallback(() => {
    setIsLoopMusic(!isLoopMusic);
  }, [isLoopMusic]);

  const handleVolumeMusic = useCallback((volume: number) => {
    setValueVolumeMusic(volume);
    if (audioRef.current?.volume) {
      audioRef.current.volume = volume;
    }
  }, []);

  const handleMusicHasSound = useCallback(() => {
    setMusicHasSound(!musicHasSound);
  }, [musicHasSound]);

  function progressMusicPlayer() {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setDurationMusic(Math.floor(audioRef.current.duration));
      audioRef.current?.addEventListener("timeupdate", () => {
        setProgressMusic(Math.floor(Number(audioRef.current?.currentTime)));
      });
    }
  }

  function convertDurationToTimeString(duration: number) {
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    const finalResult = [minutes, seconds]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    return finalResult;
  }

  function handleSeek(amount: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = amount;
      setProgressMusic(amount);
    }
  }

  useEffect(() => {
    if (isMusicActive) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isMusicActive]);

  useEffect(() => {
    console.log(musicHasSound);
    if (audioRef.current?.volume || audioRef.current?.volume === 0) {
      if (musicHasSound) {
        audioRef.current.volume = valueVolumeMusic;
      } else {
        audioRef.current.volume = 0;
      }
    }
  }, [musicHasSound]);

  return (
    <Box bg="#181818" h="80px">
      <audio
        src={`https://docs.google.com/uc?export=download&id=${selectedMusic.musicUrl}`}
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

        /*  onEnded={}
            onLoadedMetadata={} */
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
        <Box>
          <HStack
            pr="20px"
            mt="10px"
            spacing="10px"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              color="white"
              boxSize="15px"
              cursor="not-allowed"
              as={AleatoryMusicIcon}
            />
            <Icon
              color="white"
              boxSize="20px"
              cursor="not-allowed"
              as={AiFillFastBackward}
            />
            <Icon
              color="white"
              boxSize="40px"
              cursor="pointer"
              onClick={() => handleisMusicActive()}
              as={isMusicActive ? AiFillPauseCircle : AiFillPlayCircle}
            />
            <Icon
              cursor="not-allowed"
              color="white"
              boxSize="20px"
              as={AiFillFastForward}
            />
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
          <Flex
            w="500px"
            ml="-10px"
            justifyContent="center"
            alignItems="center"
          >
            <Text fontSize="10px" mr="15px" color="white">
              {convertDurationToTimeString(progressMusic)}
            </Text>

            <Slider
              aria-label="player-slider"
              colorScheme="secondary"
              max={durationMusic}
              isDisabled={!selectedMusic.musicUrl}
              value={progressMusic}
              onChange={handleSeek}
            >
              <SliderTrack bg="gray.600" borderRadius="full">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb
                boxSize={4}
                borderWidth="3px"
                borderColor="secondary.500"
                _focus={{ boxShadow: "none" }}
              >
                <Box color="gray" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>

            <Text fontSize="10px" ml="15px" color="white">
              {convertDurationToTimeString(durationMusic)}
            </Text>
          </Flex>
        </Box>
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
              <SliderTrack bg="gray.200">
                <SliderFilledTrack bg="gray.600" />
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
