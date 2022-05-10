const TABLE_SIZE = 15 * 15;
const SNAKE = [0, 1];
const YELLOW = "#f9e35f";
const RED =  "#f95151";
const GREEN = "#0b6623";
const BROWN = "#72601b";
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
    addSnake();
}

function createGameBoard(){

    for(let i =  0; i < TABLE_SIZE; i++){

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

function addSnake(){
for(let i = 0; i < SNAKE.length - 1; i++){
    GAME_BOARD[SNAKE[i]].color = YELLOW; 
}
GAME_BOARD[SNAKE[SNAKE.length - 1]].color = RED;
}

function stepSnake(){

}

export { TABLE_SIZE, GAME_BOARD };


