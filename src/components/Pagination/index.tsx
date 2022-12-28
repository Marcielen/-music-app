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
          <Table variant="" size={size}>
            <Thead>
              <>
                <Tr>
                  {tableHeaders.map(
                    ({ content, key, width, ...restOfHeader }) => {
                      return (
                        <Th
                          pl="70px"
                          width={width}
                          key={key}
                          userSelect="none"
                          fontWeight="bold"
                        >
                          <Flex {...restOfHeader}>{content}</Flex>
                        </Th>
                      );
                    }
                  )}
                </Tr>
                <Tr>
                  <Th pb="10px" pt="0px" colSpan={4}>
                    <Flex
                      w="full"
                      bg="white"
                      h="1px"
                      justifyContent="center"
                      alignItems="center"
                    />
                  </Th>
                </Tr>
              </>
            </Thead>

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
          <Divider color="white" w="96.3%" />
        </Flex>
        <Flex pt="20px" pb="15px" justifyContent="center" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Text
              fontSize="11px"
              onClick={() => setCurrentPage(1)}
              cursor="pointer"
              borderWidth="2px"
              borderTopLeftRadius="8px"
              borderBottomStartRadius="8px"
              borderColor="gray.600"
              p="5px"
              h="32px"
              background="gray.900"
              _hover={{
                background: "gray.800",
              }}
              transition="all ease 1s"
            >
              Start
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
              borderColor="gray.600"
              p="5px"
              background="gray.900"
              _hover={{
                background: "gray.800",
              }}
              transition="all ease 1s"
            >
              Last
            </Text>
          </Flex>
        </Flex>
      </FormProvider>
    </Box>
  );
};
