import { BoardComponent } from './BoardComponent';
import { BOARD_SIZE, YELLOW, RED, GREEN, BROWN, NORTH, EAST,
     SOUTH, WEST, BOARD_COLUMN, BOARD_ROW, NUMBER_OF_LEAF,
     NUMBER_OF_BRANCH, MIN_LENGTH_OF_SNAKE } from './Constans';
let SNAKE;
let BRANCH_STORE;
let LEAF_STORE;
let boardField = {
            id: null,
            color: null,
            borderTop: null,
            borderRight: null,
            borderBottom: null,
            borderLeft: null
        }
let GAME_BOARD;
let SCORE = 0;
let LEVEL = 'I.'
let SPEED = 500;
let THE_END_OF_THE_GAME = false;
initGame();

function initGame(){
    createGameBoard();
    createSnakeComponents();
    addSnakeComponentsToGameBoard();
    createBranchComponents();
    addBranchComponentsToGameBoard();
    createLeafComponents();
    addLeafComponentsToGameBoard();
}
function createGameBoard(){
    GAME_BOARD = [];
    for(let i =  0; i < BOARD_SIZE; i++){

        boardField = {};
        boardField.id = i;
        boardField.color = 'transparent';
        if( i < 15 ){
            boardField.borderTop = '10px solid #818c3c';
        }
        if( i % 15 === 14 ){
            boardField.borderRight = '10px solid #818c3c';
        }
        if( i > 209 && i < 225 ){
            boardField.borderBottom = '10px solid #818c3c';
        }
        if( i % 15 === 0 ){
            boardField.borderLeft = '10px solid #818c3c';
        }
        GAME_BOARD.push(boardField);
    }
}

function createSnakeComponents(){
    SNAKE = [];
    for(let i = 0; i < MIN_LENGTH_OF_SNAKE; i++){
        SNAKE.push( new BoardComponent(0, i, YELLOW, null));
    }
   let headIndex = SNAKE.length - 1;
   SNAKE[headIndex].direction = EAST;
   SNAKE[headIndex].color = RED;
}

function addSnakeComponentsToGameBoard(){
for(let i = 0; i < SNAKE.length; i++){
    GAME_BOARD[SNAKE[i].boardIndex].color = SNAKE[i].color;
}
}

function stepSnake(){
    if( canStep() ){
        step();
        addSnakeComponentsToGameBoard();
    }
    else {
        THE_END_OF_THE_GAME = true;
    }
}

function canStep(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];

if(snakeHead.direction === EAST && snakeHead.col + 1 < BOARD_COLUMN && 
    !isBranch(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex)){
return true;
}
else if(snakeHead.direction === SOUTH && snakeHead.row + 1 < BOARD_ROW && 
    !isBranch(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex)){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.col - 1 >= 0 && 
    !isBranch(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex)){
return true;
}
else if(snakeHead.direction === NORTH && snakeHead.row - 1 >= 0 && 
    !isBranch(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex)){
return true;
}
return false;
}

function step(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
SNAKE[headIndex].color = YELLOW;
if( !isLeaf(snakeHead.boardIndex) ){
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}
else {
    calcScore();
}
let head;
if(snakeHead.direction === EAST){
head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, snakeHead.direction);
}
else if(snakeHead.direction === SOUTH){
head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, snakeHead.direction);
}
else if(snakeHead.direction === WEST){
head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, snakeHead.direction);
}
else if(snakeHead.direction === NORTH){
head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, snakeHead.direction);
}
SNAKE.push(head);
}

function turnNorthSnakeIfStepHorizontal(){
if( canTurnNorthIfStepHorizontal() ){
    turnNorthIfStepHorizontal();
    addSnakeComponentsToGameBoard();
}
else {
    THE_END_OF_THE_GAME = true;
}
}

function canTurnNorthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row - 1 >= 0 &&
    !isBranch(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex)){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row - 1 >= 0 &&
    !isBranch(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row - 1, snakeHead.col, null, null).boardIndex)){
return true;
}
return false;
}

function turnNorthIfStepHorizontal(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    if( !isLeaf(snakeHead.boardIndex) ){
        GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
        SNAKE.shift();
    }
    else {
        calcScore();
    }
    let head;
    if(snakeHead.direction === EAST){
        head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH);
    }
    else if(snakeHead.direction === WEST){
        head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH);
    }
    SNAKE.push(head);
}

function turnSouthSnakeIfStepHorizontal(){
    if( canTurnSouthIfStepHorizontal() ){
        turnSouthIfStepHorizontal();
        addSnakeComponentsToGameBoard();
    }
    else {
        THE_END_OF_THE_GAME = true;
    }
}

function canTurnSouthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row + 1 < BOARD_ROW &&
    !isBranch(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex)){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row + 1 < BOARD_ROW &&
    !isBranch(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row + 1, snakeHead.col, null, null).boardIndex)){
return true;
}
return false;
}

function turnSouthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
SNAKE[headIndex].color = YELLOW;
if( !isLeaf(snakeHead.boardIndex) ){
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}
else {
    calcScore();
}
let head;
if(snakeHead.direction === EAST){
    head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH);
}
else if(snakeHead.direction === WEST){
    head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH);
}
SNAKE.push(head);
}

function turnWestSnakeIfStepVertical(){
if( canTurnWestIfStepVertical() ){
    turnWestIfStepVertical();
    addSnakeComponentsToGameBoard();
}
else {
   THE_END_OF_THE_GAME = true;
}
}
function canTurnWestIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === NORTH && snakeHead.col - 1 >= 0 &&
    !isBranch(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex)){
return true;
    }
else if(snakeHead.direction === SOUTH && snakeHead.col - 1 >= 0 &&
    !isBranch(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex) &&
    !isBitten(new BoardComponent(snakeHead.row, snakeHead.col - 1, null, null).boardIndex)){
return true;
    }
return false;
}
function turnWestIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    if( !isLeaf(snakeHead.boardIndex) ){
        GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
        SNAKE.shift();
    }
    else {
        calcScore();
    }
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST);
    }
    SNAKE.push(head);
}

function turnEastSnakeIfStepVertical(){
    if( canTurnEastIfStepVertical() ){
        turnEastIfStepVertical();
        addSnakeComponentsToGameBoard();
    }
    else {
       THE_END_OF_THE_GAME = true;
    }
}
function canTurnEastIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
    if(snakeHead.direction === NORTH && snakeHead.col + 1 < BOARD_COLUMN &&
        !isBranch(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex) &&
        !isBitten(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex)){
    return true;
    }
    else if(snakeHead.direction === SOUTH && snakeHead.col + 1 < BOARD_COLUMN &&
        !isBranch(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex) &&
        !isBitten(new BoardComponent(snakeHead.row, snakeHead.col + 1, null, null).boardIndex)){
    return true;
    }
    return false;
}
function turnEastIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    if( !isLeaf(snakeHead.boardIndex) ){
        GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
        SNAKE.shift();
    }
    else {
        calcScore();
    }
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST);
    }
    SNAKE.push(head);
}

function createBranchComponents(){
BRANCH_STORE = [];
while(BRANCH_STORE.length !== NUMBER_OF_BRANCH){
    let row = Math.floor(Math.random() * BOARD_ROW);
    let col = Math.floor(Math.random() * BOARD_COLUMN);
    if( isCorrectBranchComponent(row, col) ){
        BRANCH_STORE.push(new BoardComponent(row, col, BROWN, null));
        }
    }
}

function isCorrectBranchComponent(rowValue, colValue){
    const headIndex = SNAKE.length - 1;
    const head = SNAKE[headIndex];
   if(head.row === rowValue || head.col === colValue){
    return false;
   }
   for(let i = 0; i < BRANCH_STORE.length; i++){
        if(BRANCH_STORE[i].boardIndex === (rowValue * BOARD_COLUMN + colValue)){
            return false;
        }
    }
    return true;
}

function addBranchComponentsToGameBoard(){
    for(let i = 0; i < BRANCH_STORE.length; i++){
        GAME_BOARD[BRANCH_STORE[i].boardIndex].color = BRANCH_STORE[i].color;
    }
}

function createLeafComponents(){
    LEAF_STORE = [];
    while(LEAF_STORE.length !== NUMBER_OF_LEAF){
    let row = Math.floor(Math.random() * BOARD_ROW);
    let col = Math.floor(Math.random() * BOARD_COLUMN);
    if( isCorrectLeafComponent(row, col) ){
    LEAF_STORE.push(new BoardComponent(row, col, GREEN, null));
        }
    }
}

function isCorrectLeafComponent(rowValue, colValue){
   
  for(let i = 0; i <SNAKE.length; i++){
  if(SNAKE[i].row === rowValue && SNAKE[i].col === colValue){
    return false;
   }
  }
   for(let i = 0; i < BRANCH_STORE.length; i++){
        if(BRANCH_STORE[i].boardIndex === (rowValue * BOARD_COLUMN + colValue)){
            return false;
        }
    }
    for(let i = 0; i < LEAF_STORE.length; i++){
        if(LEAF_STORE[i].boardIndex === (rowValue * BOARD_COLUMN + colValue)){
            return false;
        }
    }

    return true;
}

function addLeafComponentsToGameBoard(){
    for(let i = 0; i < LEAF_STORE.length; i++){
        GAME_BOARD[LEAF_STORE[i].boardIndex].color = LEAF_STORE[i].color;
    }
}

function isLeaf(headBoardIndex){
    for(let i = 0; i < LEAF_STORE.length; i++){
        if(headBoardIndex === LEAF_STORE[i].boardIndex){
            LEAF_STORE.splice(i, 1);
            return true;
        }
    }
    return false;
}

function isBranch(headBoardIndex){
    for(let i = 0; i < BRANCH_STORE.length; i++){
        if(headBoardIndex === BRANCH_STORE[i].boardIndex){
            return true;
        }
    }
    return false;
}

function isBitten(headBoardIndex){
    for(let i = 0; i < SNAKE.length - 1; i++){
        if(headBoardIndex === SNAKE[i].boardIndex){
            return true;
        }
    }
    return false;
}

function createNextLevelBoard(){
for(let i = 0; i < GAME_BOARD.length; i++){
    GAME_BOARD[i].color = 'transparent';
}
    LEAF_STORE = [];
    BRANCH_STORE = [];
    addSnakeComponentsToGameBoard();
    createBranchComponents();
    addBranchComponentsToGameBoard();
    createLeafComponents();
    addLeafComponentsToGameBoard();
}

function calcLevel(){
    if(MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'I.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'II.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'III.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'IV.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'V.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'VI.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'VII.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF >= SNAKE.length){
        LEVEL = 'VIII.';
     }
     else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 9 * NUMBER_OF_LEAF >= SNAKE.length) {
        LEVEL = 'IX.';
     }
     else{
        LEVEL = 'X.';
     }

}

function calcScore(){
if(MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 10;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 20;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 30;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 40;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 50;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 60;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 70;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 80;
}
else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 9 * NUMBER_OF_LEAF >= SNAKE.length){
    SCORE += 90;
}
else {
    SCORE += 100;
}
}

function calcSpeed(){
    if(MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF >= SNAKE.length){
       SPEED = 500;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 450;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 2 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 400;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 3 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 350;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 4 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 300;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 5 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 250;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 6 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 200;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 7 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 150;
    }
    else if(SNAKE.length > MIN_LENGTH_OF_SNAKE + 8 * NUMBER_OF_LEAF && MIN_LENGTH_OF_SNAKE + 9 * NUMBER_OF_LEAF >= SNAKE.length){
        SPEED = 100;
    }
    else {
        SPEED = 50;
    }
}

export { GAME_BOARD, SNAKE,stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal, 
        turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical, createNextLevelBoard, calcLevel, calcSpeed,
        SCORE, LEVEL, SPEED, LEAF_STORE, THE_END_OF_THE_GAME };


