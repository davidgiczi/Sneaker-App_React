import { BoardComponent } from './BoardComponent';
import { BOARD_SIZE, YELLOW, RED, GREEN, BROWN, LEFT, RIGHT, NORTH, EAST,
     SOUTH, WEST, BOARD_COLUMN, BOARD_ROW, NUMBER_OF_LEAF, NUMBER_OF_BRANCH,
     HEAD, BODY, LEAF, BRANCH } from './Constans';
const SNAKE = [];
const BRANCH_STORE = [];
const LEAF_STORE = [];
let boardField = {
            id: null,
            color: null,
            borderTop: null,
            borderRight: null,
            borderBottom: null,
            borderLeft: null
        }
const GAME_BOARD = [];
initGame();

function initGame(){
    createGameBoard();
    createSnake();
    addSnakeComponentToGameBoard();
    createBranchComponents();
    addBranchComponentsToGameBoard();
    createLeafComponents();
    addLeafComponentsToGameBoard();
}
function createGameBoard(){

    for(let i =  0; i < BOARD_SIZE; i++){

        boardField = {};
        boardField.id = i;
        boardField.color = 'transparent';
        if( i < 15 ){
            boardField.borderTop = '5px solid #818c3c';
        }
        if( i % 15 === 14 ){
            boardField.borderRight = '5px solid #818c3c';
        }
        if( i > 209 && i < 225 ){
            boardField.borderBottom = '5px solid #818c3c';
        }
        if( i % 15 === 0 ){
            boardField.borderLeft = '5px solid #818c3c';
        }
        GAME_BOARD.push(boardField);
    }
}

function createSnake(){
    const snakeBody = new BoardComponent(0, 0, YELLOW, null, BODY);
    const snakeHead = new BoardComponent(0, 1, RED, EAST, HEAD);
    SNAKE.push(snakeBody);
    SNAKE.push(snakeHead);
}

function addSnakeComponentToGameBoard(){
for(let i = 0; i < SNAKE.length; i++){
    GAME_BOARD[SNAKE[i].boardIndex].color = SNAKE[i].color;
}
}

function stepSnake(){
    if( canStep() ){
        step();
        addSnakeComponentToGameBoard();
    }
}

function canStep(){
const headIndex = SNAKE.length - 1;
if(SNAKE[headIndex].direction === EAST && SNAKE[headIndex].col + 1 < BOARD_COLUMN){
return true;
}
else if(SNAKE[headIndex].direction === SOUTH && SNAKE[headIndex].row + 1 < BOARD_ROW){
return true;
}
else if(SNAKE[headIndex].direction === WEST && SNAKE[headIndex].col - 1 >= 0){
return true;
}
else if(SNAKE[headIndex].direction === NORTH && SNAKE[headIndex].row - 1 >= 0){
return true;
}
return false;
}

function step(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
SNAKE[headIndex].color = YELLOW;
let head;
if(snakeHead.direction === EAST){
head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, snakeHead.direction, HEAD);
}
else if(snakeHead.direction === SOUTH){
head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, snakeHead.direction, HEAD);
}
else if(snakeHead.direction === WEST){
head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, snakeHead.direction, HEAD);
}
else if(snakeHead.direction === NORTH){
head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, snakeHead.direction, HEAD);
}
SNAKE.push(head);
GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
SNAKE.shift();
}

function turnNorthSnakeIfStepHorizontal(){
if( canTurnNorthIfStepHorizontal() ){
    turnNorthIfStepHorizontal();
    addSnakeComponentToGameBoard();
}
}

function canTurnNorthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row - 1 >= 0){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row - 1 >= 0){
return true;
}
return false;
}

function turnNorthIfStepHorizontal(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === EAST){
        head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH, HEAD);
    }
    else if(snakeHead.direction === WEST){
        head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH, HEAD);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function turnSouthSnakeIfStepHorizontal(){
    if( canTurnSouthIfStepHorizontal() ){
        turnSouthIfStepHorizontal();
        addSnakeComponentToGameBoard();
    }
}

function canTurnSouthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row + 1 < BOARD_ROW){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row + 1 < BOARD_ROW){
return true;
}
return false;
}

function turnSouthIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
SNAKE[headIndex].color = YELLOW;
let head;
if(snakeHead.direction === EAST){
    head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH, HEAD);
}
else if(snakeHead.direction === WEST){
    head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH, HEAD);
}
SNAKE.push(head);
GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
SNAKE.shift();
}

function turnWestSnakeIfStepVertical(){
if( canTurnWestIfStepVertical() ){
    turnWestIfStepVertical();
    addSnakeComponentToGameBoard();
}
}
function canTurnWestIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === NORTH && snakeHead.col - 1 >= 0){
return true;
    }
else if(snakeHead.direction === SOUTH && snakeHead.col - 1 >= 0){
return true;
    }
return false;
}
function turnWestIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST, HEAD);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST, HEAD);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function turnEastSnakeIfStepVertical(){
    if( canTurnEastIfStepVertical() ){
        turnEastIfStepVertical();
        addSnakeComponentToGameBoard();
    }
}
function canTurnEastIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
    if(snakeHead.direction === NORTH && snakeHead.col + 1 < BOARD_COLUMN){
    return true;
    }
    else if(snakeHead.direction === SOUTH && snakeHead.col + 1 < BOARD_COLUMN){
    return true;
    }
    return false;
}
function turnEastIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST, HEAD);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST, HEAD);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function createBranchComponents(){

while(BRANCH_STORE.length !== NUMBER_OF_BRANCH){
    let row = Math.floor(Math.random() * BOARD_ROW);
    let col = Math.floor(Math.random() * BOARD_COLUMN);
    if( isCorrectBranchComponent(row, col) ){
        BRANCH_STORE.push(new BoardComponent(row, col, BROWN, null, BRANCH));
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
    
    while(LEAF_STORE.length !== NUMBER_OF_LEAF){
    let row = Math.floor(Math.random() * BOARD_ROW);
    let col = Math.floor(Math.random() * BOARD_COLUMN);
    if( isCorrectLeafComponent(row, col) ){
    LEAF_STORE.push(new BoardComponent(row, col, GREEN, null, LEAF));
        }
    }
}

function isCorrectLeafComponent(rowValue, colValue){
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

function isLeaf(){
    return false;
}

function isBranch(){
    return false;
}

export { GAME_BOARD, SNAKE,stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal, 
                                turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical };


