import React, { useContext } from 'react';
import { Button, Grid, Stack } from '@chakra-ui/react';
import { ACTION_KEYPRESS } from '../store/actions';
import { WordleContext } from '../pages/_app';
import { cellStatus } from '../store/state';

export function getUnicodeDelete() {
  return '⌫';
}

export function getUnicodeEnter() {
  return '⏎';
}

function getButton(char, onclick, backgroundColor) {
  return (
    <Button
      borderRadius="8px"
      key={char}
      width="1vh"
      minWidth={8}
      height="4.5vh"
      onClick={onclick}
      backgroundColor={backgroundColor}
    >
      {char}
    </Button>
  );
}

const onclick = (dispatch, char) => (e) => {
  console.log('clicked ', char);
  dispatch({ type: ACTION_KEYPRESS, data: { char: char.toLowerCase() } });
};
const keyboardMap = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  [getUnicodeEnter(), 'Z', 'X', 'C', 'V', 'B', 'N', 'M', getUnicodeDelete()],
];

export default function Keyboard(props) {
  const wordleContext = useContext(WordleContext);
  const { dispatch, state } = wordleContext;
  const letters = state.letters;

  let backGroundColorMap = {
    [cellStatus.INCORRECT_POSITION]: 'yellow.500',
    [cellStatus.CORRECT]: 'green.500',
    [cellStatus.INCORRECT]: 'gray.400',
    [cellStatus.UNKNOWN]: '',
  };
 
  return (
    <Stack direction={['column']} gap={1.5}>
      {keyboardMap.map((line, index) => {
        return (
          <Grid
            key={index}
            gap={'3px'}
            templateColumns={`repeat(${line.length}, 1fr)`}
          >
            {line.map((char) => {
              const backgroundColor = backGroundColorMap[letters[char.toLowerCase()]];
              return getButton(char, onclick(dispatch, char), backgroundColor);
            })}
          </Grid>
        );
      })}
    </Stack>
  );
}
