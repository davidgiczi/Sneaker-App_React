const TABLE_SIZE = 15 * 15;

function SneakerBoard(props){
    return(<div className='Sneaker-Board'>
        <img src={props.image} alt='Nice-tree'></img>
        <SnakerBoardFields/>
    </div>)
}

function SnakerBoardFields(props){
    let tableFieldStore = []
    for(let i = 0; i < TABLE_SIZE; i++){
       tableFieldStore.push(i);
    }
    return(<>
    {tableFieldStore.map((i) => <div key={i} className='Board-Field'></div>)}
    </>);
}

export default SneakerBoard;