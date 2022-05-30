const chessBoard = document.querySelector(".chess-board");
const boardLength = 8;
let possibleMoves = [];
let conquerMoves = [];
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


function createBoard() {
  for (let i = 0; i < boardLength; i++) {
    for (let j = 0; j < boardLength; j++) {
      const boardBlock = document.createElement("div");
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
        boardBlock.setAttribute("data-piece", "whiteRook");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }

      if (boardId === 0) {
        boardBlock.setAttribute("data-piece", "blackBishop");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','black')
      }
      if (boardId === 6) {
        boardBlock.setAttribute("data-piece", "blackPawn");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','black')
      }

      if (boardId === 8) {
        boardBlock.setAttribute("data-piece", "blackPawn");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','black')
      }
      if (boardId === 55) {
        boardBlock.setAttribute("data-piece", "whitePawn");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }
      if (boardId === 10) {
        boardBlock.setAttribute("data-piece", "whiteRook");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }
      if (boardId === 44) {
        boardBlock.setAttribute("data-piece", "whiteKnight");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }
      if (boardId === 12) {
        boardBlock.setAttribute("data-piece", "whiteQueen");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }
      if (boardId === 21) {
        boardBlock.setAttribute("data-piece", "whiteKing");
        boardBlock.setAttribute("filled", "");
        boardBlock.setAttribute('color','white')
      }

      piecesEvents(boardBlock);
      boardId++;
    }
  }
}
createBoard();

function piecesEvents(boardBlock) {
  boardBlock.addEventListener("mouseover", (e) => {

    if (!e.target.classList.contains("possible"))
      e.target.addEventListener("click", selectingPiece);
  });

  boardBlock.addEventListener("mouseleave", (e) => {
    e.target.removeEventListener("click", selectingPiece);
  });
}



let selectingPiece = function selectingPieceFunc(event) {
  let selectedBlock = event.target;

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


// For the Pawn 

function pawnPossibleMoves(selectedBlock, selectedPieceType) {
    selectedBlockId = selectedBlock.getAttribute("data-id");
    selectedBlockId = parseInt(selectedBlockId);
    let nextBlock;
    let currentColumn;
    if (selectedPieceType === "whitePawn") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId - boardLength}"]`
     
        );
  if(nextBlock.hasAttribute('filled'))
  return;
      possibleMoves.push(nextBlock);
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
    pawnConquerPossibleMoves(nextBlock,currentColumn)
    }
  
    if (selectedPieceType === "blackPawn") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId + boardLength}"]`
      );
      if(nextBlock.hasAttribute('filled'))
      return;
      possibleMoves.push(nextBlock);
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
      pawnConquerPossibleMoves(nextBlock,currentColumn)
    }
  
    addingEventsInPossibleMoves(possibleMoves);
  }
  

function pawnConquerPossibleMoves(nextBlock,currentColumn){
if(currentColumn>0&&nextBlock.previousElementSibling.hasAttribute('filled')){
    possibleMoves.push(nextBlock.previousElementSibling)
    nextBlock.previousElementSibling.setAttribute('conquer','')
}
if(currentColumn<7&&nextBlock.nextElementSibling.hasAttribute('filled')){
    possibleMoves.push(nextBlock.nextElementSibling)
    nextBlock.nextElementSibling.setAttribute('conquer','')
}
}
//For the Kinght

function knightPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")
  let initialrows = parseInt(currentRow)
  let  initialcolumn = lettersIn[currentColumn]
let rows = parseInt(currentRow)+1
let  column = lettersIn[currentColumn]+2


while(rows<initialrows+3&&column>=initialcolumn){

  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);

    if(!nextBlock)
    {
      rows++;
      column--;
      continue;
    }
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      
        nextBlock.setAttribute('conquer','')
      
    }
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
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      
        nextBlock.setAttribute('conquer','')
        
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
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      
        nextBlock.setAttribute('conquer','')
      
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
  if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
  {
    
      nextBlock.setAttribute('conquer','')
    
  }
  possibleMoves.push(nextBlock)
  rows--;
  column++;

}


addingEventsInPossibleMoves(possibleMoves)

}





// For the Bishop


function bishopPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")

let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]

while(rows<8&&column>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
    possibleMoves.push(nextBlock)
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow+1)
        nextBlock.setAttribute('conquer','')
        break;
    }
    rows++;
    column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]

while(rows<8&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)
  if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
  {
    if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow+1)
      nextBlock.setAttribute('conquer','')
      break;
  }
  rows++;
  column++;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column>=0){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)
  if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
  {
    if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow-1)
      nextBlock.setAttribute('conquer','')
      break;
  }
  rows--;
  column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  possibleMoves.push(nextBlock)
  if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
  {
    if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow-1)
      nextBlock.setAttribute('conquer','')
      break;
  }
  rows--;
  column++;

}



   possibleMoves = possibleMoves.filter(item=>item!==currentBlock)

addingEventsInPossibleMoves(possibleMoves)
}

// For the Rook 

function rookPossibleMoves(currentBlock){


   let currentRow = currentBlock.getAttribute("data-row")
   let currentColumn = currentBlock.getAttribute("data-column")


let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]
let currentPieceColumn = column
while(rows<8){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
    possibleMoves.push(nextBlock)
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow+1)
        nextBlock.setAttribute('conquer','')
        break;
    }
    rows++;

}
rows = parseInt(currentRow)

while(rows>=0){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
    possibleMoves.push(nextBlock)
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||rows===currentPieceRow-1)
        nextBlock.setAttribute('conquer','')
        break;
    }
    rows--;

}


while(column<8){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
    possibleMoves.push(nextBlock)
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||column===currentPieceColumn+1)
        nextBlock.setAttribute('conquer','')
        break;
    }
    column++;

}
column = lettersIn[currentColumn]

while(column>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
    possibleMoves.push(nextBlock)
    if(nextBlock.hasAttribute("filled")&&currentPiece!==nextBlock)
    {
      if(!(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")||column===currentPieceColumn-1)
        nextBlock.setAttribute('conquer','')
        break;
    }
    column--;

}



   possibleMoves = possibleMoves.filter(item=>item!==currentBlock)

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





//same in all pieces

function addingEventsInPossibleMoves(possibleMoves) {

 
if(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing"){
let currentRow = currentPiece.getAttribute('data-row')
let currentColumn = currentPiece.getAttribute('data-column')
currentRow = parseInt(currentRow)
currentColumn = lettersIn[currentColumn]

  possibleMoves = possibleMoves.filter(item=>{
    let rowValue = item.getAttribute('data-row')
    let columnValue = item.getAttribute('data-column')
    
    rowValue = parseInt(rowValue)
    columnValue = lettersIn[columnValue]
    if(currentRow===rowValue-1||currentRow===rowValue+1||currentColumn===columnValue+1||currentColumn===columnValue-1){
      return item
    }
    
  
  })

  
}


  possibleMoves.forEach((item) => {

    item.addEventListener("click", pieceMovingToNextBlock);
    item.classList.add("possible");
  });
}



let pieceMovingToNextBlock = function pieceMovingToNextBlockFunc
(event) {
  let selectedPieceType = currentPiece.getAttribute("data-piece");
  event.target.classList.remove("possible");

  event.target.setAttribute("data-piece", `${selectedPieceType}`);
  currentPiece.removeAttribute("data-piece");
  currentPiece.removeAttribute("filled");
resetPossibleMoves()
event.target.setAttribute('filled','')
  event.target.addEventListener("click", selectingPiece);

};




function resetPossibleMoves() {

  possibleMoves.forEach((item) => {
    item.classList.remove("possible");
    item.removeAttribute('conquer')
    item.removeEventListener("click", pieceMovingToNextBlock);
  });
  possibleMoves = [];
    
}
