import { SNAKER_BOARD_FIELDS } from './SneakerLogic';
import upArrow from './icons/up.jpg';
import downArrow from './icons/down.jpg';
import leftArrow from './icons/left.jpg';
import rightArrow from './icons/right.jpg';

function SneakerBoard(props){
    return(<div className='Sneaker-Board'>
        <img src={props.image} alt='Nice-tree'></img>
        <SnakerBoardFields/>
        <SnakeNavigationButtons className='Navigation-Button' 
        up = {'url(' +  upArrow + ')' }
        down = {'url(' +  downArrow + ')' }
        left = {'url(' +  leftArrow + ')' }
        right = {'url(' +  rightArrow + ')' }
        />
    </div>)
}

function SnakerBoardFields(){

    return(<>
    {SNAKER_BOARD_FIELDS.map((field) => 
    <div key={ field.id } style={{backgroundColor: field.color, 
                                    borderTop: field.borderTop,
                                    borderRight: field.borderRight,
                                    borderBottom: field.borderBottom,
                                    borderLeft: field.borderLeft}} className='Board-Field'>{field.id}</div>)}
    </>);
}

function SnakeNavigationButtons(props){
return(<div className='Navigation-btn'>
<div className='Up-btn'>
<button id='up-btn' style={{backgroundImage : props.up}}></button>
</div>
<div>
<button id='left-btn' style={{backgroundImage : props.left}}></button>
<button id='right-btn' style={{backgroundImage : props.right}}></button>
</div>
<div>
<button id='down-btn' style={{backgroundImage : props.down}}></button>
</div>
</div>);
}

export default SneakerBoard;