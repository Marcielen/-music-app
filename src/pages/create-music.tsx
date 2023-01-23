import {
  Box,
  Button,
  Divider,
  Flex,
  GridItem,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
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
import { Steps } from "components/Steps";
import CreateMusicProvider from "store/contextCreateMusic";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { EnumConstRouter } from "constants/enumConstRouter";
import { useSteps } from "chakra-ui-steps";
import { toast } from "react-toastify";

export default function CreateMusic() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);
  const [valueUrlMusic, setValueUrlMusic] = useState<File>({} as File);
  const [valueUrlImageAlbum, setValueUrlImageAlbum] = useState<File>(
    {} as File
  );
  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<FormData>({
    defaultValues: formDefaultValues,
    resolver: yupResolver,
  });

  const { handleSubmit } = formMethods;

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
  const router = useRouter();
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
              musicDefault: false,
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

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const nextStep = handleSubmit(() => {
    if (activeStep === 1) {
      if (valueUrlMusic.name) {
        setActiveStep((prev) => prev + 1);
      } else {
        toast.warning("Add music file!");
      }
    } else if (activeStep === 2) {
      if (valueUrlImageAlbum.name) {
        setActiveStep((prev) => prev + 1);
      } else {
        toast.warning("Add photo from album");
      }
    } else {
      setActiveStep((prev) => prev + 1);
    }
  });

  return (
    <CreateMusicProvider>
      <Flex
        justifyContent="space-between"
        bg="primary.700"
        h="calc(100vh - 80px)"
      >
        <Menu setMenuIsOpen={setMenuIsOpen} />
        <Box
          pt="35px"
          pl={menuIsOpen ? "40px" : "20px"}
          pr="40px"
          transition="all ease 1.5s"
          w={`calc(100vw - ${menuIsOpen ? "200px" : "80px"})`}
        >
          <FormProvider {...formMethods}>
            <Box bg="primary.600" pb="30px" borderRadius="10px">
              <Flex
                mb="10px"
                borderTopRightRadius="10px"
                borderTopLeftRadius="10px"
                pt="12px"
                alignItems="center"
                pl="25px"
                pb="12px"
                bg="secondary.600"
                color="white"
              >
                <Icon
                  color="primary.100"
                  cursor="pointer"
                  onClick={() => router.push(EnumConstRouter.COLLECTIONS)}
                  mr="15px"
                  boxSize="22px"
                  as={BsFillArrowLeftCircleFill}
                />
                <Text>Music info</Text>
              </Flex>
              <Box pt="25px" pr="25px" pl="25px">
                <Steps
                  activeStep={activeStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                  key="step"
                  steps={[
                    {
                      keyStep: "1",
                      label: "About your music",
                      content: (
                        <SimpleGridForm>
                          <GridItem colSpan={6}>
                            <InputDefault
                              name="author"
                              textFillColor="secondary.400"
                              colorLabel="white"
                              label="Author"
                            />
                          </GridItem>
                          <GridItem colSpan={6}>
                            <InputDefault
                              name="nameMusic"
                              textFillColor="secondary.400"
                              colorLabel="white"
                              label="Name music"
                            />
                          </GridItem>
                          <GridItem colSpan={6}>
                            <InputDefault
                              name="album"
                              textFillColor="secondary.400"
                              colorLabel="white"
                              label="Album"
                            />
                          </GridItem>
                          <GridItem colSpan={6}>
                            <SelectDefault
                              name="genere"
                              colorLabel="white"
                              label="Genere"
                              options={EnumGenere.properties}
                            />
                          </GridItem>
                        </SimpleGridForm>
                      ),
                    },
                    {
                      keyStep: "2",
                      label: "Nice job! Now, we need your music file",
                      content: (
                        <Box>
                          <Button
                            onClick={() => handleOpenInput()}
                            color="secondary.600"
                            w="240px"
                            mb="10px"
                          >
                            Upload
                          </Button>
                          <Text fontSize="xs" color="white">
                            {valueUrlMusic.name || ""}
                          </Text>
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
                        </Box>
                      ),
                    },
                    {
                      keyStep: "3",
                      label: "To finish, do upload of your album's picture",
                      content: (
                        <Box>
                          <Flex w="100%" justifyContent="space-between">
                            <Box>
                              <Button
                                onClick={() => handleOpenInputImage()}
                                color="secondary.600"
                                w="240px"
                                mb="10px"
                              >
                                Upload
                              </Button>
                              <Text fontSize="xs" color="white">
                                {valueUrlImageAlbum.name || ""}
                              </Text>
                            </Box>
                            {valueUrlImageAlbum.name && (
                              <Box
                                w="70px"
                                border="1px"
                                borderStyle="dashed"
                                borderColor="primary.300"
                                h="70px"
                                p="5px"
                              >
                                <Image
                                  objectFit="cover"
                                  alt={valueUrlImageAlbum.name}
                                  src={URL.createObjectURL(valueUrlImageAlbum)}
                                />
                              </Box>
                            )}
                          </Flex>

                          <Input
                            display="none"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
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
                        </Box>
                      ),
                    },
                  ]}
                />
              </Box>
            </Box>
          </FormProvider>
        </Box>
      </Flex>
    </CreateMusicProvider>
  );
}
