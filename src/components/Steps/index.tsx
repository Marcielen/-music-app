import { Box, Button, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { Step, Steps as ChakraSteps } from "chakra-ui-steps";
import { useRouter } from "next/router";

import { EnumConstRouter } from "constants/enumConstRouter";

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

  const [mobile] = useMediaQuery("(max-width: 900px)");
  return (
    <Flex flexDir="column" width="100%">
      <ChakraSteps
        mb="35px"
        color="white"
        colorScheme="indigo"
        activeStep={activeStep}
      >
        {steps.map(({ keyStep, content, label }) => (
          <Step key={keyStep}>
            <Text color="white">{label}</Text>
            <Box pt="25px">{content}</Box>
          </Step>
        ))}
      </ChakraSteps>

      <Flex
        mt="35px"
        width="100%"
        direction={mobile ? "column" : "row"}
        justify="space-between"
      >
        <Button
          w={mobile ? "full" : "140px"}
          mb={mobile ? "10px" : undefined}
          mr={4}
          colorScheme="secondary"
          onClick={() => router.push(EnumConstRouter.COLLECTIONS)}
        >
          Discart
        </Button>
        <Flex direction={mobile ? "column" : "row"}>
          {activeStep !== 0 && (
            <Button
              mb={mobile ? "10px" : undefined}
              w={mobile ? "full" : "140px"}
              isDisabled={activeStep === 0}
              mr={4}
              colorScheme="secondary"
              onClick={prevStep}
            >
              Prev
            </Button>
          )}
          <Button
            colorScheme="secondary"
            w={mobile ? "full" : "140px"}
            onClick={nextStep}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
