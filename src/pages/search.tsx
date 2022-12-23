import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { InputDefault } from "components/Input";
import { PlayerMusic } from "components/PlayerMusic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Menu } from "../components/Menu";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "components/Pagination";
import { MdQueryBuilder } from "react-icons/md";

import firebase, {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "services/firebase";

type ListMusicProps = {
  album: string;
  author: string;
  genere: string;
  imageAlbum: string;
  musicUrl: string;
  nameMusic: string;
};

export default function Search() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [page, setPage] = useState(1);

  const formMethods = useForm();

  const [listMusic, setListMusic] = useState<ListMusicProps[]>([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, "music"));
    onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        // @ts-ignore
        const data: ListMusicProps = doc.data();
        setListMusic((valueListMusic) => {
          const musicIsAlreadyAdded = valueListMusic.some(
            (validateValue) => validateValue.musicUrl === data.musicUrl
          );

          if (musicIsAlreadyAdded) {
            return valueListMusic;
          }
          return [...valueListMusic, data];
        });
      });
    });
  }, []);

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
            tableHeaders={[
              {
                key: "title",
                content: "Title",
                width: "40%",
                justifyContent: "left",
              },
              {
                key: "album",
                content: "Album",
                width: "40%",
                justifyContent: "right",
              },
              {
                key: "timer",
                content: "Genere",
                justifyContent: "right",
                pr: "20px",
              },
            ]}
            renderTableRows={listMusic.map((music, index) => {
              return (
                <>
                  <Tr key={music.nameMusic}>
                    <Td fontSize="12px" pt="7px" pb="7px" pl="70px">
                      <Flex>
                        <Image
                          alt="image album music"
                          objectFit="cover"
                          h="40px"
                          w="40px"
                          src={music.imageAlbum}
                        />
                        <Box ml="10px">
                          <Text mt="5px" color="gray.300">
                            {music.nameMusic}
                          </Text>
                          <Text fontSize="10px" mt="-3px" color="gray.300">
                            {music.author}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td
                      w="40%"
                      color="gray.300"
                      fontSize="12px"
                      pt="0"
                      pb="7px"
                    >
                      <Flex justifyContent="right">{music.album}</Flex>
                    </Td>
                    <Td
                      pr="40px"
                      color="gray.300"
                      fontSize="12px"
                      pt="0"
                      pb="7px"
                    >
                      <Flex justifyContent="right">{music.genere}</Flex>
                    </Td>
                  </Tr>

                  {index + 1 !== listMusic.length && (
                    <Tr>
                      <Td pt="0" pb="0" colSpan={4}>
                        <Flex w="full">
                          <Divider w="full" />
                        </Flex>
                      </Td>
                    </Tr>
                  )}
                </>
              );
            })}
          />
        </Box>
      </Flex>

      <PlayerMusic />
    </FormProvider>
  );
}
