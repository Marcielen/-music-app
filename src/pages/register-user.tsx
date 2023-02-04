import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as firebase from "firebase/auth";

import { EnumConstRouter } from "constants/enumConstRouter";
import { firebaseAuth } from "services/firebase";

import { InputDefault } from "components/Input";

import { NextPageLayout } from "./_app";
import { yupResolver, FormData } from "validation/validationAuthUser";

const RegisterUser: NextPageLayout = () => {
  const formMethods = useForm<FormData>({
    resolver: yupResolver,
  });
  const { handleSubmit } = formMethods;

  const router = useRouter();

  const handleSignOut = handleSubmit(async (data) => {
    const { email, password } = data;

    await firebase
      .createUserWithEmailAndPassword(firebaseAuth, email, password)
      .catch((error) => {
        toast.warning(
          error.message.replaceAll("-", " ").replaceAll(")", "").split("/")[1]
        );
      })
      .then((user) => {
        if (user !== undefined) {
          router.push(EnumConstRouter.LOGIN);
          toast.success("Your records have been saved successfully");
        }
      });
  });

  return (
    <Box w="full">
      <FormProvider {...formMethods}>
        <Text mb="10px" color="white" fontSize="12px">
          Inform your records and register!
        </Text>
        <VStack spacing="20px" w="full">
          <InputDefault
            colorLabel="white"
            textFillColor="white"
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
            textFillColor="white"
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
          onClick={() => router.push(EnumConstRouter.LOGIN)}
          fontSize="12px"
          color="white"
          variant="link"
        >
          Back to login
        </Button>
        <Button
          bg="secondary.400"
          _hover={{
            opacity: "0.8",
          }}
          mt="25px"
          color="white"
          variant=""
          w="full"
          onClick={() => handleSignOut()}
        >
          Register
        </Button>
      </FormProvider>
    </Box>
  );
};

RegisterUser.layout = "auth";
export default RegisterUser;
