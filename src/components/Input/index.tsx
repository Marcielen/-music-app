import {
  FormLabel,
  Input,
  FormControl,
  InputProps,
  InputGroup,
  Icon,
  FormErrorMessage,
  InputLeftElement,
  Box,
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
  borderRadius = "50px",
  bg = "white",
  color = "black",
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
            <Box w="full">
              {label && (
                <FormLabel fontSize="12px" color={colorLabel}>
                  {label}
                </FormLabel>
              )}
              <Input
                isDisabled={isDisabled}
                onBlur={onBlur}
                borderRadius={borderRadius}
                bg={bg}
                _placeholder={{
                  color: "gray.300",
                }}
                _autofill={{
                  border: "1px solid secondary.500",
                  textFillColor: "secondary.500",
                  boxShadow: "0 0 0px 1000px transparent inset",
                  transition: "background-color 5000s ease-in-out 0s",
                }}
                placeholder={placeholder}
                _focusVisible={{
                  borderColor: "secondary.500",
                  borderWidth: "2px",
                }}
                borderColor="primary.100"
                borderWidth="2px"
                color={color}
                h="40px"
                fontSize="md"
                onChange={onChange}
                value={value}
                name={name}
                id={name}
              />
            </Box>
          </InputGroup>
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
};
