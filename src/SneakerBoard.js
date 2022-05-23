import { GAME_BOARD, SNAKE, stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal,
                                turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical } from './SneakerLogic';
import upArrow from './icons/up.jpg';
import downArrow from './icons/down.jpg';
import leftArrow from './icons/left.jpg';
import rightArrow from './icons/right.jpg';
import { useState, useEffect } from 'react';
import { EAST, NORTH, SOUTH, WEST } from './Constans';
let play;

function SneakerBoard(props){
const[gameBoard, setGameBoard] = useState(GAME_BOARD);
   
    useEffect(() => {
   play = setTimeout(() => {
            stepSnake();
            setGameBoard(() => [...GAME_BOARD]);
    }, 1000);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
 },[]);

  const handleKeyPress = (event) => {
    const snakeHead = SNAKE[SNAKE.length - 1];
    if(event.key === 'ArrowLeft' && (snakeHead.direction === NORTH || snakeHead.direction === SOUTH)){
    clearTimeout(play);
    turnWestSnakeIfStepVertical();
    setGameBoard(() => [...GAME_BOARD])
    }
    else if(event.key === 'ArrowUp' && (snakeHead.direction === EAST || snakeHead.direction === WEST)){
    clearTimeout(play);
    turnNorthSnakeIfStepHorizontal();
    setGameBoard(() => [...GAME_BOARD])
    }
    else if(event.key === 'ArrowRight'&& (snakeHead.direction === NORTH || snakeHead.direction === SOUTH)){
    clearTimeout(play);
    turnEastSnakeIfStepVertical();
    setGameBoard(() => [...GAME_BOARD])
    }
    else if(event.key === 'ArrowDown' && (snakeHead.direction === EAST || snakeHead.direction === WEST)){
    clearTimeout(play);
    turnSouthSnakeIfStepHorizontal();
    setGameBoard(() => [...GAME_BOARD])
    }
}

    const handleUpButtonPress = () => {
        clearTimeout(play);
        turnNorthSnakeIfStepHorizontal();
        setGameBoard(() => [...GAME_BOARD])
    }
    const handleLeftButtonPress = () => {
        clearTimeout(play);
        turnWestSnakeIfStepVertical();
        setGameBoard(() => [...GAME_BOARD])
    }
    const handleRightButtonPress = () => {
        clearTimeout(play);
        turnEastSnakeIfStepVertical();
        setGameBoard(() => [...GAME_BOARD])
    }
    const handleDownButtonPress = () => {
        clearTimeout(play);
        turnSouthSnakeIfStepHorizontal();
        setGameBoard(() => [...GAME_BOARD])
    }

    return(<div className='Sneaker-Board'>
        <img src={props.image} alt='Nice-tree'></img>
        <SnakerBoardFields board={gameBoard}/>
        <SnakeNavigationButtons className='Navigation-Button' 
        up = {'url(' +  upArrow + ')' }
        down = {'url(' +  downArrow + ')' }
        left = {'url(' +  leftArrow + ')' }
        right = {'url(' +  rightArrow + ')' }
        upBtn = {handleUpButtonPress}
        leftBtn = {handleLeftButtonPress}
        rightBtn = {handleRightButtonPress}
        downBtn = {handleDownButtonPress}
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
                                    className='Board-Field'></div>)}
    </>);
}

function SnakeNavigationButtons(props){

return(<div className='Navigation-btn'>
<div className='Up-btn'>
<button id='up-btn' style={{backgroundImage : props.up}} onClick={props.upBtn}></button>
</div>
<div>
<button id='left-btn' style={{backgroundImage : props.left}} onClick={props.leftBtn}></button>
<button id='right-btn' style={{backgroundImage : props.right}} onClick={props.rightBtn}></button>
</div>
<div> 
<button id='down-btn' style={{backgroundImage : props.down}} onClick={props.downBtn}></button>
</div>
</div>);
}


export default SneakerBoard;