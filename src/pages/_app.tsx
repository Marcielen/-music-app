import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import { GetStaticProps, NextPage } from "next";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { AppLayout } from "components/Layout/App/index";
import { HeadNext } from "components/Head";
import { Auth } from "components/Layout/Auth";

import theme from "../styles/theme";
import "styles/style.css";

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
  console.log(Layout);
  return (
    <ChakraProvider theme={theme}>
      <HeadNext />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </ChakraProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};
