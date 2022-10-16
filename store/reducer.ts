import { getUnicodeDelete, getUnicodeEnter } from '../components/Keyboard';
import {
  ACTION_DELETE,
  ACTION_GAME_STATUS_CHANGE,
  ACTION_KEYPRESS,
} from './actions';
import { cellStatus, GameStatus, wordStatus } from './state';

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_DELETE:
      return deleteAction(state);
    case ACTION_KEYPRESS:
      return keypress(state, action.data);
    case ACTION_GAME_STATUS_CHANGE:
      return gameStatusChange(state);
    default:
      console.log('default action, no reducer here');
  }
}

function deleteAction(state) {
  return state;
}

function keypress(oldState, data) {
  data.char = data.char.toLowerCase();
  const state = structuredClone(oldState);
  const cRow = state?.currentCell?.row;
  const cCol = state?.currentCell?.column;
  console.log(`${cRow}, ${cCol}`, state);
  const [nextRow, nextColumn] = getNextRowColCell(cRow, cCol);

  //check if word is over and user trying to enter next letter
  if (
    state.words[cRow - 1]?.word.length === 5 &&
    ![getUnicodeEnter(), getUnicodeDelete()].includes(data.char) &&
    [wordStatus.UNTOUCHED].includes(state.words[cRow - 1].status)
  ) {
    alert('Press enter before proceeding');
    return state;
  }
  //if current is the last cell handle it separately

  //if current cell is the last cell of the word then

  //check word
  //lock all cells in that row if the word is valid

  //do focusNext action

  //check for word status change when the word is over
  if (
    cCol === 0 &&
    state.words[cRow - 1]?.word.length === 5 &&
    data.char === getUnicodeEnter()
  ) {
    const wordStatus = updateWordAndGameStatus(state, cRow - 1);
    if (wordStatus === true || wordStatus === false) {
      return state;
    }
  }
  if ([getUnicodeEnter(), getUnicodeDelete()].includes(data.char)) return state;

  //update current cell with input char and update current word too
  setCurrentCellAndUpdateWord(state, data.char);

  //set next row and column as current
  setNextCellAsCurrent(state);

  //change current cell status

  //
  return state;
}

function setCurrentCellAndUpdateWord(state, char) {
  if ([getUnicodeEnter(), getUnicodeDelete()].includes(char)) return;
  const cRow = state?.currentCell?.row;
  const cCol = state?.currentCell?.column;

  state.words[cRow].cells[cCol].cellStatus = cellStatus.UNKNOWN;
  state.words[cRow].cells[cCol].value = char.toLowerCase();
  state.words[cRow].word = state.words[cRow].cells
    .map((cell) => cell.value)
    .join('');
}

function updateWordAndGameStatus(state, wordIndex) {
  for (let i = 0; i < 5; i++) {
      state.words[wordIndex].cells[i].cellStatus =
        cellStatus.INCORRECT;
      if(state.words[wordIndex].word[i].toLowerCase() === state.winnerWord[i]){
        state.words[wordIndex].cells[i].cellStatus = cellStatus.CORRECT;
        continue;
      }
      if(state.winnerWord.split('').includes(state.words[wordIndex].cells[i].value)){
        state.words[wordIndex].cells[i].cellStatus = cellStatus.INCORRECT_POSITION;
        continue;
      }
  }

  state.words[wordIndex].status = wordStatus.INCORRECT;
  //successful return
  if (state.words[wordIndex].word === state.winnerWord) {
    state.words[wordIndex].status = wordStatus.CORRECT;
    state.gameStatus = GameStatus.FINISHED_SUCCESS;
    return true;
  }

  //check if last word but unsuccessfull
  if (
    wordIndex === 4 &&
    state.words[wordIndex][4].length === 5 &&
    state.words[wordIndex][4] !== state.winnerWord
  ) {
    state.gameStatus = GameStatus.FINISHED_FAIL;
    return false;
  }

  return undefined;
}

function setNextCellAsCurrent(state) {
  const cRow = state?.currentCell?.row;
  const cCol = state?.currentCell?.column;
  const [nextRow, nextColumn] = getNextRowColCell(cRow, cCol);
  state.currentCell = { row: nextRow, column: nextColumn };
}

function getNextRowColCell(cRow, cCol) {
  let nextCol = (cCol + 1) % 5;
  if (cRow === 4 && cCol === 4) {
    return [0, 0];
  }

  if (nextCol === 0) {
    return [cRow + 1, nextCol];
  }

  return [cRow, nextCol];
}

function gameStatusChange(state) {
  return state;
}
async function getNewWord(oldState: any, action: any) {
  const state = structuredClone(oldState);
  const response = await fetch('https://thatwordleapi.azurewebsites.net/get/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res);
  console.log("got response from api, ", response)
  state.winnerWord = response?.Response || "futon";
  return state;
}