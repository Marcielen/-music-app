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

import { convertDurationToTimeString } from "format/formatTimeMusic";
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
            color: "secondary.200",
          }}
          onClick={() => handlePreviousMusic()}
          as={AiFillFastBackward}
        />
        <Icon
          boxSize="40px"
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
          boxSize="20px"
          _hover={{
            color: "secondary.200",
          }}
          onClick={() => handleNextMusic()}
          as={AiFillFastForward}
        />
        <Box position="relative">
          <Icon
            color={isLoopMusic ? "secondary.200" : "white"}
            cursor="pointer"
            _hover={{
              color: "secondary.200",
            }}
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
              color="secondary.200"
            >
              1
            </Text>
          )}
        </Box>
      </HStack>
      <Flex
        w="500px"
        ml="-10px"
        mt="2px"
        justifyContent="center"
        alignItems="center"
      >
        <Text fontSize="10px" mr="15px" color="white">
          {convertDurationToTimeString(progressMusic)}
        </Text>

        <Slider
          aria-label="player-slider"
          colorScheme="primary"
          max={durationMusic}
          isDisabled={!selectedMusic.musicUrl}
          value={progressMusic}
          onChange={handleSeek}
          focusThumbOnChange={false}
        >
          <SliderTrack bg="gray.600" borderRadius="full">
            <SliderFilledTrack bg="primary.200" />
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
