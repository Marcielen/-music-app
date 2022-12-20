import {
  Box,
  Divider,
  Flex,
  HStack,
  Table,
  TableColumnHeaderProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  ThemingProps,
  Tr,
  useToken,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  nPages: number;
  asSiblingsCountFixed?: boolean;
  isLoading?: boolean;
  tableHeaders: TableHeader[];
  renderTableRows?: ReactNode;
  size?: ThemingProps["size"];
}

interface TableHeader extends Omit<TableColumnHeaderProps, "children"> {
  key: string;
  content: ReactNode;
  isOrderable?: boolean;
}

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

const siblingsCount = 1;

export const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
  isLoading,
  asSiblingsCountFixed,
  renderTableRows,
  tableHeaders,
  size,
}: PaginationProps) => {
  const formMethods = useForm();

  const hasRows = nPages > 0;
  const lastPage = Math.floor(nPages / 10);

  let previousPagesFromSiblings = currentPage - 1 - siblingsCount;
  let nextPagesToSiblings = currentPage + siblingsCount;

  if (lastPage < currentPage + siblingsCount && asSiblingsCountFixed) {
    previousPagesFromSiblings -= currentPage + siblingsCount - lastPage;
  }

  if (currentPage <= siblingsCount && asSiblingsCountFixed) {
    nextPagesToSiblings += siblingsCount + 1 - currentPage;
  }

  const previousPages =
    currentPage > 1
      ? generatePagesArray(
          Math.max(previousPagesFromSiblings, 0),
          currentPage - 1
        )
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, Math.min(nextPagesToSiblings, lastPage))
      : [];

  return (
    <Box mt="20px" w="full" color="white">
      <FormProvider {...formMethods}>
        <Box borderTopRadius="4px" w="full" overflow="auto">
          <Table variant="filled" size={size}>
            <Thead>
              <Tr>
                {tableHeaders.map(
                  ({ content, key, isOrderable = true, ...restOfHeader }) => {
                    return (
                      <Th
                        key={key}
                        whiteSpace="nowrap"
                        userSelect="none"
                        {...restOfHeader}
                        fontWeight="bold"
                      >
                        {content}
                      </Th>
                    );
                  }
                )}
              </Tr>
            </Thead>
            <Flex justifyContent="center" alignItems="center">
              <Divider w="97.5%" />
            </Flex>
            <Tbody>
              {hasRows ? (
                renderTableRows
              ) : (
                <Tr>
                  <Td whiteSpace="nowrap" colSpan={9999}>
                    Nenhum resultado foi encontrado
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Divider w="97.5%" />
        </Flex>
        <Flex pt="20px" pb="15px" justifyContent="center" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Text
              fontSize="11px"
              color="pink.600"
              onClick={() => setCurrentPage(1)}
              cursor="pointer"
              borderWidth="2px"
              borderTopLeftRadius="8px"
              borderBottomStartRadius="8px"
              borderColor="white"
              p="5px"
              h="32px"
              _hover={{
                borderColor: "gray.600",
                background: "gray.50",
              }}
              transition="all ease 1s"
            >
              Início
            </Text>
            <HStack spacing="0px" alignItems="center" justifyContent="center">
              <PaginationItem
                isDisabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &laquo;
              </PaginationItem>

              {previousPages.length > 0 &&
                previousPages.map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationItem>
                ))}

              <PaginationItem isCurrent>{currentPage}</PaginationItem>

              {nextPages.length > 0 &&
                nextPages.map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationItem>
                ))}

              <PaginationItem
                isDisabled={currentPage === nPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &raquo;
              </PaginationItem>
            </HStack>

            <Text
              cursor="pointer"
              h="32px"
              color="white"
              fontSize="11px"
              onClick={() => setCurrentPage(nPages)}
              borderWidth="2px"
              borderTopRightRadius="8px"
              borderBottomEndRadius="8px"
              borderColor="white"
              p="5px"
              background="gray.900"
              _hover={{
                background: "gray.600",
              }}
              transition="all ease 1s"
            >
              Última
            </Text>
          </Flex>
        </Flex>
      </FormProvider>
    </Box>
  );
};
