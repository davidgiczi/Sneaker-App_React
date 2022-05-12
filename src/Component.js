import { BOARD_COLUMN } from "./Constans";

function SnakeComponent(boardIndex, color, direction) {
    this.boardIndex = boardIndex;
    this.color = color;
    this.direction = direction
    this.row = calcRowIndex(this.boardIndex);
    this.column = calcColumnIndex(this.boardIndex);
}

function BoardComponent(rowIndex, colIndex, color, direction){
  this.row = rowIndex;
  this.col = colIndex;
  this.color = color;
  this.direction = direction;
  this.boardIndex = calcBoardIndex(this.row, this.col);
}

function calcRowIndex(boardindex){
return Math.floor(boardindex / BOARD_COLUMN);
} 

function calcColumnIndex(boardindex){
return boardindex % BOARD_COLUMN;
}

function calcBoardIndex(rowindex, colindex){
return rowindex * BOARD_COLUMN + colindex;
}

export { SnakeComponent, BoardComponent };