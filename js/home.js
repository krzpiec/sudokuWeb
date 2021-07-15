const tiles = document.querySelectorAll('.tile');
const boxes = document.querySelectorAll('.board-1to9-square');
tiles.forEach(tile => tile.addEventListener('input', handleTileInput));
tiles.forEach(tile => tile.addEventListener( 'click', handleTileFocus));
tiles.forEach(tile => tile.addEventListener('transitioned', endOfTileTransition))
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
const columns = 9;


function endOfTileTransition(e){
}

function handleBoxClick(e){

    let completedBoxesCounter = 0;

boxes.forEach(box => {
    let boxId = box.id.slice(3,4);
    let counter = 0;
    let rangeMax = boxId*9;
    let rangeMin = boxId*9 - 9;
    let arr = new Array(10).fill(0);
    tiles.forEach(tile => {
        if(parseInt(tile.id) >= rangeMin && parseInt(tile.id)<rangeMax && tile.innerHTML !== "" ){
            let number = parseInt(tile.innerHTML);
            arr[number]++;
            if(arr[number] !== 1)
            {
                console.log("elo");
                tile.style.backgroundColor = "rgb(255,0,0,0.7)";
            }
            else
            {
                tile.style.backgroundColor = "rgb(255,255,255,0)";
                counter++;
            }
            
        }
           
    });
    
    if(counter === 9 ){
        completedBoxesCounter++;
        box.style.backgroundColor = "rgb(26, 255, 0, 0.3)";
    }
    else{
        box.style.backgroundColor = "rgb(0, 0, 255, 0)";
    }
});
console.log(completedBoxesCounter);
if(completedBoxesCounter === 9){
    console.log(tiles[0]);
    tiles[0].setAttribute("contentEditable", "false");
    tiles[0].classList.add("tile-completed-sudoku")
    for(let i=0; i<tiles.length; i++){

       
        // for(let i=0; i<10;i++)
        // {
        //     tiles[i].style.backgroundColor = "rgb(100,100,100)";
            
        // }
            // let x = i;
            // let y = 0;
            // while(y<=i){
            //     tiles[x*columns + y].style.backgroundColor = "rgb(100,100,100)";
            //     y++;
            // }

    }
}

}

function handleTileInput(e){   
    if( isNaN(e.data)){
        this.innerHTML = this.innerHTML.replace(e.data, "");
        return;
    }
     
    this.innerHTML = e.data;
}

function handleTileFocus(e){  
    this.focus();
}

window.onload(handleBoxClick(null))//zle ale dziala xD