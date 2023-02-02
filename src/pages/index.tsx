import { useState } from "react";
import { Box, VStack, Button, Text, Flex, Icon } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as firebase from "firebase/auth";

import { GrFacebookOption } from "react-icons/gr";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

import { EnumConstRouter } from "constants/enumConstRouter";
import { firebaseAuth } from "services/firebase";
import { auth } from "modules/auth";

import { InputDefault } from "components/Input";
import { LogoGoogle } from "icons";

import { NextPageLayout } from "./_app";

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
      .catch((error) => {
        toast.warning(error);
      });
  });

  const handleSingInFacebook = () => {
    setIsLoading(true);

    firebase
      .signInWithPopup(firebaseAuth, new FacebookAuthProvider())
      .then(async (value) => {
        await auth.setToken(value.user.uid);
        await auth.setNameUser(value.user.displayName);
        await auth.setPhotoUser(value.user.photoURL);

        router.push(EnumConstRouter.HOME);
      })
      .catch((err) => toast.warning(err))
      .finally(() => setIsLoading(false));
  };

  const handleSingInGoogle = async () => {
    setIsLoading(true);
    console.log("oi");
    await firebase
      .signInWithPopup(firebaseAuth, new GoogleAuthProvider())
      .then(async (value) => {
        await auth.setToken(value.user.uid);
        await auth.setEmail(value.user.email);
        await auth.setNameUser(value.user.displayName);
        await auth.setPhotoUser(value.user.photoURL);

        router.push(EnumConstRouter.HOME);
      })
      .catch((err) => toast.warning(err))
      .finally(() => {
        setIsLoading(false);
        console.log("oi");
      });
  };

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
        <Text mt="10px" color="white" fontSize="12px">
          Connect with
        </Text>
        <Flex mt="10px" justifyContent="space-evenly">
          <Button
            bg="primary.800"
            onClick={() => handleSingInFacebook()}
            variant=""
            _hover={{
              opacity: 0.7,
            }}
            color="white"
            leftIcon={
              <Icon color="white" boxSize="20px" as={GrFacebookOption} />
            }
          >
            Facebook
          </Button>
          <Button
            bg="primary.800"
            onClick={() => handleSingInGoogle()}
            variant=""
            _hover={{
              opacity: 0.7,
            }}
            color="white"
            leftIcon={<Icon color="white" boxSize="20px" as={LogoGoogle} />}
          >
            Google
          </Button>
        </Flex>
        <Flex
          alignItems="baseline"
          justifyContent="center"
          color="white"
          mt="20px"
        >
          <Text fontSize="12px" mr="5px">
            Not a member?
          </Text>
          <Button
            mt="10px"
            fontSize="12px"
            color="white"
            onClick={() => router.push(EnumConstRouter.REGISTER_USER)}
            variant="link"
          >
            Register here!
          </Button>
        </Flex>
      </FormProvider>
    </Box>
  );
};

Login.layout = "auth";
export default Login;
