import { extendTheme } from "@chakra-ui/react";

import { Steps } from "./components/steps";
import colors from "./foundations/colors";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors,

  components: {
    Steps: Steps,
  },
});

export default theme;
