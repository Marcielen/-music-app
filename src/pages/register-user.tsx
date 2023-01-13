import { Box, VStack, Button, Text } from "@chakra-ui/react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { EnumConstRouter } from "constants/enumConstRouter";
import { firebaseAuth } from "services/firebase";

import { InputDefault } from "components/Input";

import { NextPageLayout } from "./_app";

type FormData = {
  email: string;
  password: string;
};

const RegisterUser: NextPageLayout = () => {
  const formMethods = useForm<FormData>();
  const { handleSubmit } = formMethods;

  const router = useRouter();

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(firebaseAuth);

  const handleSignOut = handleSubmit((data) => {
    const { email, password } = data;

    createUserWithEmailAndPassword(email, password);
    router.push(EnumConstRouter.LOGIN);
    toast.success("Your records have been saved successfully");
  });

  return (
    <Box w="full">
      <FormProvider {...formMethods}>
        <Text mb="10px" color="white" fontSize="12px">
          Inform your records and register!
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
          bgGradient="linear(to-r, secondary.500, primary.900)"
          _hover={{
            opacity: "0.8",
          }}
          mt="20px"
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
