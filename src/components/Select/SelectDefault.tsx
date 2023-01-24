import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  SelectProps,
  useToken,
  Text,
  Box,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import {
  components,
  ControlProps,
  GroupBase,
  Select,
  StylesConfig,
} from "chakra-react-select";
import { SelectComponents } from "react-select/dist/declarations/src/components";

export type SelectOptions = {
  label: string;
  value: string | number | null;
  colorScheme?: string;
};

type StyleProps = {
  isFocused: boolean;
  menuIsOpen: boolean;
};

interface SelectDefaultProps extends SelectProps {
  name: string;
  id?: string;
  label?: string;
  colorLabel?: string;
  options: SelectOptions[];
  filtrosAtivos?: boolean;
  component?: Partial<SelectComponents<any, boolean, GroupBase<unknown>>>;
  isMulti?: boolean;
  onSelect?: (newValue: any) => void;
}

export const SelectDefault = ({
  name,
  label,
  isDisabled,
  colorLabel = "black",
  isRequired,
  onSelect,
  options,
  id,
  isMulti = false,
}: SelectDefaultProps) => {
  const [gray200, secondary600, primary100] = useToken("colors", [
    "primary.200",
    "secondary.400",
    "primary.50",
  ]);

  const Control = ({ children, ...props }: ControlProps) => {
    return <components.Control {...props}>{children}</components.Control>;
  };

  const styles: StylesConfig = {
    control: (css, state: StyleProps) => {
      return {
        ...css,
        borderRadius: "10px",
        background: primary100,
        height: "34px !important",
        border: state?.isFocused
          ? state?.menuIsOpen
            ? `2px solid ${secondary600}`
            : `1px solid ${gray200}`
          : `1px solid ${gray200}`,
        boxShadow: "none",
        "&:hover": {
          border: `2px solid ${secondary600}`,
          boxShadow: "none",
        },
      };
    },
    menuPortal: (base: any) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <Controller
      name={name}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => {
        return (
          <FormControl isInvalid={!!error} isRequired={isRequired}>
            {label && (
              <FormLabel mb="8px" fontSize="xs" color={colorLabel}>
                {label}
              </FormLabel>
            )}

            <Select
              isDisabled={isDisabled}
              useBasicStyles
              value={value}
              id={id}
              styles={styles}
              selectedOptionStyle="check"
              onChange={(valueOption) => {
                if (valueOption) {
                  onChange(valueOption);

                  if (onSelect) {
                    onSelect(valueOption);
                  }
                }
              }}
              components={{ Control }}
              isMulti={isMulti}
              selectedOptionColor="gray"
              isRequired={isRequired}
              placeholder="Select"
              options={options}
              name={name}
            />

            {!!error && (
              <FormErrorMessage fontWeight="bold" color="white">
                {error.message}
              </FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};
