
const TABLE_SIZE = 15 * 15;
let boardField = {id: null,
              color: null,
            borderTop: null,
            borderRight: null,
            borderBottom: null,
            borderLeft: null
        }
let SNAKER_BOARD_FIELDS = initGame();


function initGame(){
    let fieldStore = [];
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
        fieldStore.push(boardField);
    }
    return fieldStore;
}

export { TABLE_SIZE, SNAKER_BOARD_FIELDS };


