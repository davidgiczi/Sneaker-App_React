import { SNAKER_BOARD_FIELDS } from "./SneakerLogic";

function SneakerBoard(props){
    return(<div className='Sneaker-Board'>
        <img src={props.image} alt='Nice-tree'></img>
        <SnakerBoardFields/>
        <SnakeNavigationButtons className='Navigation-Button'/>
    </div>)
}

function SnakerBoardFields(){
    return(<>
    {SNAKER_BOARD_FIELDS.map((field) => 
    <div key={ field.id } style={{backgroundColor: field.color}} className='Board-Field'>{field.id}</div>)}
    </>);
}

function SnakeNavigationButtons(){
return(<div className='Navigation-btn'>
<div className='Up-btn'>
<button id='up-btn'>Fel</button>
</div>
<div>
<button id='left-btn'>Balra</button>
<button id='right-btn'>Jobbra</button>
</div>
<div>
<button id='down-btn'>Le</button>
</div>
</div>);
}

export default SneakerBoard;