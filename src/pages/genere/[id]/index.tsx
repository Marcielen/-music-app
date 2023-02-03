import { Box, Flex, Text } from "@chakra-ui/react";
import { Header } from "components/Header";
import Image from "next/image";
import { useRouter } from "next/router";
import { fileGenere } from "services/Data/filesGenere";

export default function Genere() {
  const router = useRouter();
  const idRouter = router.query.id as string;

  const genereSelected = fileGenere.find(
    (genere) => genere.id === Number(idRouter)
  );
  console.log(genereSelected);
  return (
    <Box color="white" w="full">
      <Box
        pb="25px"
        bgGradient="linear-gradient(to left, #ce79ca, #b06fba, #9464a9, #7a5996, #624e83, #57426f, #4b375b, #3f2d49, #352234, #271922, #190f14, #000000);"
      >
        <Box w="full" pt="20px" pr="2%">
          <Header isCollection={false} />
        </Box>
        <Flex>
          <Box>
            <Image
              style={{
                objectFit: "cover",
                height: "200px",
                width: "350px",
                borderRadius: "10px",
              }}
              alt={genereSelected?.alt || ""}
              src={genereSelected?.src || ""}
            />
          </Box>
          <Flex
            pt="20px"
            pb="20px"
            flexDirection="column"
            justifyContent="space-between"
            pl="30px"
          >
            <Text fontWeight="bold" fontSize="12px">
              GENERE
            </Text>
            <Text fontWeight="bold" fontSize="40px">
              {genereSelected?.typeGenere}
            </Text>
            <Text fontSize="14px">The best songs you find here!</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
