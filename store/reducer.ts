import { ACTION_CHECK_WORD, ACTION_DELETE, ACTION_FOCUS_NEXT, ACTION_GAME_STATUS_CHANGE, ACTION_KEYPRESS } from "./actions";
import { cellStatus } from "./cells-context";

export default function reducer(state, action) {
  switch (action.type) {
    case ACTION_CHECK_WORD:
      return checkWord(state);
    case ACTION_DELETE:
      return deleteAction(state);
    case ACTION_KEYPRESS:
      return keypress(state, action.data);
    case ACTION_GAME_STATUS_CHANGE:
      return gameStatusChange(state);
    default:
      throw new Error();
  }
}

function checkWord(state){
  return state;
}

function deleteAction(state) {
  return state;
}

function keypress(state, data) {
  const cRow = state?.currentCell?.row;
  const cCol = state?.currentCell?.column;
  console.log(`${cRow}, ${cCol}`, state);
  const [nextRow, nextColumn] = getNextRowColCell(cRow, cCol);
  
  //if current is the last cell handle it separately

  //if current cell is the last cell of the word then

  //check word
  //lock all cells in that row if the word is valid

  //set next row and column as current
  state.currentCell = {row: nextRow, column: nextColumn};
  //do focusNext action

  state.words[cRow].cells[cCol].cellStatus = cellStatus.TOUCHED;
  state.words[cRow].cells[cCol].value = data.char;
  state.words[cRow].word = state.words[cRow].cells.map(cell => cell.value).join('');
  
  

  //change current cell status

  //
  return state;
}

function getNextRowColCell(cRow, cCol){
  let nextCol = (cCol + 1)%5;
  if(cRow === 4 && cCol === 4){
    return [0,0];
  }

  if(nextCol === 0){
    return [cRow+1, nextCol];
  }

  return [cRow, nextCol];

}
function gameStatusChange(state) {
  return state;
}
