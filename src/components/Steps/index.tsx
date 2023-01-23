import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import { Step, Steps as ChakraSteps, useSteps } from "chakra-ui-steps";

type StepsContent = {
  keyStep: string;
  content: React.ReactNode;
  label: string;
};

type StepsProps = {
  steps: StepsContent[];
};

export const Steps = ({ steps }: StepsProps) => {
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

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

      {activeStep === steps.length ? (
        <Flex p={4}>
          <Button mx="auto" size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex
          mt="35px"
          width="100%"
          justify={activeStep === 0 ? "flex-end" : "space-between"}
        >
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
      )}
    </Flex>
  );
};
