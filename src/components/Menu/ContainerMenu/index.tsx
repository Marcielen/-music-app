import {
  Box,
  ComponentWithAs,
  Flex,
  FlexProps,
  Icon,
  IconProps,
  BoxProps,
} from "@chakra-ui/react";

interface ContainerMenuProps extends BoxProps {
  transform: string;
  handleAnimation: () => void;
  children: React.ReactNode;
}

export const ContainerMenu = ({
  transform,
  width,
  children,
  handleAnimation,
  ...rest
}: ContainerMenuProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      bg="black"
      transform={transform}
      height="full"
      position="absolute"
      top="0"
      left="0"
      transition="transform 0.9s ease-in-out"
    >
      <Box onClick={() => handleAnimation()} w={width} {...rest}>
        {children}
      </Box>
    </Box>
  );
};
