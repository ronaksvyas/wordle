import React, { useEffect, useReducer } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import theme from '../components/theme';
import { initialState } from '../store/state';
import reducer from '../store/reducer';

export const WordleContext = React.createContext({
  state: initialState,
  dispatch: null,
});

function WordleApp({ Component, pageProps, children }) {
  const [state, dispatch] = useReducer(reducer, initialState); 

  //send the request to fetch a new word if word doesn't exist
  useEffect(() => {
    fetch(
      'https://thatwordleapi.azurewebsites.net/get/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {state.winnerWord = res.Response});
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <WordleContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Component {...pageProps} />
      </WordleContext.Provider>
    </ChakraProvider>
  );
}

export default WordleApp;
