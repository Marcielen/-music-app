import { Box, BoxProps } from "@chakra-ui/react";

interface ContainerMenuProps extends BoxProps {
  children: React.ReactNode;
}

export const ContainerMenu = ({
  width,
  children,
  ...rest
}: ContainerMenuProps) => {
  return (
    <Box display="flex" flexDirection="column" bg="primary.900" height="full">
      <Box w={width} {...rest}>
        {children}
      </Box>
    </Box>
  );
};
