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
  textFillColor?: string;
}

export const InputDefault = ({
  name,
  isPassword,
  label,
  isDisabled,
  colorLabel = "black",
  isRequired,
  placeholder,
  borderRadius = "10px",
  bg = "primary.50",
  color = "black",
  textFillColor = "black",
  borderColor = "primary.50",
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
        <FormControl
          borderColor="none"
          boxShadow="none"
          isInvalid={!!error}
          isRequired={isRequired}
        >
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
                <Icon as={iconLeftElement} color={color} fontSize="20px" />{" "}
              </InputLeftElement>
            )}
            <Input
              isDisabled={isDisabled}
              _invalid={{ backgroundColor: "none" }}
              onBlur={onBlur}
              type={textIsShowing && isPassword ? "password" : undefined}
              borderRadius={borderRadius}
              bg={bg}
              _placeholder={{
                color: "white",
              }}
              _autofill={{
                border: "2px solid primary.50",
                textFillColor: textFillColor,
                boxShadow: "0 0 0px 1000px transparent inset",
                transition: "background-color 5000s ease-in-out 0s",
              }}
              _hover={{
                borderColor: textFillColor,
                borderWidth: "2px",
              }}
              placeholder={placeholder}
              _focusVisible={{
                borderColor: textFillColor,
                borderWidth: "2px",
              }}
              borderColor={borderColor}
              borderWidth="2px"
              color={color}
              h="37px"
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
          {!!error && (
            <FormErrorMessage fontWeight="bold" color="red.200">
              {error.message}
            </FormErrorMessage>
          )}
        </FormControl>
      )}
    />
  );
};
