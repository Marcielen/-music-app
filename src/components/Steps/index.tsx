import { Box, Button, Flex } from "@chakra-ui/react";
import { Step, Steps as ChakraSteps } from "chakra-ui-steps";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useRouter } from "next/router";

type StepsContent = {
  keyStep: string;
  content: React.ReactNode;
  label: string;
};

type StepsProps = {
  steps: StepsContent[];
  activeStep: number;
  prevStep: () => void;
  nextStep: () => void;
};

export const Steps = ({
  steps,
  activeStep,
  prevStep,
  nextStep,
}: StepsProps) => {
  const router = useRouter();
  return (
    <Flex flexDir="column" width="100%">
      <ChakraSteps
        mb="35px"
        color="white"
        colorScheme="indigo"
        activeStep={activeStep}
      >
        {steps.map(({ keyStep, content }) => (
          <Step key={keyStep}>
            <Box pt="25px">{content}</Box>
          </Step>
        ))}
      </ChakraSteps>

      <Flex mt="35px" width="100%" justify="space-between">
        <Button
          w="140px"
          mr={4}
          colorScheme="secondary"
          onClick={() => router.push(EnumConstRouter.COLLECTIONS)}
        >
          Discart
        </Button>
        <Flex>
          {activeStep !== 0 && (
            <Button
              w="140px"
              isDisabled={activeStep === 0}
              mr={4}
              colorScheme="secondary"
              onClick={prevStep}
            >
              Prev
            </Button>
          )}
          <Button colorScheme="secondary" w="140px" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
