import { Box, Button, Flex, GridItem, Input } from "@chakra-ui/react";
import { InputDefault } from "components/Input";
import { Menu } from "components/Menu";
import { SimpleGridForm } from "components/SimpleGridForm";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { auth } from "Modules/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "services/firebase";
import { SelectDefault } from "components/Select/SelectDefault";
import { EnumGenere } from "constants/enumGenere";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  formDefaultValues,
  FormData,
  yupResolver,
} from "validation/validationCreateMusic";

export default function CreateMusic() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [valueUrlMusic, setValueUrlMusic] = useState<File>({} as File);
  const [valueUrlImageAlbum, setValueUrlImageAlbum] = useState<File>(
    {} as File
  );

  const formMethods = useForm<FormData>({
    defaultValues: formDefaultValues,
    resolver: yupResolver,
  });

  const id = auth.getToken();

  const inputRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  function handleOpenInput() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleOpenInputImage() {
    if (inputImageRef.current) {
      inputImageRef.current.click();
    }
  }

  const handleCreateMusic = formMethods.handleSubmit(async (data) => {
    const storageRef = ref(storage, `${id}${valueUrlMusic.name}`);
    const storageRefImage = ref(storage, `${id}${valueUrlImageAlbum.name}`);

    const uploadTask = uploadBytesResumable(storageRef, valueUrlMusic);
    const uploadTaskImage = uploadBytesResumable(
      storageRefImage,
      valueUrlImageAlbum
    );

    const docRef = collection(db, "music");
    let image = "url";

    uploadTaskImage.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress, "image");
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTaskImage.snapshot.ref).then(
          async (downloadURLImage) => {
            console.log("entrou");
            console.log(downloadURLImage);
            image = downloadURLImage;
          }
        );
      }
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(progress, "music");
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURLMusic) => {
            const dados = {
              ...data,
              musicUrl: downloadURLMusic,
              imageAlbum: image,
              genere: "Punk",
              id: id || "teste",
            };

            await addDoc(docRef, dados)
              .then(() => {
                console.log("Document has been added successfully", dados);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        );
      }
    );
  });

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
                mt="25px"
                variant=""
                color="black"
                bg="white"
                onClick={() => handleOpenInput()}
                _hover={{
                  background: "ed64a6",
                }}
                w="full"
              >
                Upload music
              </Button>

              <Input
                type="file"
                accept=".mp3,audio/*"
                display="none"
                ref={inputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { files } = e.target;
                  if (!files || files.length === 0) {
                    return;
                  }

                  const newFile = files[0];
                  console.log(files);
                  if (newFile) {
                    setValueUrlMusic(newFile);
                  }
                }}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <Button
                mt="25px"
                variant=""
                color="black"
                bg="white"
                onClick={() => handleOpenInputImage()}
                _hover={{
                  background: "ed64a6",
                }}
                w="full"
              >
                Upload image album
              </Button>
              <Input
                display="none"
                type="file"
                ref={inputImageRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { files } = e.target;
                  if (!files || files.length === 0) {
                    return;
                  }

                  const newFile = files[0];

                  if (newFile) {
                    setValueUrlImageAlbum(newFile);
                  }
                }}
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
