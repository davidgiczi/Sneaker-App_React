import { SNAKER_BOARD_FIELDS } from "./SneakerLogic";

function SneakerBoard(props){
    return(<div className='Sneaker-Board'>
        <img src={props.image} alt='Nice-tree'></img>
        <SnakerBoardFields/>
    </div>)
}

function SnakerBoardFields(){
    return(<>
    {SNAKER_BOARD_FIELDS.map((field) => <div key={ field.id } style={{backgroundColor: field.color}} className='Board-Field'>{field.id}</div>)}
    </>);
}

export default SneakerBoard;