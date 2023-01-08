import { ChakraProvider } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import type { AppProps } from "next/app";
import { AppLayout } from "components/Layout/App/index";

import { HeadNext } from "../components/Head";
import theme from "../styles/theme";
import "styles/style.css";
import { Auth } from "components/Layout/Auth";

export type NextPageLayout = NextPage & {
  layout: "auth" | "app";
};

type AppPropsLayout = AppProps & {
  Component: NextPageLayout;
};

const AppLayouts = {
  app: AppLayout,
  auth: Auth,
};

export default function App({ Component, pageProps }: AppPropsLayout) {
  const Layout = AppLayouts[Component.layout || "app"];
  return (
    <ChakraProvider theme={theme}>
      <HeadNext />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
