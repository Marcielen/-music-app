import { Box, VStack, Button, Text } from "@chakra-ui/react";

import { NextPageLayout } from "./_app";
import { FormProvider, useForm } from "react-hook-form";
import { InputDefault } from "components/Input";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";

const Login: NextPageLayout = () => {
  const formMethods = useForm();

  const router = useRouter();

  return (
    <Box w="full">
      <FormProvider {...formMethods}>
        <Text mb="10px" color="white" fontSize="12px">
          Enter the information you entered while registering
        </Text>
        <VStack spacing="20px" w="320px">
          <InputDefault
            colorLabel="white"
            label="E-mail"
            color="white"
            placeholder="Type your e-mail"
            bg="transparent"
            borderRadius="10px"
            name="email"
          />
          <InputDefault
            colorLabel="white"
            label="Password"
            bg="transparent"
            placeholder="Type your password"
            color="white"
            borderRadius="10px"
            name="senha"
          />
        </VStack>
        <Button
          mt="10px"
          fontSize="12px"
          color="white"
          onClick={() => router.push(EnumConstRouter.REGISTER_USER)}
          variant="link"
        >
          Register here!
        </Button>
        <Button
          bgGradient="linear(to-r, secondary.500, primary.900)"
          _hover={{
            opacity: "0.8",
          }}
          mt="20px"
          color="white"
          variant=""
          w="full"
          onClick={() => router.push(EnumConstRouter.HOME)}
        >
          Login
        </Button>
      </FormProvider>
    </Box>
  );
};

Login.layout = "auth";
export default Login;
