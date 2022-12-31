import { ChakraProvider } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import type { AppProps } from "next/app";

import { HeadNext } from "../components/Head";
import theme from "../styles/theme";
import "styles/style.css";
import MusicProvider from "store/contextMusic";
import { PlayerMusic } from "components/PlayerMusic";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MusicProvider>
        <HeadNext />
        <Component {...pageProps} />
        <PlayerMusic />
      </MusicProvider>
    </ChakraProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
