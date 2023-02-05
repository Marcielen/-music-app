import { Box, FlexProps, Flex, useMediaQuery } from "@chakra-ui/react";

interface ContainerMenuProps extends FlexProps {
  children: React.ReactNode;
}

export const ContainerMenu = ({
  width,
  children,
  ...rest
}: ContainerMenuProps) => {
  const [mobile] = useMediaQuery("(max-width: 900px)");
  return (
    <Flex
      flexDirection={mobile ? "row" : "column"}
      bg="primary.900"
      height="full"
    >
      <Box
        display={mobile ? "flex" : "column"}
        justifyContent={mobile ? "space-between" : undefined}
        w={width}
        {...rest}
      >
        {children}
      </Box>
    </Flex>
  );
};
