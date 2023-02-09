import {
  Box,
  Button,
  Flex,
  GridItem,
  Image,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { auth } from "modules/auth";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "services/firebase";
import { EnumGenere } from "constants/enumGenere";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {
  formDefaultValues,
  FormData,
  yupResolver,
} from "validation/validationCreateMusic";
import { EnumConstRouter } from "constants/enumConstRouter";

import { InputDefault } from "components/Input";
import { SimpleGridForm } from "components/SimpleGridForm";
import { SelectDefault } from "components/Select/SelectDefault";
import { Steps } from "components/Steps";
import { Loading } from "components/Loading";
import { Header } from "components/Header";

const imageAlbum =
  "https://firebasestorage.googleapis.com/v0/b/music-player-1d182.appspot.com/o/N2GI8Pzid4cbAviWoIqtkFDTsxx2photo-1586114237262-7bf106986e8a.jpg?alt=media&token=bedf1163-30e3-42e6-a62f-4f58bdebac2e";

export default function CreateMusic() {
  const [isLoading, setIsLoading] = useState(false);
  const [fileMusic, setFileMusic] = useState<File>({} as File);
  const [fileAlbumMusic, setFileAlbumMusic] = useState<File>({} as File);
  const [activeStep, setActiveStep] = useState(0);

  const [mobile] = useMediaQuery("(max-width: 900px)");

  const formMethods = useForm<FormData>({
    defaultValues: formDefaultValues,
    resolver: yupResolver,
  });

  const { handleSubmit } = formMethods;

  const userId = auth.getToken();

  const inputFileMusicRef = useRef<HTMLInputElement>(null);
  const inputFileImageAlbumRef = useRef<HTMLInputElement>(null);

  function handleChooseMusic() {
    if (inputFileMusicRef.current) {
      inputFileMusicRef.current.click();
    }
  }

  function handleChooseImageAlbum() {
    if (inputFileImageAlbumRef.current) {
      inputFileImageAlbumRef.current.click();
    }
  }

  const storageFileMusicRef = ref(storage, `${userId}${fileMusic.name}`);
  const storageFileImageAlbumRef = ref(
    storage,
    `${userId}${fileAlbumMusic.name}`
  );

  const router = useRouter();

  const handleCreateMusic = formMethods.handleSubmit(async (data) => {
    setIsLoading(true);
    const uploadTask = uploadBytesResumable(storageFileMusicRef, fileMusic);

    const docRef = collection(db, "music");
    let fileImageAlbum = "";

    if (fileAlbumMusic.name) {
      const uploadTaskImage = uploadBytesResumable(
        storageFileImageAlbumRef,
        fileAlbumMusic
      );
      uploadTaskImage.on(
        "state_changed",
        () => {},
        (error) => {
          toast.warning(error.message);
        },
        () => {
          getDownloadURL(uploadTaskImage.snapshot.ref).then(
            async (downloadURLImage) => {
              fileImageAlbum = downloadURLImage;
            }
          );
        }
      );
    }

    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        setIsLoading(false);
        toast.warning(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(
          async (downloadURLMusic) => {
            const dados = {
              ...data,
              album: data.album ? data.album : "---",
              musicUrl: downloadURLMusic,
              imageAlbum: fileImageAlbum === "" ? imageAlbum : fileImageAlbum,
              genere: data.genere?.label,
              musicDefault: false,
              id: userId || "",
            };
            await addDoc(docRef, dados)
              .then(() => {
                toast.success("Music successfully added");
                router.push(EnumConstRouter.COLLECTIONS);
                setIsLoading(false);
              })
              .catch((error) => {
                setIsLoading(false);
                toast.warning(error.message);
              });
          }
        );
      }
    );
  });

  const prevStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const updateValueStep = () => {
    setActiveStep((prev) => prev + 1);
  };

  const nextStep = handleSubmit(() => {
    if (activeStep === 1) {
      if (fileMusic.name) {
        updateValueStep();
      } else {
        toast.warning("Add music file!");
      }
    } else if (activeStep === 2) {
      handleCreateMusic();
    } else {
      updateValueStep();
    }
  });

  return (
    <Box w="full" position="relative" justifyContent="space-between" bg="black">
      <Box w="full" mt="20px" pr="2%">
        <Header isCollection={false} />
      </Box>
      <Box w="full" pt="20px" pr="3%">
        {isLoading && <Loading />}
        <FormProvider {...formMethods}>
          <Box bg="primary.800" pb="30px" borderRadius="10px">
            <Flex
              mb="10px"
              borderTopRightRadius="10px"
              borderTopLeftRadius="10px"
              pt="12px"
              alignItems="center"
              pl="25px"
              pb="12px"
              bg="secondary.800"
              color="white"
            >
              <Text fontSize="18px">Music info</Text>
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
                          onClick={() => handleChooseMusic()}
                          color="secondary.600"
                          w={mobile ? "full" : "240px"}
                          mb="10px"
                        >
                          Upload
                        </Button>
                        <Text fontSize="xs" color="white">
                          {fileMusic.name || ""}
                        </Text>
                        <Input
                          type="file"
                          accept=".mp3,audio/*"
                          display="none"
                          ref={inputFileMusicRef}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const { files } = e.target;
                            if (!files || files.length === 0) {
                              return;
                            }

                            const newFile = files[0];
                            if (newFile) {
                              setFileMusic(newFile);
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
                        <Flex
                          w="100%"
                          direction={mobile ? "column" : "row"}
                          justifyContent="space-between"
                        >
                          <Box>
                            <Button
                              onClick={() => handleChooseImageAlbum()}
                              color="secondary.600"
                              w={mobile ? "full" : "240px"}
                              mb="10px"
                            >
                              Upload
                            </Button>
                            <Text fontSize="xs" color="white">
                              {fileAlbumMusic.name || ""}
                            </Text>
                          </Box>
                          {fileAlbumMusic.name && (
                            <Flex
                              mt={mobile ? "10px" : undefined}
                              justifyContent="center"
                              w="full"
                            >
                              <Flex
                                w="70px"
                                border="1px"
                                borderStyle="dashed"
                                borderColor="primary.300"
                                h="70px"
                                p="5px"
                              >
                                <Image
                                  objectFit="cover"
                                  alt={fileAlbumMusic.name}
                                  src={URL.createObjectURL(fileAlbumMusic)}
                                />
                              </Flex>
                            </Flex>
                          )}
                        </Flex>

                        <Input
                          display="none"
                          type="file"
                          accept="image/png, image/gif, image/jpeg"
                          ref={inputFileImageAlbumRef}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const { files } = e.target;
                            if (!files || files.length === 0) {
                              return;
                            }

                            const newFile = files[0];

                            if (newFile) {
                              setFileAlbumMusic(newFile);
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
    </Box>
  );
}
