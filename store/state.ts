export enum cellStatus {
  UNTOUCHED,
  TOUCHED,
  LOCKED,
}

export enum wordStatus {
  UNTOUCHED,
  TOUCHED,
  LOCKED,
}

interface CellContext {
  isReadOnly: true,
  cellStatus: cellStatus;
  value: string;
  row: 0 | 1 | 2 | 3 | 4 | 5;
  column: 0 | 1 | 2 | 3 | 4 | 5;
}

interface currentCellRef {
  row: 0 | 1 | 2 | 3 | 4 | 5;
  column: 0 | 1 | 2 | 3 | 4 | 5;
}

interface WordContext {
  word: string;
  cells: [CellContext];
  status: wordStatus;
}

enum GameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED,
}

interface WordleContext {
  words: WordContext[]| [];
  currentCell: currentCellRef | {};
  gameStatus: GameStatus;
}

function getInitialWordsState<Type extends {length: number}>(){
  const words = [];
  for (let k = 0; k < 5; k++) {
    const cells = [];
    for (let i = 0; i < 5; i++) {
      cells.push({
        cellStatus: cellStatus,
        value: "",
        row: k,
        column: i,
      });
    }
    words[k] = { word: " ", cells: cells, status: wordStatus.UNTOUCHED };
  }
  return words;
};

const defaultWords = getInitialWordsState();

export const initialState: WordleContext = {
  words: defaultWords,
  currentCell: {row: 0, column: 0},
  gameStatus: GameStatus.NOT_STARTED,
};
