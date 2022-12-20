import { Box, Button, Text, Input, Image } from "@chakra-ui/react";
import { useRef } from "react";

export const PlayerMusic = () => {
  return (
    <Box bg="#181818" h="80px">
      <audio
        src="https://docs.google.com/uc?export=download&id=1irol4IgCI4L_k5Fo2oZsqFWA-gwXJ3tj"
        controls
      />
    </Box>
  );
};
