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
  useMediaQuery,
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

  const [mobile] = useMediaQuery("(max-width: 900px)");

  return (
    <Flex flexDirection={mobile ? "column-reverse" : "column"}>
      <HStack
        pr={mobile ? undefined : "20px"}
        mt={mobile ? "20px" : "10px"}
        spacing="10px"
        justifyContent={mobile ? "space-between" : "center"}
        alignItems="center"
      >
        <Icon
          color="white"
          _hover={{
            color: "secondary.200",
          }}
          boxSize={mobile ? "40px" : "15px"}
          cursor="pointer"
          as={AleatoryMusicIcon}
        />
        <HStack>
          <Icon
            color="white"
            boxSize={mobile ? "50px" : "20px"}
            cursor="pointer"
            _hover={{
              color: "secondary.200",
            }}
            onClick={() => handlePreviousMusic()}
            as={AiFillFastBackward}
          />
          <Icon
            boxSize={mobile ? "70px" : "40px"}
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
            boxSize={mobile ? "50px" : "20px"}
            _hover={{
              color: "secondary.200",
            }}
            onClick={() => handleNextMusic()}
            as={AiFillFastForward}
          />
        </HStack>
        <Box position="relative">
          <Icon
            color={isLoopMusic ? "secondary.200" : "white"}
            cursor="pointer"
            _hover={{
              color: "secondary.200",
            }}
            onClick={() => handleIsMusicLoop()}
            boxSize={mobile ? "50px" : "17px"}
            mt={mobile ? undefined : "-3px"}
            as={RepeatMusicIcon}
          />
          {isLoopMusic && (
            <Text
              fontSize={mobile ? "10px" : "5px"}
              left={mobile ? "22px" : "7px"}
              top={mobile ? "16px" : "8.8px"}
              position="absolute"
              color="secondary.200"
            >
              1
            </Text>
          )}
        </Box>
      </HStack>
      <Flex
        w={mobile ? "100%" : "500px"}
        ml={mobile ? undefined : "-10px"}
        mt={mobile ? "10px" : "2px"}
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
    </Flex>
  );
};
