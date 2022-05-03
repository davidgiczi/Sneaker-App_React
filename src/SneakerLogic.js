const TABLE_SIZE = 15 * 15;
let boardField = {id: null,
              color: null}
let SNAKER_BOARD_FIELDS = initGame();


function initGame(){
    let fieldStore = [];
    for(let i =  0; i < TABLE_SIZE; i++){

        boardField = {};
        boardField.id = i;
        boardField.color = 'white';
        fieldStore.push(boardField);
    }
    return fieldStore;
}

export { TABLE_SIZE, SNAKER_BOARD_FIELDS };


