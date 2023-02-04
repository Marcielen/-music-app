import { Box, Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";

import { ListMusicProps, useMusicContext } from "store/contextMusic";

type CardsMusicProps = {
  dataMusic: ListMusicProps[];
};

export const CardsMusic = ({ dataMusic }: CardsMusicProps) => {
  const { setSelectedMusic, handleMusicActive, setIsMusicActive } =
    useMusicContext();

  return (
    <Grid
      mt="20px"
      templateColumns="repeat(auto-fill, 210px)"
      position="relative"
      rowGap="50px"
      columnGap="5.6%"
      color="white"
    >
      {dataMusic.map((music) => (
        <GridItem ml="5px" key={music.musicUrl}>
          <Box
            backgroundImage={music.imageAlbum}
            backgroundPosition="bottom"
            backgroundRepeat="no-repeat"
            borderRadius="6px"
            backgroundSize="cover"
            h="290px"
            w="210px"
            opacity="0.2"
          ></Box>
          <Box h="290px" mt="-300px" w="210px" position="absolute">
            <Image
              w="208px"
              borderTopEndRadius="6px"
              borderTopStartRadius="6px"
              objectFit="cover"
              h="190px"
              mt="10px"
              alt={music.nameMusic}
              src={music.imageAlbum}
            />

            <Flex alignItems="center" justifyContent="flex-end" w="full">
              <Icon
                boxSize="40px"
                position="absolute"
                top="180"
                right="2"
                borderRadius="100px"
                bg="white"
                color="secondary.200"
                cursor="pointer"
                onClick={() => {
                  handleMusicActive(music.musicUrl);
                  setIsMusicActive(music.isActive ? !music.isActive : true);
                  setSelectedMusic(music);
                }}
                as={music.isActive ? AiFillPauseCircle : AiFillPlayCircle}
              />
            </Flex>

            <Box pl="15px" mt="10px">
              <Text fontSize="12px" fontWeight="bold" color="secondary.200">
                {music.album}
              </Text>
              <Text fontSize="14px" mt="3px" fontWeight="bold">
                {music.nameMusic}
              </Text>
              <Text mt="3px">{music.author}</Text>
            </Box>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};
