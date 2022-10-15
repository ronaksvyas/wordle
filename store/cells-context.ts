export enum cellStatus {
  UNTOUCHED,
  TOUCHED,
  LOCKED
}

export enum wordStatus{
  UNTOUCHED,
  TOUCHED,
  LOCKED
}

interface CellContext{
  status: cellStatus,
  value: string,
  row: 0 | 1 | 2 | 3 | 4 | 5,
  column: 0 | 1 | 2 | 3 | 4 | 5
}

interface WordContext{
  word: string,
  cells: [CellContext],
  status: wordStatus 
}

const defaultCellContext : CellContext = {
  status: cellStatus.UNTOUCHED,
  value: ' ',
  row: 0,
  column : 0
};

