import {
  Box,
  Flex,
  HStack,
  Icon,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import {
  AiFillFastBackward,
  AiFillFastForward,
  AiFillPauseCircle,
  AiFillPlayCircle,
} from "react-icons/ai";
import { MdGraphicEq } from "react-icons/md";

import { convertDurationToTimeString } from "Format/formatTimeMusic";
import { useMusicContext } from "store/contextMusic";

import { AleatoryMusicIcon, RepeatMusicIcon } from "icons";

type ControlMusicProps = {
  handleSeek: (amount: number) => void;
};

export const ControlMusic = ({ handleSeek }: ControlMusicProps) => {
  const {
    selectedMusic,
    isLoopMusic,
    isMusicActive,
    handleIsMusicActive,
    handleIsMusicLoop,
    progressMusic,
    durationMusic,
    handleNextMusic,
    handlePreviousMusic,
  } = useMusicContext();

  return (
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
          cursor="pointer"
          _hover={{
            color: "primary",
          }}
          onClick={() => handlePreviousMusic()}
          as={AiFillFastBackward}
        />
        <Icon
          boxSize="40px"
          color="white"
          cursor="pointer"
          onClick={() => handleIsMusicActive()}
          as={isMusicActive ? AiFillPauseCircle : AiFillPlayCircle}
        />
        <Icon
          cursor="pointer"
          color="white"
          boxSize="20px"
          _hover={{
            color: "primary",
          }}
          onClick={() => handleNextMusic()}
          as={AiFillFastForward}
        />
        <Box position="relative">
          <Icon
            color={isLoopMusic ? "primary" : "white"}
            cursor="pointer"
            onClick={() => handleIsMusicLoop()}
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
              color="primary"
            >
              1
            </Text>
          )}
        </Box>
      </HStack>
      <Flex w="500px" ml="-10px" justifyContent="center" alignItems="center">
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
          focusThumbOnChange={false}
        >
          <SliderTrack bg="gray.600" borderRadius="full">
            <SliderFilledTrack
              _hover={{
                background: "primary",
              }}
              bg="white"
            />
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
  );
};
