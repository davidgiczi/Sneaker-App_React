import { GAME_BOARD, SNAKE, SCORE, LEVEL, stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal,
                                turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical } from './SneakerLogic';
import upArrow from './icons/up.jpg';
import downArrow from './icons/down.jpg';
import leftArrow from './icons/left.jpg';
import rightArrow from './icons/right.jpg';
import { useState, useEffect } from 'react';
import { EAST, NORTH, SOUTH, WEST } from './Constans';
let playGame;

function SneakerResult(props){
    return(<div className='Result-displayer'>
        <font>{props.level}.<font className='Result-text'> szint,</font> {props.score}. 
        <font className='Result-text'> pont</font></font></div>)
}

function SneakerBoard(props){
const[gameBoard, setGameBoard] = useState(GAME_BOARD);
const[stopGame, setStopGame] = useState(true);
const[buttonText, setButtonText] = useState('Start');
const[score, setScore] = useState(SCORE);
const[level, setLevel] = useState(LEVEL);
   
  useEffect(() => {
    if(stopGame){
    clearTimeout(playGame);
    return;
    }
  playGame = setTimeout(play, 500);
  });

  const play = () => {
    stepSnake();
    setGameBoard(() => [...GAME_BOARD]);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
 });

  const handleKeyPress = (event) => {
    const snakeHead = SNAKE[SNAKE.length - 1];
    if(event.key === 'ArrowLeft' && (snakeHead.direction === NORTH || snakeHead.direction === SOUTH)){
    clearTimeout(playGame);
    turnWestSnakeIfStepVertical();
    setGameBoard(() => [...GAME_BOARD]);
    }
    else if(event.key === 'ArrowUp' && (snakeHead.direction === EAST || snakeHead.direction === WEST)){
    clearTimeout(playGame);
    turnNorthSnakeIfStepHorizontal();
    setGameBoard(() => [...GAME_BOARD]);
    }
    else if(event.key === 'ArrowRight'&& (snakeHead.direction === NORTH || snakeHead.direction === SOUTH)){
    clearTimeout(playGame);
    turnEastSnakeIfStepVertical();
    setGameBoard(() => [...GAME_BOARD]);
    }
    else if(event.key === 'ArrowDown' && (snakeHead.direction === EAST || snakeHead.direction === WEST)){
    clearTimeout(playGame);
    turnSouthSnakeIfStepHorizontal();
    setGameBoard(() => [...GAME_BOARD]);
    }
    else if(event.key === 'Enter'){
    clearTimeout(playGame);
    setStopGame(!stopGame);
    }
}

    const handleUpButtonPress = () => {
        if( stopGame ){
            clearTimeout(playGame);
            return;
           }
        const snakeHead = SNAKE[SNAKE.length - 1];
        if(snakeHead.direction === EAST || snakeHead.direction === WEST){
        clearTimeout(playGame);
        turnNorthSnakeIfStepHorizontal();
        setGameBoard(() => [...GAME_BOARD])
        }
    }
    const handleLeftButtonPress = () => {
        if( stopGame ){
            clearTimeout(playGame);
            return;
           }
        const snakeHead = SNAKE[SNAKE.length - 1];
        if(snakeHead.direction === NORTH || snakeHead.direction === SOUTH){
        clearTimeout(playGame);
        turnWestSnakeIfStepVertical();
        setGameBoard(() => [...GAME_BOARD])
        }
    }
    const handleRightButtonPress = () => {
        if( stopGame ){
            clearTimeout(playGame);
            return;
           }
        const snakeHead = SNAKE[SNAKE.length - 1];
        if(snakeHead.direction === NORTH || snakeHead.direction === SOUTH){
        clearTimeout(playGame);
        turnEastSnakeIfStepVertical();
        setGameBoard(() => [...GAME_BOARD])
        }
    }
    const handleDownButtonPress = () => {
        if( stopGame ){
            clearTimeout(playGame);
            return;
           }
        const snakeHead = SNAKE[SNAKE.length - 1];
        if(snakeHead.direction === EAST || snakeHead.direction === WEST){
        clearTimeout(playGame);
        turnSouthSnakeIfStepHorizontal();
        setGameBoard(() => [...GAME_BOARD])
        }
    }
    const handleStartStopButtonPress = () => {
        setButtonText(() => buttonText === 'Start' ? 'Stop' : 'Start');
        setStopGame(!stopGame);
    }

    return(<div className='Sneaker-board'>
    <SneakerResult level={level} score={score}/>
    <img src={props.image} alt='Nice-tree'></img>
    <SnakerBoardFields board={gameBoard}/>
    <SnakeNavigationButtons className='Navigation-btn' 
    up = {'url(' +  upArrow + ')' }
    down = {'url(' +  downArrow + ')' }
    left = {'url(' +  leftArrow + ')' }
    right = {'url(' +  rightArrow + ')' }
    upBtn = {handleUpButtonPress}
    leftBtn = {handleLeftButtonPress}
    rightBtn = {handleRightButtonPress}
    downBtn = {handleDownButtonPress}
    middleBtn = {handleStartStopButtonPress}
    text = {buttonText}
    />
</div>)
}

function SnakerBoardFields(props){
    return(<>
    {props.board.map((field) => 
    <div key={ field.id } style={{backgroundColor: field.color, 
                                    borderTop: field.borderTop,
                                    borderRight: field.borderRight,
                                    borderBottom: field.borderBottom,
                                    borderLeft: field.borderLeft}} 
                                    className='Board-field'></div>)}
    </>);
}

function SnakeNavigationButtons(props){

return(<div className='Navigation-btn'>
<div className='Up-btn'>
<button id='up-btn' style={{backgroundImage : props.up}} onClick={props.upBtn}></button>
</div>
<div>
<button id='left-btn' style={{backgroundImage : props.left}} onClick={props.leftBtn}></button>
<button id='startStop-btn' onClick={props.middleBtn}>{props.text}</button>
<button id='right-btn' style={{backgroundImage : props.right}} onClick={props.rightBtn}></button>
</div>
<div> 
<button id='down-btn' style={{backgroundImage : props.down}} onClick={props.downBtn}></button>
</div>
</div>);
}

export default SneakerBoard;