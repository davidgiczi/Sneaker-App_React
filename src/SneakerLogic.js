import { BoardComponent } from './BoardComponent';
import { BOARD_SIZE, YELLOW, RED, GREEN, BROWN, LEFT, RIGHT, NORTH, EAST,
     SOUTH, WEST, BOARD_COLUMN, BOARD_ROW, NUMBER_OF_LEAF, NUMBER_OF_BRANCH } from './Constans';
const SNAKE = [];
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
    addSnakeToGameBoard();
};

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
    const snakeBody = new BoardComponent(0, 0, YELLOW, null);
    const snakeHead = new BoardComponent(0, 1, RED, EAST);
    SNAKE.push(snakeBody);
    SNAKE.push(snakeHead);
}

function addSnakeToGameBoard(){
for(let i = 0; i < SNAKE.length; i++){
    GAME_BOARD[SNAKE[i].boardIndex].color = SNAKE[i].color;
}
}

function stepSnake(){
    if( canStep() ){
        step();
        addSnakeToGameBoard();
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
GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
SNAKE.shift();
}

function turnLeftSnakeIfStepHorizontal(){
if( canTurnLeftIfStepHorizontal() ){
    turnLeftIfStepHorizontal();
    addSnakeToGameBoard();
}
}

function canTurnLeftIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row - 1 >= 0){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row + 1 < BOARD_ROW){
return true;
}

return false;
}

function turnLeftIfStepHorizontal(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === EAST){
        head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH);
    }
    else if(snakeHead.direction === WEST){
        head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function turnRightSnakeIfStepHorizontal(){
    if( canTurnRightIfStepHorizontal() ){
        turnRightIfStepHorizontal();
        addSnakeToGameBoard();
    }
}

function canTurnRightIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === EAST && snakeHead.row + 1 < BOARD_ROW){
return true;
}
else if(snakeHead.direction === WEST && snakeHead.row - 1 >= 0){
return true;
}
return false;
}

function turnRightIfStepHorizontal(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
SNAKE[headIndex].color = YELLOW;
let head;
if(snakeHead.direction === EAST){
    head = new BoardComponent(snakeHead.row + 1, snakeHead.col, RED, SOUTH);
}
else if(snakeHead.direction === WEST){
    head = new BoardComponent(snakeHead.row - 1, snakeHead.col, RED, NORTH);
}
SNAKE.push(head);
GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
SNAKE.shift();
}

function turnLeftSnakeIfStepVertical(){
if( canTurnLeftIfStepVertical() ){
    turnLeftIfStepVertical();
    addSnakeToGameBoard();
}
}
function canTurnLeftIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
if(snakeHead.direction === NORTH && snakeHead.col - 1 > 0){
return true;
    }
else if(snakeHead.direction === SOUTH && snakeHead.col + 1 < BOARD_COLUMN){
return true;
    }
return false;
}
function turnLeftIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function turnRightSnakeIfStepVertical(){
    if( canTurnRightIfStepVertical() ){
        turnRightIfStepVertical();
        addSnakeToGameBoard();
    }
}
function canTurnRightIfStepVertical(){
const headIndex = SNAKE.length - 1;
const snakeHead = SNAKE[headIndex];
    if(snakeHead.direction === NORTH && snakeHead.col + 1 < BOARD_COLUMN){
    return true;
    }
    else if(snakeHead.direction === SOUTH && snakeHead.col - 1 > 0){
    return true;
    }
return false;
}
function turnRightIfStepVertical(){
    const headIndex = SNAKE.length - 1;
    const snakeHead = SNAKE[headIndex];
    SNAKE[headIndex].color = YELLOW;
    let head;
    if(snakeHead.direction === NORTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col + 1, RED, EAST);
    }
    else if(snakeHead.direction === SOUTH){
        head = new BoardComponent(snakeHead.row, snakeHead.col - 1, RED, WEST);
    }
    SNAKE.push(head);
    GAME_BOARD[SNAKE[0].boardIndex].color = 'transparent';
    SNAKE.shift();
}

function isLeaf(){
    return false;
}

function isBranch(){
    return false;
}

export { GAME_BOARD, stepSnake, 
    turnLeftSnakeIfStepHorizontal, turnRightSnakeIfStepHorizontal, 
    turnLeftSnakeIfStepVertical, turnRightSnakeIfStepVertical };


