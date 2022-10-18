import { getUnicodeDelete, getUnicodeEnter } from '../components/Keyboard';
import { ACTION_DELETE, ACTION_KEYPRESS } from './actions';
import { cellStatus, GameStatus, initialState, wordStatus } from './state';

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_KEYPRESS:
      return keypress(state, action.data);
    default:
      console.log('default action, no reducer here');
  }
}

function keypress(oldState, data) {
  data.char = data.char.toLowerCase();
  const state = structuredClone(oldState);
  const cRow = state?.currentCell?.row;
  const cCol = state?.currentCell?.column;
  console.log(`${cRow}, ${cCol}`, state);

  // if delete button is pressed
  if (getUnicodeDelete() === data.char) {
    handleDelete(state, cRow, cCol);
    return state;
  }

  //check if word is over and user trying to enter next letter
  if (
    state.words[cRow - 1]?.word.length === 5 &&
    ![getUnicodeEnter()].includes(data.char) &&
    [wordStatus.UNTOUCHED].includes(state.words[cRow - 1].status)
  ) {
    alert('Press enter before proceeding');
    return state;
  }

  //check for word status change when the word is over
  if (
    (cCol === 0 &&
      state.words[cRow - 1]?.word.length === 5 &&
      data.char === getUnicodeEnter()) ||
    (cCol === 4 && cRow === 4 && data.char === getUnicodeEnter())
  ) {
    const rowToCheck = cRow === 4 && cCol === 4 ? 4 : cRow - 1;
    const wordStatus = updateWordAndGameStatus(state, rowToCheck);
    if (wordStatus === 'notValidWord') {
      return state;
    }
  }
  if ([getUnicodeEnter(), getUnicodeDelete()].includes(data.char)) return state;

  //update current cell with input char and update current word too
  setCurrentCellAndUpdateWord(state, data.char);

  //set next row and column as current
  setNextCellAsCurrent(state);

  return state;
}

function handleDelete(state, cRow, cCol) {
  let alreadySetColumn = false;
  //if last word is processed then dont move to last word
  if (
    cCol === 0 &&
    cRow !== 0 &&
    state.words[cRow].status === wordStatus.UNTOUCHED &&
    state.words[cRow - 1].status !== wordStatus.INCORRECT
  ) {
    cCol = 4;
    cRow = cRow - 1;
    alreadySetColumn = true;
  }
  const wordIndex = cRow;
  let currWordObj = state.words[wordIndex];
  const currCell = state.words[wordIndex].cells[cCol];
  currCell.value = '';
  currCell.cellStatus = cellStatus.UNKNOWN;
  state.currentCell = {
    row: cRow,
    column: alreadySetColumn ? cCol : Math.max(cCol - 1, 0),
  };
  currWordObj.word = currWordObj.word.substring(0, currWordObj.word.length - 1);
  currWordObj.isAValidEnglishWord = false;
  currWordObj.alertShown = false;
  currWordObj.wordCheckedInDictionary = false;
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
  const wordToCheck = state.words[wordIndex];
  if (wordToCheck.wordCheckedInDictionary && !wordToCheck.isAValidEnglishWord) {
    alert(`${wordToCheck.word} is not a valid English word`);
    wordToCheck.alertShown = true;
    return 'notValidWord';
  }
  for (let i = 0; i < 5; i++) {
    state.words[wordIndex].cells[i].cellStatus = cellStatus.INCORRECT;
    if (wordToCheck.word[i].toLowerCase() === state.winnerWord[i]) {
      state.words[wordIndex].cells[i].cellStatus = cellStatus.CORRECT;
      continue;
    }
    if (
      state.winnerWord.split('').includes(state.words[wordIndex].cells[i].value)
    ) {
      state.words[wordIndex].cells[i].cellStatus =
        cellStatus.INCORRECT_POSITION;
      continue;
    }
  }
  state.words[wordIndex].status = wordStatus.INCORRECT;
  //successful return
  if (wordToCheck.word === state.winnerWord) {
    state.words[wordIndex].status = wordStatus.CORRECT;
    state.gameStatus = GameStatus.FINISHED_SUCCESS;
    return 'success';
  }

  //check if last word but unsuccessfull
  if (
    wordIndex === 4 &&
    state.words[4].word.length === 5 &&
    state.words[4].word !== state.winnerWord
  ) {
    state.gameStatus = GameStatus.FINISHED_FAIL;
    return 'failure';
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
    return [4, 4];
  }

  if (nextCol === 0) {
    return [cRow + 1, nextCol];
  }

  return [cRow, nextCol];
}
