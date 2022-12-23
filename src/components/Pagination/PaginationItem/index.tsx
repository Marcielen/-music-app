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
        color="white"
        width="4"
        borderRadius="0"
        bg="gray.900"
        disabled
        _disabled={{
          bgColor: "gray.600",
          cursor: "default",
        }}
        _hover={{
          bgColor: "none",
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
      color="white"
      bg="gray.900"
      borderRadius="0"
      _hover={{
        background: "gray.800",
      }}
      transition="all ease 1s"
      onClick={onClick}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
