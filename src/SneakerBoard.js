import { GAME_BOARD, SNAKE, SCORE, LEVEL, LEAF_STORE, SPEED, THE_END_OF_THE_GAME,
    stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal,
    turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical, createNextLevelBoard, 
    calcLevel, calcSpeed } from './SneakerLogic';
import { useState, useEffect } from 'react';
import { EAST, NORTH, SOUTH, WEST } from './Constans';
let playGame;


function TheEndOfTheGameDisplayer(props){
    return(<div className='The-end' style={{color : props.color}}>VÉGE A JÁTÉKNAK!<font></font></div>)
}

function SneakerResult(props){
    return(<div className='Result-displayer'>
        <font>{props.level}<font className='Result-text'> szint,</font> {props.score} 
        <font className='Result-text'> pont</font></font></div>)
}

function SneakerBoard(props){
const[gameBoard, setGameBoard] = useState(GAME_BOARD);
const[STOP_GAME, setStopGame] = useState(true);
const[buttonText, setButtonText] = useState('Start');
const[score, setScore] = useState(SCORE);
const[level, setLevel] = useState(LEVEL);
const[theEndOfTheGameBackground, setTheEndOfTheGameBackground] = useState('transparent');
   
  useEffect(() => {
  playGame = setTimeout(play, SPEED);
  });

  const play = () => {
    if( STOP_GAME ){
    clearTimeout(playGame);
    }
    else if( THE_END_OF_THE_GAME ){
    setTheEndOfTheGameBackground('#f95151');
    }
    else {
    stepSnake();
    setGameBoard(() => [...GAME_BOARD]);
    }
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
    setStopGame( !STOP_GAME );
    }
}

    const handleUpButtonPress = () => {
        if( STOP_GAME ){
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
        if( STOP_GAME ){
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
        if( STOP_GAME ){
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
        if( STOP_GAME ){
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
        setStopGame( !STOP_GAME );
    }

    return(<div className='Sneaker-board'>
    <TheEndOfTheGameDisplayer color={theEndOfTheGameBackground}/>
    <SneakerResult level={level} score={score}/>
    <img src={props.image} alt='Nice-tree'></img>
    <SnakerBoardFields board={gameBoard}/>
    <SnakeNavigationButtons className='Navigation-btn' 
    up = 'Fel'
    down = 'Le'
    left = 'Balra'
    right = 'Jobbra'
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
<button id='up-btn' onClick={props.upBtn}>{props.up}</button>
</div>
<div>
<button id='left-btn' onClick={props.leftBtn}>{props.left}</button>
<button id='startStop-btn' onClick={props.middleBtn}>{props.text}</button>
<button id='right-btn' onClick={props.rightBtn}>{props.right}</button>
</div>
<div> 
<button id='down-btn' onClick={props.downBtn}>{props.down}</button>
</div>
</div>);
}

export default SneakerBoard;