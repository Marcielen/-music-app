import {
  FormLabel,
  Input,
  FormControl,
  InputProps,
  InputGroup,
  Icon,
  FormErrorMessage,
  InputLeftElement,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { IconType } from "react-icons";

interface InputDefaultProps extends InputProps {
  name: string;
  label?: string;
  colorLabel?: string;
  iconLeftElement?: IconType;
}

export const InputDefault = ({
  name,
  label,
  isDisabled,
  colorLabel = "black",
  isRequired,
  placeholder,
  iconLeftElement,
}: InputDefaultProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <InputGroup>
            {iconLeftElement && (
              <InputLeftElement pointerEvents="none">
                <Icon as={iconLeftElement} color="gray.700" fontSize="20px" />{" "}
              </InputLeftElement>
            )}
            <Input
              isDisabled={isDisabled}
              onBlur={onBlur}
              borderRadius="50px"
              bg="white"
              _placeholder={{
                color: "gray.300",
              }}
              _autofill={{
                border: "1px solid pink.600",
                textFillColor: "black",
                boxShadow: "0 0 0px 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s",
              }}
              placeholder={placeholder}
              _focusVisible={{
                borderColor: "black",
                borderWidth: "2px",
              }}
              color="black"
              h="40px"
              fontSize="md"
              onChange={onChange}
              value={value}
              name={name}
              id={name}
            />

            {label && (
              <FormLabel fontSize="12px" color={colorLabel}>
                {label}
              </FormLabel>
            )}
          </InputGroup>
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
};
