import { GAME_BOARD, stepSnake, turnNorthSnakeIfStepHorizontal, turnSouthSnakeIfStepHorizontal,
                                turnWestSnakeIfStepVertical, turnEastSnakeIfStepVertical } from './SneakerLogic';
import upArrow from './icons/up.jpg';
import downArrow from './icons/down.jpg';
import leftArrow from './icons/left.jpg';
import rightArrow from './icons/right.jpg';
import { useState, useEffect } from 'react';
let play;
  
function SneakerBoard(props){
const[gameBoard, setGameBoard] = useState(GAME_BOARD);
   
    useEffect(() => {
   play = setTimeout(() => {
            stepSnake();
            setGameBoard(() => [...GAME_BOARD])
    }, 1000);
  });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
 },[]);

  const handleKeyPress = (event) => {
    clearTimeout(play);
    if(event.key === 'ArrowLeft'){
    turnWestSnakeIfStepVertical();
    }
    else if(event.key === 'ArrowUp'){
    turnNorthSnakeIfStepHorizontal();
    }
    else if(event.key === 'ArrowRight'){
    turnEastSnakeIfStepVertical();
    }
    else if(event.key === 'ArrowDown'){
    turnSouthSnakeIfStepHorizontal();
    }
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
        onClick={() => alert('Hi Dave!')}
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
                                    className='Board-Field'>{field.id}</div>)}
    </>);
}

function SnakeNavigationButtons(props){

return(<div className='Navigation-btn'>
<div className='Up-btn'>
<button id='up-btn' style={{backgroundImage : props.up}} onClick={props.onClick}></button>
</div>
<div>
<button id='left-btn' style={{backgroundImage : props.left}}  onClick={props.onClick}></button>
<button id='right-btn' style={{backgroundImage : props.right}}  onClick={props.onClick}></button>
</div>
<div>
<button id='down-btn' style={{backgroundImage : props.down}}  onClick={props.onClick}></button>
</div>
</div>);
}

export default SneakerBoard;