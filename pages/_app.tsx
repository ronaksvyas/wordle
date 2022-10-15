import React, { useReducer } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from './theme';
import { initialState } from '../store/state';
import reducer from '../store/reducer';

export const WordleContext = React.createContext({
  state: initialState,
  dispatch: null,
});

function WordleApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(reducer, initialState); 

  return (
    <ChakraProvider theme={theme}>
      <WordleContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Component {...pageProps} />
      </WordleContext.Provider>
    </ChakraProvider>
  );
}

export default WordleApp;
