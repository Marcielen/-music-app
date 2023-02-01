import { useState } from "react";
import { Box, VStack, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as firebase from "firebase/auth";

import { EnumConstRouter } from "constants/enumConstRouter";
import { firebaseAuth } from "services/firebase";
import { auth } from "modules/auth";

import { InputDefault } from "components/Input";

import { NextPageLayout } from "./_app";
import { BsGithub } from "react-icons/bs";

const Login: NextPageLayout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useForm();

  const { handleSubmit } = formMethods;

  const router = useRouter();

  const handleSignIn = handleSubmit((data) => {
    setIsLoading(true);
    const { email, password } = data;

    firebase
      .signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (value) => {
        await auth.setToken(value.user.uid);

        router.push(EnumConstRouter.HOME);
      })
      .catch(() => {
        toast.warning("error");
      });
  });

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
            textFillColor="white"
            borderRadius="10px"
            name="email"
          />
          <InputDefault
            colorLabel="white"
            label="Password"
            bg="transparent"
            textFillColor="white"
            placeholder="Type your password"
            color="white"
            borderRadius="10px"
            isPassword
            name="password"
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
          bg="secondary.400"
          _hover={{
            opacity: "0.8",
          }}
          mt="25px"
          color="white"
          isLoading={isLoading}
          variant=""
          w="full"
          onClick={() => handleSignIn()}
        >
          Login
        </Button>
        <Flex>
          <Icon color="white" boxSize="40px" as={BsGithub} />
        </Flex>
      </FormProvider>
    </Box>
  );
};

Login.layout = "auth";
export default Login;
