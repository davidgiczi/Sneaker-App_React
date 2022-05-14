import { BOARD_COLUMN } from "./Constans";

function BoardComponent(rowIndex, colIndex, color, direction){
  this.row = rowIndex;
  this.col = colIndex;
  this.boardIndex = calcBoardIndex(this.row, this.col);
  this.color = color;
  this.direction = direction;
}

function calcBoardIndex(rowindex, colindex){
return rowindex * BOARD_COLUMN + colindex;
}

export { BoardComponent };