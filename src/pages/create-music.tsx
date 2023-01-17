import { Box, Button, Flex, GridItem, Input } from "@chakra-ui/react";
import { InputDefault } from "components/Input";
import { Menu } from "components/Menu";
import { SimpleGridForm } from "components/SimpleGridForm";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { auth } from "Modules/auth";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "services/firebase";
import { SelectDefault } from "components/Select/SelectDefault";
import { EnumGenere } from "constants/enumGenere";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

type FormData = {
  author: string;
  nameMusic: string;
  album: string;
  genere: string;
  musicUrl: string;
  imageUrl: string;
};

export default function CreateMusic() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [valueUrlMusic, setValueUrlMusic] = useState("");

  const formMethods = useForm<FormData>();
  const { handleSubmit } = formMethods;

  const inputRef = useRef<HTMLInputElement>(null);
  const id = auth.getToken();

  function handleOpenInput() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleCreateMusic = handleSubmit((data) => {
    const docRef = doc(db, "music", id);

    setDoc(docRef, data)
      .then(() => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const handleSubmit2 = (event: any) => {
    const storageRef = ref(storage, `${id}${event.name}`);
    const uploadTask = uploadBytesResumable(storageRef, event);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setValueUrlMusic(downloadURL);
        });
      }
    );
  };

  return (
    <Flex justifyContent="space-between" bg="#0E0E0E" h="calc(100vh - 80px)">
      <Menu setMenuIsOpen={setMenuIsOpen} />
      <Box
        pt="35px"
        pl={menuIsOpen ? "40px" : "20px"}
        pr="40px"
        transition="all ease 1.5s"
        w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
      >
        <FormProvider {...formMethods}>
          <SimpleGridForm mt="50px">
            <GridItem colSpan={4}>
              <InputDefault name="author" colorLabel="white" label="Author" />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                name="nameMusic"
                colorLabel="white"
                label="Name music"
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault name="album" colorLabel="white" label="Album" />
            </GridItem>
            <GridItem colSpan={4}>
              <SelectDefault
                name="genere"
                colorLabel="white"
                label="Genere"
                options={EnumGenere.properties}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <Button
                variant="solid"
                color="white"
                bg="primary.500"
                onClick={() => handleOpenInput()}
                _hover={{
                  background: "ed64a6",
                }}
                w="full"
              >
                Music url
              </Button>
              <Input
                display="none"
                type="file"
                accept=".mp3,audio/*"
                ref={inputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { files } = e.target;
                  if (!files || files.length === 0) {
                    return;
                  }

                  const newFile = files[0];

                  if (newFile) {
                    handleSubmit2(newFile);
                  }
                }}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <InputDefault
                name="imageUrl"
                colorLabel="white"
                label="Image url"
              />
            </GridItem>
          </SimpleGridForm>
          <Flex justifyContent="center" mt="60px">
            <Button
              variant="solid"
              color="white"
              bg="primary.500"
              onClick={() => handleCreateMusic()}
              _hover={{
                background: "ed64a6",
              }}
              w="200px"
            >
              Create music
            </Button>
          </Flex>
        </FormProvider>
      </Box>
    </Flex>
  );
}
