import { Box, VStack, Button, Text } from "@chakra-ui/react";

import { NextPageLayout } from "./_app";
import { FormProvider, useForm } from "react-hook-form";
import { InputDefault } from "components/Input";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";

const RegisterUser: NextPageLayout = () => {
  const formMethods = useForm();

  const router = useRouter();

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
            name="senha"
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
        >
          Register
        </Button>
      </FormProvider>
    </Box>
  );
};

RegisterUser.layout = "auth";
export default RegisterUser;
