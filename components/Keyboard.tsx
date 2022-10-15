import React, { useContext } from 'react';
import { Button, Grid, Stack } from '@chakra-ui/react';
import { ACTION_KEYPRESS } from '../store/actions';
import { WordleContext } from '../pages/_app';

export function getUnicodeDelete() {
  return '⌫';
}

export function getUnicodeEnter() {
  return '⏎';
}

function getButton(char, onclick) {
  return (
    <Button
      borderRadius="8px"
      colorScheme="gray"
      key={char}
      width="1vh"
      height="5vh"
      onClick={onclick}
    >
      {char}
    </Button>
  );
}

const onclick = (dispatch, char) => (e) => {
  console.log('clicked ', char);
  dispatch({ type: ACTION_KEYPRESS, data: { char: char } });
};
const keyboardMap = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [getUnicodeEnter(), 'Z', 'X', 'C', 'V', 'B', 'N', 'M', getUnicodeDelete()],
];

export default function Keyboard(props) {
  const wordleContext = useContext(WordleContext);
  const { dispatch } = wordleContext;
  return (
    <Stack direction={['column']} gap={1.5}>
      {keyboardMap.map((line, index) => {
        return (
          <Grid
            key={index}
            gap={'1px'}
            templateColumns={`repeat(${line.length}, 1fr)`}
          >
            {line.map((char) => {
              return getButton(char, onclick(dispatch, char));
            })}
          </Grid>
        );
      })}
    </Stack>
  );
}
