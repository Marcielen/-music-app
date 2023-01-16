import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as firebase from "firebase/auth";

import { EnumConstRouter } from "constants/enumConstRouter";
import { firebaseAuth } from "services/firebase";

import { InputDefault } from "components/Input";

import { NextPageLayout } from "./_app";
import { auth } from "Modules/auth";

const Login: NextPageLayout = () => {
  const formMethods = useForm();

  const { handleSubmit } = formMethods;

  const router = useRouter();

  const handleSignIn = handleSubmit((data) => {
    const { email, password } = data;

    firebase
      .signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => {
        auth.setToken(value.user.getIdToken);
        router.push(EnumConstRouter.COLLECTIONS);
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
          bg="#ed64a6"
          _hover={{
            opacity: "0.8",
          }}
          mt="20px"
          color="white"
          variant=""
          w="full"
          onClick={() => handleSignIn()}
        >
          Login
        </Button>
      </FormProvider>
    </Box>
  );
};

Login.layout = "auth";
export default Login;
