import { useState } from "react";
import { Box, VStack, Text, Button } from "@chakra-ui/react";
import { GenresMusic } from "components/GenresMusic";
import { PlayerMusic } from "components/PlayerMusic";

import { Menu } from "../components/Menu";
import { NextPageLayout } from "./_app";
import { FormProvider, useForm } from "react-hook-form";
import { InputDefault } from "components/Input";

const Login: NextPageLayout = () => {
  const formMethods = useForm();

  return (
    <Box w="full">
      <FormProvider {...formMethods}>
        <VStack spacing="20px" w="320px">
          <InputDefault
            colorLabel="white"
            label="Email"
            bg="transparent"
            borderRadius="10px"
            name="email"
          />
          <InputDefault
            colorLabel="white"
            label="Password"
            bg="transparent"
            borderRadius="10px"
            name="senha"
          />
        </VStack>
        <Button
          bgGradient="linear(to-r, secondary.500, primary.900)"
          _hover={{
            opacity: "0.8",
          }}
          mt="20px"
          color="white"
          variant=""
          w="full"
        >
          Login
        </Button>
      </FormProvider>
    </Box>
  );
};

Login.layout = "auth";
export default Login;
