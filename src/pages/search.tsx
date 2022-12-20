import { Box, Button, Flex, Icon, Td, Tr } from "@chakra-ui/react";
import { InputDefault } from "components/Input";
import { PlayerMusic } from "components/PlayerMusic";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Menu } from "../components/Menu";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "components/Pagination";

export default function Search() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const formMethods = useForm();

  return (
    <FormProvider {...formMethods}>
      <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
        <Box bg="red" h="full" maxWidth="200px">
          <Menu setMenuIsOpen={setMenuIsOpen} />
        </Box>
        <Box
          pt="35px"
          pl={menuIsOpen ? "40px" : "20px"}
          pr="40px"
          transition="all ease 1.5s"
          w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
        >
          <Box w="350px">
            <InputDefault iconLeftElement={FiSearch} name="searchMusic" />
          </Box>
          <Pagination
            nPages={20}
            currentPage={page}
            setCurrentPage={setPage}
            tableHeaders={[{ key: "nome", content: "Nome" }]}
            renderTableRows={
              <>
                <Tr>
                  <Td>oi</Td>
                </Tr>
                <Tr>
                  <Td>oi</Td>
                </Tr>
              </>
            }
          />
        </Box>
      </Flex>

      <PlayerMusic />
    </FormProvider>
  );
}
