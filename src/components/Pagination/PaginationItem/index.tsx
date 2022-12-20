import { Button, ButtonProps } from "@chakra-ui/react";

interface PaginationItemProps extends Omit<ButtonProps, "isActive"> {
  isCurrent?: boolean;
}

export function PaginationItem({
  isCurrent = false,
  onClick,
  children,
  isDisabled,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        borderRadius="0"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      width="4"
      bg="white"
      borderRadius="0"
      _hover={{
        bgColor: "gray.50",
        borderWidth: "2px",
        borderColor: "pink.600",
      }}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
