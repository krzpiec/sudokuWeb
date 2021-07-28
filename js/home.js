const tiles = document.querySelectorAll('.tile');
const boxes = document.querySelectorAll('.board-1to9-square');
const checkamrk = document.querySelector('.checkmarkContainer');
const timer = document.querySelector('.time');
const timerHours = document.getElementById("hour");
const timerMinutes = document.getElementById("minutes");
const timerSeconds = document.getElementById("seconds");
const checkamrkImg = document.querySelector('.checkmarkImg');
const diffSelector = document.getElementById('difficulty');
const penSwitcher = document.getElementById('penSwitcher');
const penText = document.querySelector('.pen-text');
const pencilText = document.querySelector('.pencil-text');
tiles.forEach(tile => tile.addEventListener('input', handleTileInput));
tiles.forEach(tile => tile.addEventListener( 'click', handleTileFocus));
tiles.forEach(tile => tile.addEventListener('transitioned', endOfTileTransition))
boxes.forEach(box => box.addEventListener('click', handleBoxClick));
const columns = 9;
const N = 9;
howManyEmptyCelss = [40, 48, 54, 0];
let hours = 0;
let minutes = 0;
let seconds = 0;


let finalArr = new Array(9);
for(let i =0; i<9; i++)
    {
        finalArr[i] = new Array(9).fill(0);
    }
let usedCells = [];
let unusedCells = new Array(81);
let arr = new Array(9);
let counter=0;
let tilesOrderedById = new Array();
for(let i=0; i<tiles.length; i++)
{
    tilesOrderedById[i] = tiles[i];
}
tilesOrderedById.sort((a, b) => a.id - b.id);
let solutions = 0;


const changePen = () =>{

if(penSwitcher.checked)
{
penText.style.color = "rgba(0,0,0,1)";
pencilText.style.color = "rgba(0,0,0,0.5)";
}
else{
    penText.style.color = "rgba(0,0,0,0.5)";
    pencilText.style.color = "rgba(0,0,0,1)";
}
}


const isValid = (row,col,number) =>{
if(number == 0)
return false;

    for(let i=0; i<9;i++)
    {
        if(finalArr[row][i] == number)
            return false
    }
    for(let i=0;i<9;i++)
    {
        if(finalArr[i][col] == number)
        {
            return false;
        }
    }

    let startX = row - row % 3,
    startY = col - col % 3;
     
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (finalArr[i + startX][j + startY] == number)
              return false;

    return true;
}


const removePencilMarks = (row,col,number) =>{

    for(let i=0; i<9; i++)
    {
        
        const index = arr[row][i].indexOf(number);
        if (index > -1) 
        {
            arr[row][i][index] = 0;
        }       
    }

    for(let i=0; i<9; i++)
    {
        
        const index = arr[i][col].indexOf(number);
        if (index > -1) 
        {
            arr[i][col][index]=0;
        }       
    }

    let startX = row - row % 3,
    startY = col - col % 3;
     
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            const index = arr[i+startX][j+startY].indexOf(number);
        if (index > -1) 
        {
            arr[i+startX][j+startY][index]=0;
        }      
        }
        
    }

}

const addPencilMarks = (row,col,number) =>{

    for(let i=0; i<9; i++)
    {
        for(let j =0; j<9; j++)
        {
            if(arr[row][i][j] == 0)
            {
                arr[row][i][j] = number;
                break;
            }
        }
          
    }

    for(let i=0; i<9; i++)
    {
        
        for(let j =0; j<9; j++)
        {
            if(arr[i][col][j] == 0)
            {
                arr[i][col][j] = number;
                break;
            }
        }  
    }

    let startX = row - row % 3,
    startY = col - col % 3;
     
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            for(let k=0; k<9;k++)
            {
                if(arr[i+startX][j+startY][k] == 0)
                {
                    arr[i+startX][j+startY][k] = number;
                    break;
                }
            }
        }
        
    }
        


}

const sudokuBacktracker = (row,col) =>{
    if (row == N - 1 && col == N)
        return true;
    if (col == N)
    {
        row++;
        col = 0;
    }

    if (finalArr[row][col] != 0)
        return sudokuBacktracker(row, col + 1);

        let possibleNmbers = [1,2,3,4,5,6,7,8,9];
        possibleNmbers = possibleNmbers.sort(() => Math.random() - 0.5);

        for(let i = 0; i < 9; i++)
    {
         
        if (isValid(row, col, possibleNmbers[i]))
        {
             
            
            finalArr[row][col] = possibleNmbers[i];
 
            
            if (sudokuBacktracker(row, col + 1))
                return true;
        }
         
        
        finalArr[row][col] = 0;
    }
    return false;
    // for(let i = 0; i < 9; i++)
    // {
        
    //    // console.log(arr[1][1], 'arr');
    //     if (arr[row][col][i]!= 0 && isValid(row, col, arr[row][col][i]))
    //     {
    //         //console.log(arr[row][col][i]);
    //         finalArr[row][col] = arr[row][col][i];
    //         //console.log(finalArr[row][col]);
    //        // console.log(finalArr[1], row);
    //         removePencilMarks(row,col, arr[row][col][i]);
    //         if (sudokuBacktracker(row, col + 1))
    //         {
    //            // console.log('true');
    //             return true;
    //         }
               
    //     }
         
    //     /* removing the assigned num , since our
    //        assumption was wrong , and we go for next
    //        assumption with diff num value   */
    //     finalArr[row][col] = 0;
    //     addPencilMarks(row,col, arr[row][col][i]);
    // }
    //return false;


    


}
const clearSudoku = () =>{
    clearFinalArr();
    for(let i =0; i<tiles.length; i++)
    {
        tiles[i].innerHTML = "";
        tiles[i].setAttribute("contentEditable", "true");
        if(tiles[i].classList.contains('tile-completed-sudoku'))
        {
            tiles[i].classList.remove('tile-completed-sudoku');
        }
        if(tiles[i].classList.contains('tile-pen'))
        {
            tiles[i].classList.remove('tile-pen');
        }
        if(tiles[i].classList.contains('tile-pencil'))
        {
            tiles[i].classList.remove('tile-pencil');
        }
        if(tiles[i].classList.contains('error'))
        {
            tiles[i].classList.remove('error');
        }
        if(!tiles[i].classList.contains('normal'))
        {
            tiles[i].classList.add('normal');
        }
            
    }
}

const newGame = () =>{
    stopTimer();
    startTimer();
    clearSudoku();
    generateSudokuPuzzle();
    fillSudoku();
}


const fillSudoku = () =>{
    for(let i =0; i<tiles.length; i++)
    {
        let index = parseInt(tiles[i].getAttribute("id"));
        tiles[i].classList.add('tile-pen');
        if(finalArr[Math.floor(index/9)][index%9] !== 0 )
        {
            tiles[i].innerHTML = finalArr[Math.floor(index/9)][index%9].toString();
        }
        
    }

}


const solveBoard = (board, row, col) =>{
    if (row == N - 1 && col == N){
        solutions++;
        return true;
    }
    
if (col == N)
{
    row++;
    col = 0;
}

if (board[row][col] != 0)
{
    return solveBoard(board, row, col + 1);
}


for(let i = 0; i < 9; i++)
    {
         
        if (isValid(row, col, i))
        {
             
            
            board[row][col] = i;
 
            
           if( solveBoard(board,row, col + 1)){
               return true;
           }
 
        }
         
        
        board[row][col] = 0;
    }
    return false;

}

const removeCellFromOneBox = (n, x ,y) =>{

    let indexes = new Array(9).fill(0);
    for(let i=0; i<n; i++)
    {
        indexes[i] = 1;
    }
    indexes = indexes.sort(() => Math.random() - 0.5);
    let counter = 0;

    for(let i=0; i<3; i++)
    {
        for(let j = 0; j<3; j++)
        {
            if(indexes[counter] === 1)
            {
                finalArr[x+i][y+j] = 0;
            }
            counter++;
        }
    }
}

const removeCellsFromBoxes = (n) =>{
    let counter = 0;
    for(let i=0; i<=6; i+=3)
    {
        for(let j=0; j<=6; j+=3)
        {
            removeCellFromOneBox(n,i,j);
        }
    }

    }

const removeExtraCells = (n) =>{
    for(let i=0; i<9; i++)
    {
        let counterRow = 0;
        let counterColumn = 0;
        for(let j=0; j<9; j++)
        {
            if(finalArr[i][j] !== 0)
            {
                counterRow++;
            }
            if(finalArr[j][i] !== 0)
            {
                counterColumn++;
            }
        }
        if(counterRow === 9)
        {
            let radnomIndex = (Math.random() * (8 - 0 + 1) ) << 0
            finalArr[i][radnomIndex] = 0;
        }
        if(counterColumn === 9)
        {
            let radnomIndex = (Math.random() * (8 - 0 + 1) ) << 0
            finalArr[radnomIndex][i] = 0;
        }
    }

}

const generateSudokuPuzzle = () =>{
    generateCompleteSudoku();

    
    let range = howManyEmptyCelss[diffSelector.value-1];
    let cellPerBox = Math.floor(range/9);
    let extraCells = range%9;
    let randomNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    removeCellsFromBoxes(cellPerBox);
    removeExtraCells(extraCells);

    // for(let i=0; i<range; i++)
    // {
    //     finalArr[Math.floor(indexes[i]/9)][indexes[i]%9] = 0;
    // }
    
   //    solveBoard(finalArr, 0,0 );


}

const generateCompleteSudoku = () =>{

    for(let i = 0; i<9; i++)
    {
        arr[i] = new Array(9);
        for(let j =0; j<9; j++)
        {
            arr[i][j] = [];
            for(let k=0; k<9;k++)
            {
                let possibleNmbers = [1,2,3,4,5,6,7,8,9];
                arr[i][j] = possibleNmbers.sort(() => Math.random() - 0.5);
            }
        }
    }

    
   sudokuBacktracker(0,0);


}

function endOfTileTransition(e){
}

const markBoxAsCompleted = (boxId) =>{
    let rangeMax = boxId*9;
    let rangeMin = boxId*9 - 9;
    for(let i = rangeMin; i<rangeMax; i++)
    {

         if(tiles[i].classList.contains('errpr'))
            tiles[i].classList.remove('error');

        if(tiles[i].classList.contains('normal'))
            tiles[i].classList.remove('normal');

            tiles[i].classList.add('box-completed');
    }


}

const removeErrorToCells = (i,j) =>{
    if(tilesOrderedById[i*9+j].classList.contains('error'))
    {
        tilesOrderedById[i*9+j].classList.remove('error');
    }
    if(!tilesOrderedById[i*9+j].classList.contains('normal'))
    {
        tilesOrderedById[i*9+j].classList.add('normal');
    }
}

const applyErrorToCells = (i,j) =>{
    if(!tilesOrderedById[i*9+j].classList.contains('error'))
    {
        tilesOrderedById[i*9+j].classList.add('error');
    }
    if(tilesOrderedById[i*9+j].classList.contains('normal'))
    {
        tilesOrderedById[i*9+j].classList.remove('normal');
    }
} 

const validateAndApplyErrors = () =>{
//Rows
let errorsCounter = 0;
let emptyCellCounter = 0;

let wholeBoardErrorsArray = new Array(9);
for(let i=0;i<9;i++)
{
    wholeBoardErrorsArray[i] = new Array(9).fill(0);
}

for(let i=0; i<9; i++)
{
    let errorsArray = new Array(10).fill(0);
    for(let j=0; j<9;j++)
    {
        
        for(let k=j+1; k<9; k++)
        {

           
            if(finalArr[i][j] === 0 || finalArr[i][k] === 0)
            {
                emptyCellCounter++;
                continue;
            }

            if(finalArr[i][j] === finalArr[i][k])
            {
                wholeBoardErrorsArray[i][j]++;
                wholeBoardErrorsArray[i][k]++;
            }
           

            // if(finalArr[i][j] === finalArr[i][k])
            // {
            //     console.log(i,j,k); 
               
            //     errorsCounter++;
            //     errorsArray[finalArr[i][j]]++;
            //     applyErrorToCells(i,j);
            //     applyErrorToCells(i,k);
            // }
            // else
            // {
                
            //     if(errorsArray[finalArr[i][j]] === 0)
            //     {
            //         removeErrorToCells(i,j);
            //     }
            //     if(errorsArray[finalArr[i][k]] === 0)
            //     {
            //         removeErrorToCells(i,k);
            //     }            
            // }
        {
        }
        }
        
       
    }   
}

//columns
for(let i=0; i<9; i++)
{
    let errorsArray = new Array(10).fill(0);
    for(let j=0; j<9;j++)
    {
        
        for(let k=j+1; k<9; k++)
        {

            
            if(finalArr[j][i] === 0 || finalArr[k][i] === 0)
            {
                emptyCellCounter++;
                continue;
            }
            if(finalArr[j][i] === finalArr[k][i])
            {
                console.log(finalArr);
                console.log(i,j,k);
                wholeBoardErrorsArray[j][i]++;
                wholeBoardErrorsArray[k][i]++;
            }
           
       
        }
        
       
    }   
}

//boxes
boxes.forEach(box => {
    let boxId = box.id.slice(3,4);
    let counter = 0;
    let rangeMax = boxId*9;
    let rangeMin = boxId*9 - 9;
    let arr = new Array(10).fill(0);
    let boxTiles = box.childNodes;
    let errorsArray = new Array(10).fill(0);

    for(let i=0; i<boxTiles.length; i++)
    {
        if(i%2==0)
        {
            continue;
        }
       
        let indexI = boxTiles[i].getAttribute("id");
        let x = Math.floor(indexI/9);
        let y = indexI%9;
        if(finalArr[x][y] === 0)
        {
            emptyCellCounter++;
            continue;
        }
        for(let j=i+1; j<boxTiles.length; j++)
        {
            if(j%2==0)
                continue;

            if(boxTiles[j].innerHTML === "")
            {
                continue;
            }
///////////////////////
            let indexJ = boxTiles[j].getAttribute("id");
            let x1 = Math.floor(indexJ/9);
            let y2 = indexJ%9;
            let y = indexI%9;
        if(finalArr[x1][y2] === 0)
        {
            emptyCellCounter++;
            continue;
        }
            if(finalArr[x][y] === finalArr[x1][y2])
            {
               
                wholeBoardErrorsArray[x][y]++;
                wholeBoardErrorsArray[x1][y2]++;
                
            }    
            }

            
        
    }
    // tiles.forEach(tile => {
    //     if(parseInt(tile.id) >= rangeMin && parseInt(tile.id)<rangeMax && tile.innerHTML !== ""){
    //         let number = parseInt(tile.innerHTML);
    //         arr[number]++;
    //         if (arr[number] !== 1 && tile.classList.contains('tile-pen')) {

    //             if(tile.classList.contains('normal'))
    //                 tile.classList.remove('normal');
    //             if(!tile.classList.contains('error'))
    //                 tile.classList.add('error');

    //         }
    //          else {
    //             if(tile.classList.contains('errpr'))
    //                 tile.classList.remove('error');

    //             if(!tile.classList.contains('normal'))
    //                 tile.classList.add('normal');

    //                 if(tile.classList.contains('tile-pen'))
    //                      counter++;
    //         }

    //     }
           
    // });
    
});
for(let i=0; i<wholeBoardErrorsArray.length; i++)
{
    for(let j=0; j<wholeBoardErrorsArray[i].length; j++)
    {
        if(wholeBoardErrorsArray[i][j] !== 0)
        {
            errorsCounter++;
            applyErrorToCells(i,j);
        }
        else
        {
            removeErrorToCells(i,j);
        }
    }
}


if(errorsCounter ===0 && emptyCellCounter === 0)
{
   endOfRun();
}
}

const clearFinalArr = () =>{
    for(let i=0; i<9; i++)
    {
        for(let j=0; j<9;j++)
        {
            finalArr[i][j] = 0;
        }
    }
}

const endOfRun = () =>{
    runEndTileAnimation();
    stopTimer();
   clearFinalArr();
}

function handleBoxClick(e){

    validateAndApplyErrors();



}

let intervalID = null;

const runEndTileAnimation = () =>{
    intervalID = setInterval(() => {
        if (counter>= tiles.length) {
            stopAnimation();
        }

        tiles[counter].setAttribute("contentEditable", "false");
        tiles[counter]?.classList.add("tile-completed-sudoku");

        counter++;
    }, 10); 
}


const runCompleted = () => {

    checkamrk.classList.remove('transparent');
    checkamrkImg.classList.add('image-left-to-right');
    setTimeout(function() { 
        checkamrk.classList.add('transparent');
    checkamrkImg.classList.remove('image-left-to-right'); }, 4000);
    let counter = 0;
        setTimeout(runEndTileAnimation, 2000);
    
   
}

const stopAnimation = () => {

    clearInterval(intervalID);
    counter=0;
}


function handleTileInput(e){ 
    
    if(penSwitcher.checked)
    {
        if(this.classList.contains('tile-pencil')){
            this.classList.remove('tile-pencil');
        }
        if(!this.classList.contains('tile-pen')){
            this.classList.add('tile-pen');
        }
        if( isNaN(e.data))
        {
            this.innerHTML = this.innerHTML.replace(e.data, "");
            return;
        }
         
        this.innerHTML = e.data;
        let num = parseInt(this.innerHTML);
        let ind = this.getAttribute("id");
        finalArr[Math.floor(ind/9)][ind%9] = num;
    }
    else
    {
        if(this.classList.contains('tile-pen')){
            this.classList.remove('tile-pen');
            this.innerHTML='';
        }
        if(!this.classList.contains('tile-pencil')){
            this.classList.add('tile-pencil');
        }


        if( isNaN(e.data))
        {
            const pos = this.innerHTML.indexOf(e.data);
            if(pos!== -1 )
            {
                this.innerHTML = this.innerHTML.replace(e.data, '');
            }
        }
        else
        {
            let arrCount = new Array(9).fill(0);
            for(let i=0; i<9; i++)
            {
                if(this.innerHTML.includes(i))
                {
                    arrCount[i]++;
                }
            }

            let finalString = "";
            for(let i=0; i<9;i++)
            {
                if(arrCount[i]>0)
                {
                    finalString += i.toString();
                }
            }
            this.innerHTML = finalString;
        }
    }


}

    

function handleTileFocus(e){  
    this.focus();
}

const setUp = () =>{
    clearSudoku();
    fillSudoku();
}

let timerInterval = null;

const startTimer = () =>{
    seconds = 0;
    minutes = 0;
    hours = 0;
    timerInterval = setInterval(updateTimer, 1000);
}

const stopTimer = () =>{
    clearInterval(timerInterval);
    timerInterval = null;
}

const updateTimerText = () =>{
    timerHours.innerHTML = "";
    timerMinutes.innerHTML = "";
    timerSeconds.innerHTML = "";
    
    if(hours<10)
    {
        timerHours.innerHTML+="0";
    }
    timerHours.innerHTML += hours;
    if(minutes<10)
    {
        timerMinutes.innerHTML+="0";
    }
    timerMinutes.innerHTML += minutes;
    if(seconds<10)
    {
        timerSeconds.innerHTML+="0";
    }
    timerSeconds.innerHTML += seconds;
    }


const updateTimer = () =>{
seconds++;
if(seconds === 60)
{
    seconds = 0;
    minutes++;
    if(minutes === 60)
    {
        hours++;
        minutes = 0;
    }
    
}
updateTimerText();
}

window.onload = setUp;