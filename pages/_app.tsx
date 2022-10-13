import React from "react";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "./theme";

function WordleApp({Component, pageProps}) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default WordleApp;