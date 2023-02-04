import { Box, Spinner, SpinnerProps } from "@chakra-ui/react";

export const Loading = ({ color, ...rest }: SpinnerProps) => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      marginRight="-50%"
      transform="translate(-50%, -50%)"
      transition="all ease 4s"
      minW="100%"
      minH="100%"
      zIndex="998"
      {...rest}
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        marginRight="-50%"
        zIndex="998"
        transform="translate(-50%, -50%)"
      >
        <Spinner
          thickness="8px"
          speed="0.65s"
          emptyColor="gray.200"
          color="secondary.500"
          h="60px"
          w="60px"
        />
      </Box>
    </Box>
  );
};
