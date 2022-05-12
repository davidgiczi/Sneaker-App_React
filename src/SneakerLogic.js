import { SnakeComponent, BoardComponent } from './Component';
import { BOARD_SIZE, YELLOW, RED, GREEN, BROWN, LEFT, RIGHT, NORTH, EAST, SOUTH, WEST } from './Constans';
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

function addSnakeToGameBoard(){
    const snakeBody = new SnakeComponent(0, YELLOW, EAST);
    const snakeHead = new SnakeComponent(1, RED, EAST);
    SNAKE.push(snakeBody);
    SNAKE.push(snakeHead);
    GAME_BOARD[SNAKE[0].boardIndex].color = SNAKE[0].color;
    GAME_BOARD[SNAKE[1].boardIndex].color = SNAKE[1].color;
}

function stepSnake(){

}

export { GAME_BOARD };


