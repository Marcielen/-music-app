import React from "react";
import { SimpleGrid, SimpleGridProps } from "@chakra-ui/react";

export const SimpleGridForm = ({ children, ...rest }: SimpleGridProps) => {
  return (
    <SimpleGrid gap={{ base: 3, sm: 6, md: 8 }} columns={12} {...rest}>
      {children}
    </SimpleGrid>
  );
};
