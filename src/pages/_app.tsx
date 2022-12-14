import { ChakraProvider } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";

import { HeadNext } from "../components/Head";
import theme from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <HeadNext />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
