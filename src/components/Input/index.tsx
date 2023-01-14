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
  InputRightAddon,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface InputDefaultProps extends InputProps {
  name: string;
  label?: string;
  colorLabel?: string;
  iconLeftElement?: IconType;
  isPassword?: boolean;
}

export const InputDefault = ({
  name,
  isPassword,
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
  const [textIsShowing, setTextIsShowing] = useState(true);
  const handleTogglePasswordVisibility = () => {
    setTextIsShowing(!textIsShowing);
  };
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { error },
      }) => (
        <FormControl isInvalid={!!error} isRequired={isRequired}>
          <InputGroup
            borderRadius={borderRadius}
            display="column"
            position="relative"
          >
            {label && (
              <FormLabel fontSize="12px" color={colorLabel}>
                {label}
              </FormLabel>
            )}
            {iconLeftElement && (
              <InputLeftElement pointerEvents="none">
                <Icon as={iconLeftElement} color="gray.700" fontSize="20px" />{" "}
              </InputLeftElement>
            )}
            <Input
              isDisabled={isDisabled}
              onBlur={onBlur}
              type={textIsShowing && isPassword ? "password" : undefined}
              borderRadius={borderRadius}
              bg={bg}
              _placeholder={{
                color: "gray.300",
              }}
              _autofill={{
                border: "2px solid white",
                textFillColor: "white",
                boxShadow: "0 0 0px 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s",
              }}
              placeholder={placeholder}
              _focusVisible={{
                borderColor: "white",
                borderWidth: "2px",
              }}
              borderColor="white"
              borderWidth="2px"
              color={color}
              h="40px"
              fontSize="md"
              onChange={onChange}
              value={value}
              name={name}
              id={name}
            />

            {isPassword && (
              <Box
                bg="none"
                border="none"
                right="15px"
                top="28px"
                position="absolute"
                borderRight="none"
              >
                <IconButton
                  variant=""
                  zIndex="2"
                  aria-label="Alterar visibilidade da senha"
                  icon={
                    <Icon as={textIsShowing ? FiEyeOff : FiEye} fontSize="lg" />
                  }
                  size="sm"
                  bg="none"
                  color="white"
                  id="isPasswordVisibility"
                  onClick={handleTogglePasswordVisibility}
                  tabIndex={-1}
                />
              </Box>
            )}
          </InputGroup>
          {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
      )}
    />
  );
};
