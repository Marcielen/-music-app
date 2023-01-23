import { StepsTheme, StepProps } from "chakra-ui-steps";

export const Steps = {
  ...StepsTheme,
  baseStyle: (props: StepProps) => ({
    ...StepsTheme.baseStyle(props),
    step: {
      "& > div > div:first-child": { bg: "primary.800", color: "white" },
      "& > div > div > span": {
        bg: "primary.800",
        color: "white",
      },
    },
  }),
};
