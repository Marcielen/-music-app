import { Box, Button, Flex, GridItem } from "@chakra-ui/react";
import { InputDefault } from "components/Input";
import { Menu } from "components/Menu";
import { SimpleGridForm } from "components/SimpleGridForm";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CreateMusic() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  return (
    <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
      <Menu setMenuIsOpen={setMenuIsOpen} />
      <Box
        pt="35px"
        pl={menuIsOpen ? "40px" : "20px"}
        pr="40px"
        transition="all ease 1.5s"
        w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
      >
        <FormProvider {...useForm()}>
          <SimpleGridForm mt="50px">
            <GridItem colSpan={4}>
              <InputDefault
                bg="primary.100"
                name="author"
                colorLabel="white"
                label="Author"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                bg="primary.100"
                name="nameMusic"
                colorLabel="white"
                label="Name music"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                bg="primary.100"
                name="album"
                colorLabel="white"
                label="Album"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                bg="primary.100"
                name="genere"
                colorLabel="white"
                label="Genere"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                name="musicUrl"
                bg="primary.100"
                colorLabel="white"
                label="Music url"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                bg="primary.100"
                name="imageUrl"
                colorLabel="white"
                label="Image url"
              />
            </GridItem>
          </SimpleGridForm>
          <Flex justifyContent="center" mt="60px">
            <Button
              variant="solid"
              color="white"
              bg="primary.500"
              _hover={{
                background: "ed64a6",
              }}
              w="200px"
            >
              Create music
            </Button>
          </Flex>
        </FormProvider>
      </Box>
    </Flex>
  );
}
