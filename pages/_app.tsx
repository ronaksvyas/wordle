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
    fetch('https://thatwordleapi.azurewebsites.net/get/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        state.winnerWord = res.Response;
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let wordIndexToCheck;
    for (let i = 0; i < 5; i++) {
      if (
        state.words[i].word.length === 5 &&
        !state.words[i].wordCheckedInDictionary
      ) {
        wordIndexToCheck = i;
        break;
      }
    }
    if (wordIndexToCheck > -1) {
      fetch(
        `https://thatwordleapi.azurewebsites.net/ask/?word=${state.words[wordIndexToCheck].word}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          state.words[wordIndexToCheck].isAValidEnglishWord = res.Response;
          state.words[wordIndexToCheck].wordCheckedInDictionary = true;
        });
    }
  }, [state.words]);

  return (
    <ChakraProvider theme={theme}>
      <WordleContext.Provider value={{ state: state, dispatch: dispatch }}>
        <Component {...pageProps} />
      </WordleContext.Provider>
    </ChakraProvider>
  );
}

export default WordleApp;
