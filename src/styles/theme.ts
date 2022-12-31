import { extendTheme } from "@chakra-ui/react";
import colors from "./foundations/colors";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors,

  components: {},
});

export default theme;
