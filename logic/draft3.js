const chessBoard = document.querySelector(".chess-board");
const boardLength = 8;
let possibleMoves = [];
let conquerMoves = [];
let currentDraggingBlockWidth;
let isDragging = false;
let currentHoveringBlock ;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const lettersIn = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
};
let boardId = 0;
let currentPiece = 0;
let dx= 0;
let dy =0;
let draggedItem;
let selectingPiece = function selectingPieceFunc(event) {
  let selectedBlock = event.target;
  isDragging = true
  console.log("runnign start")
  currentDraggingBlockWidth = selectedBlock.offsetWidth;

  dx = event.clientX - selectedBlock.getBoundingClientRect().x;
  dy = event.clientY - selectedBlock.getBoundingClientRect().y;
  draggedItem =selectedBlock
  selectedBlock.style.position = 'absolute';
  console.log({selectedBlock,dx,dy,currentDraggingBlockWidth})
  if (currentPiece !== selectedBlock && currentPiece !== 0) {
    resetPossibleMoves();
  }

  let selectedPieceType = selectedBlock.getAttribute("data-piece");

  if (currentPiece === selectedBlock) return;


  currentPiece = selectedBlock;
 

  if (selectedPieceType === "whitePawn" || selectedPieceType === "blackPawn") {
    pawnPossibleMoves(selectedBlock, selectedPieceType);
    return;
  }
 
if(selectedPieceType)
  {selectedPieceType = selectedPieceType.replace('white','').replace('black','');
  }

  selectedBlock = selectedBlock.parentElement;
  console.log(selectedBlock)
  if(selectedPieceType === 'Rook'){
      rookPossibleMoves(selectedBlock)
  }
  if(selectedPieceType === 'Bishop'){
    bishopPossibleMoves(selectedBlock)
}

if(selectedPieceType === 'Knight'){
  knightPossibleMoves(selectedBlock)
}

if(selectedPieceType === 'Queen'){
  queenPossibleMoves(selectedBlock)
}
if(selectedPieceType === 'King'){
  kingPossibleMoves(selectedBlock)
}

};


function createBoard() {
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      const boardBlock = document.createElement("article");
      boardBlock.setAttribute("data-id", boardId);
      boardBlock.setAttribute("data-rc", `${letters[j]}${i }`);
      boardBlock.setAttribute("data-column", `${letters[j]}`);
      boardBlock.setAttribute("data-row", `${i }`);

      if ((i % 2 === 0 && j % 2 == 0) || (i % 2 === 1 && j % 2 == 1)) {
        boardBlock.classList.add("whiteBlock");
      } else {
        boardBlock.classList.add("blackBlock");
      }

      chessBoard.append(boardBlock);

      if (boardId === 49) {
     createPiece('whiteRook','white',boardBlock)
      }

      if (boardId === 1) {

        createPiece('blackRook','black',boardBlock)    
      }
      if (boardId === 6) {
        createPiece('blackBishop','black',boardBlock)  
      }

      if (boardId === 8) {
        createPiece('blackKnight','black',boardBlock)  
      }
      if (boardId === 45) {
        createPiece('blackPawn','black',boardBlock)  
      }
      if (boardId === 10) {
        createPiece('blackPawn','black',boardBlock)  
      }
      if (boardId === 44) {
        createPiece('whiteBishop','white',boardBlock)  
      }
      if (boardId === 12) {
  
      }
      if (boardId === 20) {
        createPiece('blackQueen','black',boardBlock) 
      }
      if (boardId === 27) {
   
      }
      if (boardId === 14) {
        createPiece('whiteKing','white',boardBlock) 
      }

      piecesEvents(boardBlock);
      boardId++;
    }
  }
}
createBoard();


function createPiece(pieceType,pieceColor,boardBlock){
  const actualPiece = document.createElement('div')
  actualPiece.setAttribute("data-piece", pieceType);
  actualPiece.setAttribute("filled", "");
  actualPiece.setAttribute('color',pieceColor)
  // actualPiece.setAttribute('draggable','true')
  boardBlock.appendChild(actualPiece)
}





function piecesEvents(boardBlock) {
  if(boardBlock.firstChild)
  boardBlock.addEventListener('mousedown', selectingPiece)

  boardBlock.addEventListener("mouseover", (e) => {
    if(isDragging === false)
    return;
    // e.preventDefault();
 console.log("running")
    // return;
    let leftX = e.clientX -dx ;
    let topY = e.clientY -dy;

    draggedItem.style.width = `${currentDraggingBlockWidth}px`
    draggedItem.style.height = `${currentDraggingBlockWidth}px`
   
    draggedItem.style.left = `${leftX}px`
    draggedItem.style.top = `${topY}px`
 

      if(e.target.hasAttribute('filled'))
      { currentHoveringBlock = e.target.parentElement;
    return
      }
      
      currentHoveringBlock =e.target;

      console.log(currentHoveringBlock)

   //
        // boardBlock.addEventListener('dragover',draggingPiece)
      
  });

  // boardBlock.addEventListener("dragend", (e) => {
    // e.target.removeEventListener("click", selectingPiece);



  
      // e.target.removeEventListener('dragover',draggingPiece)
    

  // });
}

// let draggingPiece = function draggingPieceFunc(event){

// }



// For the Pawn 

function pawnPossibleMoves(selectedBlock, selectedPieceType) {
    selectedBlockId = selectedBlock.parentElement.getAttribute("data-id");
    selectedBlockId = parseInt(selectedBlockId);
    possibleMoves.push(selectedBlock.parentElement)
    let nextBlock;
    console.log({selectedBlockId})
    let currentColumn;
    if (selectedPieceType === "whitePawn") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId - boardLength}"]`
     
        );
        console.log({nextBlock})
  if(nextBlock.firstChild)
  return;
      possibleMoves.push(nextBlock);
  
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
    pawnConquerPossibleMoves(nextBlock,currentColumn)
    }
  
    if (selectedPieceType === "blackPawn") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId + boardLength}"]`
      );
      if(nextBlock.firstChild)
      return;
      possibleMoves.push(nextBlock);
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
      pawnConquerPossibleMoves(nextBlock,currentColumn)
    }
  
    addingEventsInPossibleMoves(possibleMoves);
  }
  

function pawnConquerPossibleMoves(nextBlock,currentColumn){


  
if(currentColumn>0&&nextBlock.previousElementSibling.firstChild){
  console.log({nextBlock,currentPiece})
  if(nextBlock.previousElementSibling.firstChild.getAttribute('color')===currentPiece.getAttribute('color'))

  return 
  possibleMoves.push(nextBlock.previousElementSibling)
    nextBlock.previousElementSibling.setAttribute('conquer','')
}
if(currentColumn<7&& nextBlock.nextElementSibling.firstChild){

  if(nextBlock.nextElementSibling.firstChild.getAttribute('color') === currentPiece.getAttribute('color'))
  return
    possibleMoves.push(nextBlock.nextElementSibling)
    nextBlock.nextElementSibling.setAttribute('conquer','')
}

}


function pawnUpgrade(currentBlock){
  console.log('running')
  let container = document.querySelector('.piece-selection-container')  
  let containerWrapper = document.querySelector('.container-wrapper')
  let options = container.querySelectorAll('.piece-option')
  let currentPieceColor = currentBlock.firstChild.getAttribute('color')
container.style.display = "block"
containerWrapper.style.display = 'block'
let selectedPieceType = new Promise( (resolve,reject)=>{
 
  
  options.forEach(option=>{
    
    option.addEventListener('click',e=>{
     let upgradePieceType =  e.target.getAttribute('data-piece')
     console.log(upgradePieceType)
     if(upgradePieceType)
  resolve(upgradePieceType)
  else{
    reject('Error')
  }
    })
  })



});

selectedPieceType.then((message) => {
  let upgradePieceType= currentPieceColor + message;

  currentBlock.firstChild.setAttribute('data-piece',`${upgradePieceType}`) 
  let container = document.querySelector('.piece-selection-container') 
  let containerWrapper = document.querySelector('.container-wrapper')



  let  containerClone = container.cloneNode(true);
  container.replaceWith(containerClone);
  container =document.querySelector('.piece-selection-container')
container.style.display = 'none'
containerWrapper.style.display = 'none'

 
 
})
selectedPieceType.catch((error)=>{
  console.log(error)
})
}




//For the Kinght

function knightPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")
  let initialrows = parseInt(currentRow)
  let  initialcolumn = lettersIn[currentColumn]
let rows = parseInt(currentRow)+1
let  column = lettersIn[currentColumn]+2

let currentPieceType =  currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
console.log({currentPieceType})
while(rows<initialrows+3&&column>=initialcolumn){

  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
console.log({column,rows})
console.log({nextBlock})
if(!nextBlock)
    {
      rows++;
      column--;
      continue;
    }
    if(nextBlock.firstChild)
    {


        nextBlock.setAttribute('conquer','')
console.log({nextBlock},"checking")
        let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
        let nextPieceColor = nextBlock.firstChild.getAttribute('color')
        if((nextPieceType === 'Knight')&& currentBlock.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King")
         currentBlock.setAttribute('checkmate','')
        
      
    }
    console.log("pushing",nextBlock)
    possibleMoves.push(nextBlock)
    rows++;
    column--;

}

 rows = parseInt(currentRow)+1
column = lettersIn[currentColumn]-2


while(rows<initialrows+3&&column<=initialcolumn){

  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
 
    if(!nextBlock)
    {
      rows++;
      column++;
      continue;
    }
    if(nextBlock.firstChild)
    {
    
      
      

        nextBlock.setAttribute('conquer','')
        let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
        let nextPieceColor = nextBlock.firstChild.getAttribute('color')
        if((nextPieceType === 'Knight')&& currentBlock.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King")
         currentBlock.setAttribute('checkmate','')
        
    }
    possibleMoves.push(nextBlock)
    rows++;
    column++;

}

 rows = parseInt(currentRow)-1
  column = lettersIn[currentColumn]+2

while(rows>initialrows-3&&column>=initialcolumn){

    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
   
    if(!nextBlock)
    {
      rows--;
      column--;
      continue;
    }
    if(nextBlock.firstChild)
    {
      

      nextBlock.setAttribute('conquer','')
      
      let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
      let nextPieceColor = nextBlock.firstChild.getAttribute('color')
      if((nextPieceType === 'Knight')&& currentBlock.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')
      
    }
    possibleMoves.push(nextBlock)
    rows--;
    column--;

}


rows = parseInt(currentRow)-1
column = lettersIn[currentColumn]-2

while(rows>initialrows-3&&column<=initialcolumn){


  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
 
  if(!nextBlock)
  {
    rows--;
    column++;
    continue;
  }
  if(nextBlock.firstChild)
  {
    

    nextBlock.setAttribute('conquer','')
    
    let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
    let nextPieceColor = nextBlock.firstChild.getAttribute('color')
    if((nextPieceType === 'Knight')&& currentBlock.getAttribute('color') !== nextPieceColor)
    if(currentPieceType === "King")
     currentBlock.setAttribute('checkmate','')
  }
  possibleMoves.push(nextBlock)
  rows--;
  column++;

}

// possibleMoves = possibleMoves.filter(item=>{
    
//   if(!(item.getAttribute('color') === currentBlock.getAttribute('color')))
//   {
//   return item
//   }
//   else{
//     item.removeAttribute('conquer');
//     return
//   }
// })
console.log({possibleMoves})
possibleMoves.push(currentBlock)

addingEventsInPossibleMoves(possibleMoves)

}





// For the Bishop


function bishopPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")

let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]

let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');


while(rows<8&&column>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
    possibleMoves.push(nextBlock)
  
    if(currentBlock!==nextBlock)
    { 
      
      if(nextBlock.firstChild){
      nextBlock = nextBlock.firstChild

      let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
      let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
      let nextPieceColor = nextBlock.getAttribute('color')
  
  
      if(rows===currentPieceRow+1 && (nextPieceType === "King"||(nextPieceTypeInitial === "whitePawn" && nextPieceColor !== currentBlock.firstChild.getAttribute('color')))){
        if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
  currentBlock.setAttribute('checkmate','') }  
      if(!(currentPieceType === "King"))
        nextBlock.parentElement.setAttribute('conquer','')
        if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King")
         currentBlock.setAttribute('checkmate','')
        break;
    }}
    rows++;
    column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]

while(rows<8&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  {  if(nextBlock.firstChild){
    nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow+1 &&(nextPieceTypeInitial === "whitePawn" && nextPieceColor !== currentBlock.firstChild.getAttribute('color'))){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
      currentBlock.setAttribute('checkmate','')   
    
    }
    
    if(!(currentPieceType === "King"))
      nextBlock.parentElement.setAttribute('conquer','')
      if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')
      break;
  }}
  rows++;
  column++;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column>=0){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  {
    if(nextBlock.firstChild)
    {
      nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow-1 && (nextPieceTypeInitial === "blackPawn" && nextPieceColor !== currentBlock.firstChild.getAttribute('color'))){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
      currentBlock.setAttribute('checkmate','')   
    }
    
    if(!(currentPieceType === "King"))
      nextBlock.parentElement.setAttribute('conquer','')
      if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')
      break;
  }}
  rows--;
  column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)
  
  if(currentBlock!==nextBlock)
  {  if(nextBlock.firstChild){
    nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow-1 && (nextPieceTypeInitial === "blackPawn" && nextPieceColor !== currentBlock.getAttribute('color'))){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
      currentBlock.setAttribute('checkmate','')   
    }
    
    if(!(currentPieceType === "King"))
      nextBlock.parentElement.setAttribute('conquer','')

      if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')
      break;
  }}
  rows--;
  column++;

}


possibleMoves = possibleMoves.filter(item=>{


  if(!item.firstChild||item ===currentBlock)
  return item
if(!(item.firstChild.getAttribute('color') === currentBlock.firstChild.getAttribute('color')))
{
return item
}
else{
  item.removeAttribute('conquer');
  return
}
})




addingEventsInPossibleMoves(possibleMoves)
}

// For the Rook 

function rookPossibleMoves(currentBlock){


   let currentRow = currentBlock.getAttribute("data-row")
   let currentColumn = currentBlock.getAttribute("data-column")
   let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');
   console.log(currentPieceType)
let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]
let currentPieceColumn = column

while(rows<8){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
  

    if(currentBlock!==nextBlock)
    {  possibleMoves.push(nextBlock)
      if(nextBlock.firstChild)
      {
      nextBlock = nextBlock.firstChild
     
      
      let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
      let nextPieceColor = nextBlock.getAttribute('color')
if(rows===currentPieceRow+1 && nextPieceType === "King")
currentBlock.firstChild.setAttribute('checkmate','')      
      if(!(currentPieceType === "King" ))
        nextBlock.parentElement.setAttribute('conquer','')


    if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
    if(currentPieceType === "King")
     currentBlock.setAttribute('checkmate','')

  
        break;
    }}
    rows++;

}
rows = parseInt(currentRow)

while(rows>=0){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
    
  
    if(currentBlock!==nextBlock)
    {   possibleMoves.push(nextBlock)
      if(nextBlock.firstChild){

        nextBlock = nextBlock.firstChild
      let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')
      if(rows===currentPieceRow-1 && nextPieceType === "King")
      currentBlock.setAttribute('checkmate','')  
     
      if(!(currentPieceType==="King"))
      
        nextBlock.parentElement.setAttribute('conquer','')



   
        if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King")
         currentBlock.setAttribute('checkmate','')

      
        break;
    }}
    rows--;

}

column = lettersIn[currentColumn]

while(column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
 

  if(currentBlock!==nextBlock)
  {     possibleMoves.push(nextBlock)
    if(nextBlock.firstChild){

      nextBlock = nextBlock.firstChild
    let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
  let nextPieceColor = nextBlock.getAttribute('color')
  if(column===currentPieceColumn+1 && nextPieceType === "King")
    currentBlock.setAttribute('checkmate','')  
   
    if(!(currentPieceType==="King"))
    
      nextBlock.parentElement.setAttribute('conquer','')



 
      if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')

    
      break;
  }}
  column++;

}

column = lettersIn[currentColumn]
while(column>=0){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  { 
    
    if(nextBlock.firstChild){

      nextBlock = nextBlock.firstChild
    let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
  let nextPieceColor = nextBlock.getAttribute('color')
  if(column===currentPieceColumn-1 && nextPieceType === "King")
    currentBlock.setAttribute('checkmate','')  
   
    if(!(currentPieceType==="King"))
    
      nextBlock.parentElement.setAttribute('conquer','')



 
      if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
       currentBlock.setAttribute('checkmate','')

    
      break;
  }}
  column--;

}

possibleMoves = possibleMoves.filter(item=>{


    if(!item.firstChild||item ===currentBlock)
    return item
  if(!(item.firstChild.getAttribute('color') === currentBlock.firstChild.getAttribute('color')))
  {
  return item
  }
  else{
    item.removeAttribute('conquer');
    return
  }
})

addingEventsInPossibleMoves(possibleMoves)
}



// For the Queen

function queenPossibleMoves(currentBlock){

  bishopPossibleMoves(currentBlock)
  rookPossibleMoves(currentBlock)
}

// For the King

function kingPossibleMoves(currentBlock){
queenPossibleMoves(currentBlock)

}


function isKingInDanger(){
  let blackKing = document.querySelector(`[data-piece="blackKing"]`)
  let whiteKing = document.querySelector(`[data-piece="whiteKing"]`)

// queenPossibleMoves(whiteKing)
// knightPossibleMoves(whiteKing)
queenPossibleMoves(blackKing)
knightPossibleMoves(blackKing)
}



//same in all pieces

function addingEventsInPossibleMoves(possibleMoves) {


if(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing"){
let currentRow = currentPiece.parentElement.getAttribute('data-row')
let currentColumn = currentPiece.parentElement.getAttribute('data-column')
currentRow = parseInt(currentRow)
currentColumn = lettersIn[currentColumn]

  possibleMoves = possibleMoves.filter(item=>{
    let rowValue = item.getAttribute('data-row')
    let columnValue = item.getAttribute('data-column')
    
    rowValue = parseInt(rowValue)
    columnValue = lettersIn[columnValue]
    if(currentRow===rowValue-1||currentRow===rowValue+1||currentColumn===columnValue+1||currentColumn===columnValue-1||(currentColumn===columnValue&&currentRow==rowValue)){
      return item
    }
    
  
  })

  
}


  possibleMoves.forEach((item) => {

    item.addEventListener("mouseup", pieceMovingToNextBlock);
    item.classList.add("possible");
  });
}



let pieceMovingToNextBlock = function pieceMovingToNextBlockFunc
(event) {
let isEmpty = true;
isDragging = false;

if(currentHoveringBlock.firstChild === currentPiece)
return
  if((currentHoveringBlock.classList.contains('possible'))||(currentHoveringBlock.parentElement.classList.contains('possible'))){  
    
  
    
    if(currentHoveringBlock.firstChild)
    isEmpty = false;
   

let  courrentPieceClone = currentPiece.cloneNode(true);


event.target.parentElement.removeChild(currentPiece) 
resetPossibleMoves()
if(isEmpty=== true)
{currentHoveringBlock.addEventListener("mousedown", selectingPiece)
currentHoveringBlock.appendChild(courrentPieceClone)

}
else{
currentHoveringBlock.appendChild(courrentPieceClone)
currentHoveringBlock.addEventListener("mousedown", selectingPiece)

currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)

console.log(currentHoveringBlock.firstChild)
}

if((event.target.getAttribute('data-piece') === 'whitePawn' || event.target.getAttribute('data-piece') === 'blackPawn') &&( currentHoveringBlock.getAttribute('data-row') === '0' || currentHoveringBlock.getAttribute('data-row') === '7'))
{
pawnUpgrade(currentHoveringBlock)

}
// pawn upgrade condition

  // isKingInDanger()
  // resetPossibleMoves()
}

};

 


function resetPossibleMoves() {

  possibleMoves.forEach((item) => {
    item.classList.remove("possible");
    item.removeAttribute('conquer')
    item.removeEventListener("mouseup", pieceMovingToNextBlock);
    if(!item.firstChild)
    item.removeEventListener("mousedown", selectingPiece)
  });
 
  possibleMoves = [];
 
}
