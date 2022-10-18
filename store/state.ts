export enum cellStatus {
  CORRECT,
  INCORRECT,
  INCORRECT_POSITION,
  UNKNOWN,
  LOCKED,
}

export enum wordStatus {
  UNTOUCHED,
  CORRECT,
  INCORRECT,
}

interface CellContext {
  isReadOnly: true;
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
  isAValidEnglishWord: boolean;
  wordCheckedInDictionary: boolean;
  alertShown: boolean;
}

export enum GameStatus {
  NOT_STARTED,
  IN_PROGRESS,
  FINISHED_SUCCESS,
  FINISHED_FAIL,
}

interface WordleContext {
  words: WordContext[] | [];
  currentCell: currentCellRef | {};
  gameStatus: GameStatus;
  winnerWord: string;
}

function getInitialWordsState<Type extends { length: number }>() {
  const words = [];
  for (let k = 0; k < 5; k++) {
    const cells = [];
    for (let i = 0; i < 5; i++) {
      cells.push({
        cellStatus: cellStatus.UNKNOWN,
        value: '',
        row: k,
        column: i,
      });
    }
    words[k] = {
      word: ' ',
      cells: cells,
      status: wordStatus.UNTOUCHED,
      wordCheckedInDictionary: false,
      isAValidEnglishWord: false,
      alertShown: false,
    };
  }
  return words;
}

const defaultWords = getInitialWordsState();

export const initialState: WordleContext = {
  words: defaultWords,
  currentCell: { row: 0, column: 0 },
  gameStatus: GameStatus.NOT_STARTED,
  winnerWord: 'futon',
};
