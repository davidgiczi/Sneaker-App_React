import { BoardComponent } from './BoardComponent';
import { BOARD_SIZE, YELLOW, RED, GREEN, BROWN, NORTH, EAST,
     SOUTH, WEST, BOARD_COLUMN, BOARD_ROW, NUMBER_OF_LEAF, NUMBER_OF_BRANCH } from './Constans';
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
let isTheEndOfTheGame = false;
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

function createSnakeComponents(){
    const snakeBody = new BoardComponent(0, 0, YELLOW, null);
    const snakeHead = new BoardComponent(0, 1, RED, EAST);
    SNAKE.push(snakeBody);
    SNAKE.push(snakeHead);
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
        theEndOfTheGame();
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
else{
    theEndOfTheGame();
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
        theEndOfTheGame();
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
    theEndOfTheGame();
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
        theEndOfTheGame();
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
    
    while(LEAF_STORE.length !== NUMBER_OF_LEAF){
    let row = Math.floor(Math.random() * BOARD_ROW);
    let col = Math.floor(Math.random() * BOARD_COLUMN);
    if( isCorrectLeafComponent(row, col) ){
    LEAF_STORE.push(new BoardComponent(row, col, GREEN, null));
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

function isLeaf(headBoardIndex){
    for(let i = 0; i < LEAF_STORE.length; i++){
        if(headBoardIndex === LEAF_STORE[i].boardIndex){
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

function theEndOfTheGame(){
   isTheEndOfTheGame =  window.confirm('Vége a játéknak!\nSzeretnél még egyet játszani?');
    if( isTheEndOfTheGame ){
    window.location.reload();
    }
}

export { GAME_BOARD, SNAKE,stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal, 
                                turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical, isTheEndOfTheGame};


