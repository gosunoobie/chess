const chessBoard = document.querySelector(".chess-board");
const boardLength = 8;
let possibleMoves = [];
let conquerMoves = [];
let currentDraggingBlockWidth;
let draggedItemClone;
let currentHoveringBlock ;
let isWhiteKingInDanger = false;
let isBlackKingInDanger = false;
let isWhitePlayerTurn =  true;
let attackingBlocks = [];
let isSimilar = false;
let isEnpassant = false;
let enpassingBlock ;
let enpassantableBlock ;
let enpassantTurn ;
let castlingBlocks ;
let isCastlingPossible = false;
let castlingDistance ;
let isCastlingDone = false;
let isCheckingIllegalMoves = false;
let whiteIllegalMoves = []
let blackIllegalMoves = []
let kingMoves = [];
let isGettingKingMoves = false;
let isCheckmate = false;

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
let currentPieceBlock = 0;
let nextPieceBlock = 0 ;
let dx= 0;
let dy =0;
let draggedItem;
let selectingPiece = function selectingPieceFunc(event) {
  let selectedBlock = event.target;
if(selectedBlock.getAttribute('color')==='black' && isWhitePlayerTurn === true)
{return;

}


if(selectedBlock.getAttribute('color')==='white' && isWhitePlayerTurn === false)
{return;

}


//   currentDraggingBlockWidth = selectedBlock.offsetWidth;
// console.log(selectedBlock.parentElement,"king position")


// selectedBlock.parentElement.removeAttribute('checkmate')
// selectedBlock.parentElement.setAttribute("mf",'')
  // cloning the piece to drag
  dx = event.clientX - selectedBlock.getBoundingClientRect().x;
  dy = event.clientY - selectedBlock.getBoundingClientRect().y;
  draggedItem =selectedBlock
  
   draggedItemClone = draggedItem.cloneNode(true);
   draggedItemClone.setAttribute('noevents','')
   selectedBlock.parentElement.appendChild(draggedItemClone)
  draggedItemClone.style.position = 'absolute';
  let leftX = event.clientX -dx ;
  let topY = event.clientY -dy;
  draggedItemClone.style.left = `${leftX}px`
  draggedItemClone.style.top = `${topY}px`
  draggedItem.style.opacity = '0'
  event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);





  if (currentPiece !== selectedBlock && currentPiece !== 0) {
    resetPossibleMoves();
  }

  let selectedPieceType = selectedBlock.getAttribute("data-piece");
 let selectedPieceColor  = selectedBlock.getAttribute('color')
  if (currentPiece === selectedBlock) return;


  currentPiece = selectedBlock;
 currentPieceBlock = selectedBlock.parentElement;


  if (selectedPieceType === "whitePawn" || selectedPieceType === "blackPawn") {
    pawnPossibleMoves(selectedBlock);
    return;
  }
 
if(selectedPieceType)
  {selectedPieceType = selectedPieceType.replace('white','').replace('black','');
  }

  selectedBlock = selectedBlock.parentElement;

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
if(isWhiteKingInDanger === true || isBlackKingInDanger === true)
{isAttackDefendable()
return;
}
isWhiteKingInDanger = false;
isBlackKingInDanger = false;




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
      boardBlock.addEventListener('dragleave',(e)=>{
      e.target.removeAttribute('hovering')
      })
      boardBlock.addEventListener('dragend',(e)=>{
    
      if(currentHoveringBlock)
        currentHoveringBlock.removeAttribute('hovering')
        })
  

      chessBoard.append(boardBlock);

   

      if (boardId === 0) {

        createPiece('blackRook','black',boardBlock)    
      }
      
      if (boardId === 1) {

        createPiece('blackKnight','black',boardBlock)    
      }
      
      if (boardId === 2) {

        createPiece('blackBishop','black',boardBlock)    
      }
      if (boardId === 3) {
        createPiece('blackQueen','black',boardBlock)  
      }
      
      if (boardId === 4) {

        createPiece('blackKing','black',boardBlock)    
      }
      
      if (boardId === 5) {

        createPiece('blackBishop','black',boardBlock)    
      }
      
      if (boardId === 6) {

        createPiece('blackKnight','black',boardBlock)    
      }
      
      if (boardId === 7) {

        createPiece('blackRook','black',boardBlock)    
      }
      
      if (boardId === 8) {

        createPiece('blackPawn','black',boardBlock)    
      }
      if (boardId === 9) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 10) {

        createPiece('blackPawn','black',boardBlock)    
      }
      if (boardId === 11) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 12) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 13) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 14) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 15) {

        createPiece('blackPawn','black',boardBlock)    
      }

      if (boardId === 48) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 49) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 50) {
        createPiece('whitePawn','white',boardBlock)  
      }

      if (boardId === 51) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 52) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 53) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 54) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 55) {
        createPiece('whitePawn','white',boardBlock)  
      }
      if (boardId === 56) {
        createPiece('whiteRook','white',boardBlock)  
      }
      if (boardId === 57) {
        createPiece('whiteKnight','white',boardBlock)  
      }
      if (boardId === 58) {
        createPiece('whiteBishop','white',boardBlock)  
      }
      if (boardId === 59) {
        createPiece('whiteQueen','white',boardBlock)  
      }
      if (boardId === 60) {
        createPiece('whiteKing','white',boardBlock)  
      }
  
      if (boardId === 61) {
        createPiece('whiteBishop','white',boardBlock)  
      }
      if (boardId === 62) {
        createPiece('whiteKnight','white',boardBlock)  
      }
      if (boardId === 63) {
        createPiece('whiteRook','white',boardBlock)  
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
  actualPiece.setAttribute('draggable','true')
  actualPiece.setAttribute('unmoved','')
  boardBlock.appendChild(actualPiece)
}





function piecesEvents(boardBlock) {
  if(boardBlock.firstChild)
  boardBlock.addEventListener('dragstart', selectingPiece)
  
  boardBlock.addEventListener("dragover", (e) => {
    e.preventDefault();
    
if(!draggedItemClone)
return
    // cloning previous Block with pieces
    nextPieceBlock = e.target.parentElement.cloneNode(true);
  

    let leftX = e.clientX -dx ;
    let topY = e.clientY -dy;

    draggedItemClone.style.width = `${currentDraggingBlockWidth}px`
    draggedItemClone.style.height = `${currentDraggingBlockWidth}px`
   
    draggedItemClone.style.left = `${leftX}px`
    draggedItemClone.style.top = `${topY}px`
    

      if(e.target.hasAttribute('filled'))
      { currentHoveringBlock = e.target.parentElement;
    return
      }
      
      currentHoveringBlock =e.target;

      currentHoveringBlock.setAttribute("hovering",'')



      
  });


}


// For the Pawn 

function pawnPossibleMoves(selectedBlock) {


  // console.log('pawn loading',selectedBlock)
    selectedBlockId = selectedBlock.parentElement.getAttribute("data-id");
    selectedBlockId = parseInt(selectedBlockId);
    selectedPieceColor = selectedBlock.getAttribute('color')
  
    possibleMoves.push(selectedBlock.parentElement)
    let nextBlock;
    
    let currentColumn;


    if (selectedPieceColor === "white") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId - boardLength}"]`
     
        );
        currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
        if(isCheckingIllegalMoves === true)
      {  
        // console.log('this shh')
        pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
      }
        if(selectedBlock.hasAttribute('unmoved') && !nextBlock.firstChild){
          let farNextBlock = document.querySelector(
            `[data-id="${selectedBlockId - boardLength - boardLength}"]`)
            farNextBlock.setAttribute('enpassant','')
            if(!farNextBlock.firstChild)
            if(isCheckingIllegalMoves === false)
            possibleMoves.push(farNextBlock)
        }

   
  if(nextBlock.firstChild){

    pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
    addingEventsInPossibleMoves(possibleMoves);
    return;
  }
  if(isCheckingIllegalMoves === false)
      possibleMoves.push(nextBlock);
  

    pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
    }
  
    if (selectedPieceColor === "black") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId + boardLength}"]`
      );
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
      if(isCheckingIllegalMoves === true)
        pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)

      if(selectedBlock.hasAttribute('unmoved') && !nextBlock.firstChild){
  let farNextBlock = document.querySelector(
    `[data-id="${selectedBlockId + boardLength + boardLength}"]`)
    farNextBlock.setAttribute('enpassant','')
    if(!farNextBlock.firstChild)
    if(isCheckingIllegalMoves === false)
    possibleMoves.push(farNextBlock)
}
      
      if(nextBlock.firstChild){
    
        pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
        addingEventsInPossibleMoves(possibleMoves);
        return;
      }
      if(isCheckingIllegalMoves === false)
      possibleMoves.push(nextBlock);
 
      pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
    }
  // console.log('yhis level cnt ')
    addingEventsInPossibleMoves(possibleMoves);
  }

  function checkingEnpassant(currentPawnBlock){

    let nextBlockColor;
    let nextBlockType;
    let previousBlockColor;
    let previousBlockType; 
    let currentBlockColor = currentPawnBlock.firstChild.getAttribute('color')

if(currentPawnBlock.nextElementSibling.firstChild){
 nextBlockType = currentPawnBlock.nextElementSibling.firstChild.getAttribute('data-piece');

 nextBlockType =  nextBlockType.replace('white','').replace('black','')
  nextBlockColor = currentPawnBlock.nextElementSibling.firstChild.getAttribute('color')
}

if(currentPawnBlock.previousElementSibling.firstChild){
   previousBlockType = currentPawnBlock.previousElementSibling.firstChild.getAttribute('data-piece');
  
   previousBlockType =  previousBlockType.replace('white','').replace('black','')
    previousBlockColor = currentPawnBlock.previousElementSibling.firstChild.getAttribute('color')
  }



if(!currentPawnBlock.nextElementSibling.firstChild && !currentPawnBlock.previousElementSibling.firstChild)
{currentPawnBlock.removeAttribute('enpassant')
  return;}



// console.log({nextBlockType,nextBlockColor})

    let currentColumn = currentPawnBlock.getAttribute('data-column')
    currentColumn = lettersIn[currentColumn]
    // console.log({currentColumn},'this is the current column')
    if(currentColumn>0 && currentColumn<7){
if(nextBlockType){
      if(nextBlockColor !== currentBlockColor && nextBlockType === "Pawn")

    {
      enpassingBlock = currentPawnBlock.nextElementSibling;
       enpassantableBlock = currentPawnBlock
       isEnpassant = true;
       enpassantTurn = !isWhitePlayerTurn;
       enpassingBlock.setAttribute('enpassingBlock','')
    }
    }

    if(previousBlockType){
      if(previousBlockColor !== currentBlockColor && previousBlockType === "Pawn")

    {
      enpassingBlock = currentPawnBlock.previousElementSibling;
      enpassantableBlock = currentPawnBlock
      isEnpassant = true;
    enpassantTurn = !isWhitePlayerTurn;
    enpassingBlock.setAttribute('enpassingBlock','')
    }
    }
  }
  }
  

function pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock){

let currentPieceColor = selectedBlock.getAttribute('color')

if(isEnpassant === true)
if(currentColumn>0  && currentColumn<7){
  if(selectedBlock.parentElement.previousElementSibling.firstChild)
  if((selectedBlock.parentElement.previousElementSibling.hasAttribute('enpassant'))&&selectedBlock.parentElement.previousElementSibling.firstChild.getAttribute('color')!== selectedBlock.getAttribute('color')){

  


    possibleMoves.push(nextBlock.previousElementSibling)

  
  }
  
  if(selectedBlock.parentElement.nextElementSibling.firstChild )
  if((selectedBlock.parentElement.nextElementSibling.hasAttribute('enpassant'))&&selectedBlock.parentElement.nextElementSibling.firstChild.getAttribute('color')!== selectedBlock .getAttribute('color')){
   
   
 
    possibleMoves.push(nextBlock.nextElementSibling)
  
  }  
  
  }  
  

  if(isCheckingIllegalMoves === true)
  { 
  
  if(currentColumn> 0 && currentColumn< 7)
  {if(currentPieceColor === 'black'){
  whiteIllegalMoves.push(nextBlock.nextElementSibling)
  whiteIllegalMoves.push(nextBlock.previousElementSibling)  
}
  if(currentPieceColor === 'white')
  {
  blackIllegalMoves.push(nextBlock.nextElementSibling)  
  blackIllegalMoves.push(nextBlock.previousElementSibling)  
}
}}

if(currentColumn>0 && nextBlock.previousElementSibling.firstChild){
  // console.log('entered this event',nextBlock,selectedBlock,currentPieceColor,isCheckingIllegalMoves)


  if(nextBlock.previousElementSibling.firstChild.getAttribute('color')===currentPiece.getAttribute('color'))

  return 

  // console.log("reached level 2")
  possibleMoves.push(nextBlock.previousElementSibling)

if(nextBlock.previousElementSibling.firstChild.getAttribute('data-piece') ==="whitePawn"||nextBlock.previousElementSibling.firstChild.getAttribute('data-piece') ==="blackPawn")
 { attackingBlocks.push(currentPieceBlock)
  // console.log('done blockable',selectedBlock.parentElement)
  // nextBlock.previousElementSibling.setAttribute('checkmate','') 
}
  nextBlock.previousElementSibling.setAttribute('conquer','')
}
if(currentColumn<7 && nextBlock.nextElementSibling.firstChild){



 
  if(nextBlock.nextElementSibling.firstChild.getAttribute('color') === currentPiece.getAttribute('color'))
  return
  // console.log("entered level 3")

  nextBlock.nextElementSibling.setAttribute('conquer','')
  possibleMoves.push(nextBlock.nextElementSibling)

    if(nextBlock.nextElementSibling.firstChild.getAttribute('data-piece') ==="whitePawn"||nextBlock.nextElementSibling.firstChild.getAttribute('data-piece') ==="blackPawn")
    { attackingBlocks.push(currentPieceBlock)
      // console.log('done blockable',selectedBlock.parentElement)
    // nextBlock.nextElementSibling.setAttribute('checkmate','') 
   }

}

}


function pawnUpgrade(currentBlock){
 
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
    //  console.log(upgradePieceType)
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
  // console.log(error)
})
}




//For the Kinght

function knightPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")
  let currentPieceColor = currentBlock.firstChild.getAttribute('color')
  let initialrows = parseInt(currentRow)
  let  initialcolumn = lettersIn[currentColumn]
let rows = parseInt(currentRow)+1
let  column = lettersIn[currentColumn]+2

let currentPieceType =  currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')

while(rows<initialrows+3&&column>=initialcolumn){

  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);

if(!nextBlock)
    {
      rows++;
      column--;
      continue;
    }
    if(nextBlock.firstChild)
    {


        nextBlock.setAttribute('conquer','')

        let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
        let nextPieceColor = nextBlock.firstChild.getAttribute('color')
        if(currentBlock.firstChild)
        if((nextPieceType === 'Knight')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King"){
                  attackingBlocks.push(nextBlock)
         currentBlock.setAttribute('checkmate','')
        }
      
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
    if(nextBlock.firstChild)
    {
    
      
      

        nextBlock.setAttribute('conquer','')
        let nextPieceType = nextBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
        let nextPieceColor = nextBlock.firstChild.getAttribute('color')
        if(currentBlock.firstChild)
        if((nextPieceType === 'Knight')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King"){
          attackingBlocks.push(nextBlock)
 currentBlock.setAttribute('checkmate','')
}
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
      if(currentBlock.firstChild)
      if((nextPieceType === 'Knight')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King"){
        attackingBlocks.push(nextBlock)
currentBlock.setAttribute('checkmate','')
}
      
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
    if(currentBlock.firstChild)
    if((nextPieceType === 'Knight')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
    if(currentPieceType === "King"){
      attackingBlocks.push(nextBlock)
currentBlock.setAttribute('checkmate','')
}
  }
  possibleMoves.push(nextBlock)
  rows--;
  column++;

}

if(isCheckingIllegalMoves === true)
{ if(currentPieceColor === 'black')
  whiteIllegalMoves.push([...possibleMoves])
  if(currentPieceColor === 'white')
  blackIllegalMoves.push([...possibleMoves])
}

possibleMoves = possibleMoves.filter(item=>{

  if(!item.firstChild)
  return item;
  if(!(item.firstChild.getAttribute('color') === currentBlock.firstChild.getAttribute('color')))
  {
  return item
  }
  else{
    item.removeAttribute('conquer');
    return
  }
})

possibleMoves.push(currentBlock)

addingEventsInPossibleMoves(possibleMoves)

}





// For the Bishop


function bishopPossibleMoves(currentBlock){
  let currentRow = currentBlock.getAttribute("data-row")
  let currentColumn = currentBlock.getAttribute("data-column")
  let currentPieceColor = currentBlock.firstChild.getAttribute('color')
let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]
// console.log("bishop")

let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');
if(isGettingKingMoves === true)
{possibleMoves = []
  isCheckingIllegalMoves = false
}
while(rows<8&&column>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
    nextBlock.setAttribute('direction','bl')
    possibleMoves.push(nextBlock)
// console.log({currentBlock,nextBlock})  
    if(currentBlock!==nextBlock)
    { 
      
      if(nextBlock.firstChild){
      nextBlock = nextBlock.firstChild

      let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
      let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
      let nextPieceColor = nextBlock.getAttribute('color')
  
  
      if(rows===currentPieceRow+1 && (nextPieceType === "King"||nextPieceTypeInitial === "whitePawn") && nextPieceColor !== currentBlock.firstChild.getAttribute('color')){
        if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
  currentBlock.setAttribute('checkmate','') }  
      



      if(!(currentPieceType === "King"))
        nextBlock.parentElement.setAttribute('conquer','')
  
        if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor){
        if(currentPieceType === "King")
         {currentBlock.setAttribute('checkmate','')
       attackingBlocks.push(nextBlock.parentElement)
       attackingBlocks.push(possibleMoves[possibleMoves.length-2])
         break;
      }}
      else{
        break;
      }
      break;
      }}
    rows++;
    column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]

while(rows<8&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  nextBlock.setAttribute('direction','br')
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  {  if(nextBlock.firstChild){
    nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow+1 && (nextPieceType === "King"||nextPieceTypeInitial === "whitePawn") && nextPieceColor !== currentBlock.firstChild.getAttribute('color')){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
currentBlock.setAttribute('checkmate','') }  
     
    
    if(!(currentPieceType === "King"))
    nextBlock.parentElement.setAttribute('conquer','')

    if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor){
    if(currentPieceType === "King")
     {currentBlock.setAttribute('checkmate','')
   attackingBlocks.push(nextBlock.parentElement)
   attackingBlocks.push(possibleMoves[possibleMoves.length-2])
     break;
  }}
  else{
    break;
  }
  break;
  }

}
  rows++;
  column++;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column>=0){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  nextBlock.setAttribute('direction','tl')
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  {
    if(nextBlock.firstChild)
    {
      nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow-1 && (nextPieceType === "King"||nextPieceTypeInitial === "blackPawn") && nextPieceColor !== currentBlock.firstChild.getAttribute('color')){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
currentBlock.setAttribute('checkmate','') }  
    
    if(!(currentPieceType === "King"))
    nextBlock.parentElement.setAttribute('conquer','')

    if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor){
    if(currentPieceType === "King")
     {currentBlock.setAttribute('checkmate','')
   attackingBlocks.push(nextBlock.parentElement)
   attackingBlocks.push(possibleMoves[possibleMoves.length-2])
     break;
  }}
  else{
    break;
  }
  break;
  }

}
  rows--;
  column--;

}
rows = parseInt(currentRow)
column = lettersIn[currentColumn]


while(rows>=0&&column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
  nextBlock.setAttribute('direction','tr')
  possibleMoves.push(nextBlock)
  
  if(currentBlock!==nextBlock)
  {  if(nextBlock.firstChild){
    nextBlock = nextBlock.firstChild
    let nextPieceTypeInitial = nextBlock.getAttribute('data-piece')
    let nextPieceType = nextPieceTypeInitial.replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')


    if(rows===currentPieceRow-1 && (nextPieceType === "King"||nextPieceTypeInitial === "blackPawn") && nextPieceColor !== currentBlock.firstChild.getAttribute('color')){
      if(!(currentPieceType === "Bishop" || currentPieceType ==="Queen"))
currentBlock.setAttribute('checkmate','') }  
    
    
    if(!(currentPieceType === "King"))
    nextBlock.parentElement.setAttribute('conquer','')

    if((nextPieceType === 'Bishop'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor){
    if(currentPieceType === "King")
     {currentBlock.setAttribute('checkmate','')
   attackingBlocks.push(nextBlock.parentElement)
   attackingBlocks.push(possibleMoves[possibleMoves.length-2])
     break;
  }}
  else{
    break;
  }
  break;
  }

}
  rows--;
  column++;

}


if(isCheckingIllegalMoves === true)

{
  if(!currentBlock.firstChild)
          return;
          let currentPieceColor = currentBlock.firstChild.getAttribute('color')
          let currentRow = currentBlock.getAttribute('data-row')
          let currentColumn = currentBlock.getAttribute('data-column')
          // console.log(currentBlock.firstChild)
  if(currentBlock.firstChild.getAttribute('data-piece')==="whiteKing"||currentBlock.firstChild.getAttribute('data-piece')==="blackKing"){
    // console.log('this event should be running')

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
    // console.log(possibleMoves)
  
  

}
if(currentPieceColor === 'black')
whiteIllegalMoves.push([...possibleMoves])
if(currentPieceColor === 'white')
blackIllegalMoves.push([...possibleMoves])
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
// console.log(attackingBlocks.length)

if(attackingBlocks.length === 2){

  // console.log("checking")
  let attackingBlocksDirection = attackingBlocks[1].getAttribute('direction')

attackingBlocks = possibleMoves.filter(blocks=>{
  if(blocks.getAttribute('direction') === attackingBlocksDirection ||blocks === attackingBlocks[0])
  return blocks;
})

attackingBlocks = attackingBlocks.map(items=>{
 
  items.setAttribute('blockable','')
  return items
})

// console.log({attackingBlocksDirection,attackingBlocks,possibleMoves})
}

// console.log(possibleMoves)
addingEventsInPossibleMoves(possibleMoves)
}

// For the Rook 

function rookPossibleMoves(currentBlock){
// console.log(currentBlock)
// console.log("rook")

// console.log(possibleMoves)
   let currentRow = currentBlock.getAttribute("data-row")
   let currentColumn = currentBlock.getAttribute("data-column")
   let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');
   let currentPieceColor = currentBlock.firstChild.getAttribute('color')
   let currentPieceBlockType;
   if(currentPieceBlock.firstChild)
   currentPieceBlockType = currentPieceBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','')
let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]
let currentPieceColumn = column


while(rows<8){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
    nextBlock.setAttribute('direction','b')

    if(currentBlock!==nextBlock)
    {  possibleMoves.push(nextBlock)
      if(nextBlock.firstChild)
      {
      nextBlock = nextBlock.firstChild
     
      
      let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
      let nextPieceColor = nextBlock.getAttribute('color')
if((rows===currentPieceRow+1 && nextPieceType === "King") && currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
currentBlock.setAttribute('checkmate','')      
      if(!(currentPieceType === "King" ))
        nextBlock.parentElement.setAttribute('conquer','')


    if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
    if(currentPieceType === "King")
    {currentBlock.setAttribute('checkmate','')
    attackingBlocks.push(nextBlock.parentElement)
    attackingBlocks.push(possibleMoves[possibleMoves.length-2])
      break;
   }

  
        break;
    }}
    rows++;

}
rows = parseInt(currentRow)

while(rows>=0){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${rows}"]`);
    
    nextBlock.setAttribute('direction','t')
    if(currentBlock!==nextBlock)
    {   possibleMoves.push(nextBlock)
      if(nextBlock.firstChild){

        nextBlock = nextBlock.firstChild
      let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
    let nextPieceColor = nextBlock.getAttribute('color')
      if((rows===currentPieceRow-1 && nextPieceType === "King") && currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      currentBlock.setAttribute('checkmate','')  
     
      if(!(currentPieceType==="King"))
      
        nextBlock.parentElement.setAttribute('conquer','')



   
        if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
        if(currentPieceType === "King")
        {currentBlock.setAttribute('checkmate','')
        attackingBlocks.push(nextBlock.parentElement)
        attackingBlocks.push(possibleMoves[possibleMoves.length-2])
          break;
       }

      
        break;
    }}
    rows--;

}

column = lettersIn[currentColumn]

while(column<8){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
 
  nextBlock.setAttribute('direction','r')
  if(currentBlock!==nextBlock)
  {     possibleMoves.push(nextBlock)
    if(nextBlock.firstChild){

      nextBlock = nextBlock.firstChild
    let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
  let nextPieceColor = nextBlock.getAttribute('color')
  if((column===currentPieceColumn+1 && nextPieceType === "King") && currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
    currentBlock.setAttribute('checkmate','')  
   
    if(!(currentPieceType==="King"))
    
      nextBlock.parentElement.setAttribute('conquer','')

// castling
       if(currentPieceBlock.firstChild)
      if(((nextBlock.hasAttribute('unmoved')&& currentPieceBlock.firstChild.hasAttribute('unmoved'))&& (nextPieceType === "Rook" || nextPieceType === "King"))&& nextPieceColor === currentBlock.firstChild.getAttribute('color'))
        if(currentPieceBlockType ==="King")
        {
        nextBlock.parentElement.setAttribute('castling','')
        currentBlock.setAttribute('castling','')
        isCastlingPossible = true;
      

possibleCastlingBlocksFunc()
        }


      
 
      if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
      {currentBlock.setAttribute('checkmate','')
      attackingBlocks.push(nextBlock.parentElement)
      attackingBlocks.push(possibleMoves[possibleMoves.length-2])
        break;
     }

    
      break;
  }}
  column++;

}

column = lettersIn[currentColumn]
while(column>=0){
  let nextBlock = document.querySelector(`[data-rc="${letters[column]}${currentRow}"]`);
  nextBlock.setAttribute('direction','l')
  possibleMoves.push(nextBlock)

  if(currentBlock!==nextBlock)
  { 
    
    if(nextBlock.firstChild){

      nextBlock = nextBlock.firstChild
    let nextPieceType = nextBlock.getAttribute('data-piece').replace('white','').replace('black','')
  let nextPieceColor = nextBlock.getAttribute('color')


  // console.log(nextBlock,nextPieceColor,currentBlock.firstChild.getAttribute('color'))
  if((column===currentPieceColumn-1 && nextPieceType === "King") && currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
    currentBlock.setAttribute('checkmate','')  
   
    if(!(currentPieceType==="King"))
    
      nextBlock.parentElement.setAttribute('conquer','')

      // castling
      if(currentPieceBlock.firstChild)
if(((nextBlock.hasAttribute('unmoved') && currentPieceBlock.firstChild.hasAttribute('unmoved'))&& (nextPieceType === "Rook"))&& nextPieceColor === currentBlock.firstChild.getAttribute('color'))
  if(currentPieceBlockType ==="King" || currentPieceBlockType === "Rook"){
  nextBlock.parentElement.setAttribute('castling','')
  currentBlock.setAttribute('castling','')
  isCastlingPossible = true;
 possibleCastlingBlocksFunc()
}

 
      if((nextPieceType === 'Rook'|| nextPieceType === 'Queen')&& currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
      if(currentPieceType === "King")
      {currentBlock.setAttribute('checkmate','')
      attackingBlocks.push(nextBlock.parentElement)
      attackingBlocks.push(possibleMoves[possibleMoves.length-2])
        break;
     }

    
      break;
  }}
  column--;

}

if(isCheckingIllegalMoves === true)

{
  if(!currentBlock.firstChild)
          return;
          let currentPieceColor = currentBlock.firstChild.getAttribute('color')
          let currentRow = currentBlock.getAttribute('data-row')
          let currentColumn = currentBlock.getAttribute('data-column')
          // console.log(currentBlock.firstChild)
  if(currentBlock.firstChild.getAttribute('data-piece')==="whiteKing"||currentBlock.firstChild.getAttribute('data-piece')==="blackKing"){
    // console.log('this event should be running')

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
if(currentPieceColor === 'black')
whiteIllegalMoves.push([...possibleMoves])
if(currentPieceColor === 'white')
blackIllegalMoves.push([...possibleMoves])
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
// console.log(possibleMoves,isCheckingIllegalMoves)

possibleMoves = [... new Set(possibleMoves)]
// console.log(possibleMoves) 

if(attackingBlocks.length === 2){

  // console.log("checking")
  let attackingBlocksDirection = attackingBlocks[1].getAttribute('direction')

attackingBlocks = possibleMoves.filter(blocks=>{
  if(blocks.getAttribute('direction') === attackingBlocksDirection ||blocks === attackingBlocks[0])
  return blocks;
})
attackingBlocks = attackingBlocks.map(items=>{
 
  items.setAttribute('blockable','')
  return items
})
// console.log({attackingBlocksDirection,attackingBlocks})
}


if(isGettingKingMoves === true){


 let currentPieceColor = currentBlock.firstChild.getAttribute('color')
 let currentRow = currentBlock.getAttribute('data-row')
 let currentColumn = currentBlock.getAttribute('data-column')
//  console.log(currentBlock.firstChild)
if(currentBlock.firstChild.getAttribute('data-piece')==="whiteKing"||currentBlock.firstChild.getAttribute('data-piece')==="blackKing"){
// console.log('this event should be running')

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
kingMoves.push([...possibleMoves])
isGettingKingMoves = false
return;
}



addingEventsInPossibleMoves(possibleMoves)

}


// castling Func

function possibleCastlingBlocksFunc(){
  castlingBlocks =  document.querySelectorAll(`[castling='']`)
  castlingBlocks = Array.from(castlingBlocks)
  let castlingBlocksBegin = castlingBlocks[0]
  let castlingBlocksEnd = castlingBlocks[castlingBlocks.length-1]
   let castlingBlocksBeginId = castlingBlocksBegin.getAttribute('data-id')
   let castlingBlocksEndId = castlingBlocksEnd.getAttribute('data-id')
  
   castlingBlocksBeginId = parseInt(castlingBlocksBeginId)
   castlingBlocksEndId  = parseInt(castlingBlocksEndId)
 castlingDistance = Math.abs(castlingBlocksBeginId -castlingBlocksEndId)

 castlingBlocks = []
for(let i = 0; i<= castlingDistance;i++){
  let newCastlingBlocks = document.querySelector(`[data-id = '${castlingBlocksBeginId+i}']`)
 
  newCastlingBlocks.setAttribute('castling','')
  newCastlingBlocks.classList.add('possible')
  castlingBlocks.push(newCastlingBlocks)
}



  //  console.log(castlingBlocks,'dsafsfaf')
// console.log({castlingBlocksBeginId,castlingBlocksEndId,castlingDistance})
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



// function isCastlingPossible(){

// }


function isKingInDanger(){



  let whiteKing = document.querySelector(`[data-piece="whiteKing"]`)
   let   whiteKingBlock = whiteKing.parentElement
queenPossibleMoves(whiteKingBlock)
knightPossibleMoves(whiteKingBlock)
pawnPossibleMoves(whiteKingBlock.firstChild);
if(whiteKingBlock.hasAttribute('checkmate'))
isWhiteKingInDanger = true;
else
isWhiteKingInDanger = false;



    let blackKing = document.querySelector(`[data-piece="blackKing"]`)
  let  blackKingBlock = blackKing.parentElement;


queenPossibleMoves(blackKingBlock)
knightPossibleMoves(blackKingBlock)
pawnPossibleMoves(blackKingBlock.firstChild);
if(blackKingBlock.hasAttribute('checkmate'))
isBlackKingInDanger = true;
else
isBlackKingInDanger = false;


}

function isAttackDefendable(){
  // console.log({possibleMoves,attackingBlocks})
  // console.log(currentPiece,'currentPiece')
console.log('chekcing defendable')
if(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing")
{isSimilar =false;
return;
}
  possibleMoves = possibleMoves.map(items=>{
 items.removeAttribute('direction')
 return items;}
 )

 attackingBlocks = attackingBlocks.map(items=>{
   items.removeAttribute('direction')
   return items
 })

  isSimilar =  possibleMoves.some(item=>{
    // console.log(attackingBlocks.includes(item),'true or false')
  return attackingBlocks.includes(item) === true
  
        
  })

  
  if(isSimilar !== true)
 return


  isWhiteKingInDanger = false;
isBlackKingInDanger = false;

// attackingBlocks = attackingBlocks.map(items=>{
// if(items.classList.contains("possible"))
// return items
// })


// attackingBlocks.forEach(blocks=>{
//   if(blocks){
//   blocks.removeEventListener('dragend', pieceMovingToNextBlock)
//   blocks.addEventListener('dragend',blockingCheckmate)
//   }
// })

// currentPieceBlock.removeEventListener('dragend',pieceMovingToNextBlock)
// currentPieceBlock.addEventListener('dragend', blockingCheckmate)


  // console.log({isSimilar},currentPiece,'similar?')
}

function castlingMoveFunc(color){
  if(castlingDistance === 3)
  {
  castlingBlocks[1].addEventListener('dragstart', selectingPiece)
  castlingBlocks[2].addEventListener('dragstart', selectingPiece)
 

if(castlingBlocks[0].firstChild)
castlingBlocks[0].removeChild(castlingBlocks[0].firstChild)
if(castlingBlocks[3].firstChild)
castlingBlocks[3].removeChild(castlingBlocks[3].firstChild)
createPiece(`${color}Rook`,`${color}`,castlingBlocks[1])
createPiece(`${color}King`,`${color}`,castlingBlocks[2])

  }

  if(castlingDistance === 4)
  {
  castlingBlocks[2].addEventListener('dragstart', selectingPiece)
  castlingBlocks[3].addEventListener('dragstart', selectingPiece)
 

if(castlingBlocks[0].firstChild)
castlingBlocks[0].removeChild(castlingBlocks[0].firstChild)
if(castlingBlocks[4].firstChild)
castlingBlocks[4].removeChild(castlingBlocks[4].firstChild)
createPiece(`${color}King`,`${color}`,castlingBlocks[2])
createPiece(`${color}Rook`,`${color}`,castlingBlocks[3])

  }
  isCastlingPossible = false;
  castlingBlocks.forEach(blocks=>{
    blocks.removeAttribute('castling')
  
  })
  // castlingBlocks = [];
  isCastlingDone = true;
}




function castlingResetFunc(color){
  if(castlingDistance === 3)
  {
  castlingBlocks[0].addEventListener('dragstart', selectingPiece)
  castlingBlocks[3].addEventListener('dragstart', selectingPiece)
 

if(castlingBlocks[1].firstChild)
castlingBlocks[1].removeChild(castlingBlocks[1].firstChild)
if(castlingBlocks[2].firstChild)
castlingBlocks[2].removeChild(castlingBlocks[2].firstChild)
createPiece(`${color}King`,`${color}`,castlingBlocks[0])
createPiece(`${color}Rook`,`${color}`,castlingBlocks[3])

  }

  if(castlingDistance === 4)
  {
  castlingBlocks[0].addEventListener('dragstart', selectingPiece)
  castlingBlocks[4].addEventListener('dragstart', selectingPiece)
 

if(castlingBlocks[2].firstChild)
castlingBlocks[2].removeChild(castlingBlocks[2].firstChild)
if(castlingBlocks[3].firstChild)
castlingBlocks[3].removeChild(castlingBlocks[3].firstChild)
createPiece(`${color}Rook`,`${color}`,castlingBlocks[0])
createPiece(`${color}King`,`${color}`,castlingBlocks[4])

  }
  // isCastlingPossible = false;
  isCastlingDone = false
  castlingBlocks.forEach(blocks=>{
    blocks.removeAttribute('castling')
  
  })
  // castlingBlocks = [];
  isCastlingDone = false;
}

//same in all pieces

function addingEventsInPossibleMoves(possibleMoves) {


if(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing"){
  let currentPieceColor = currentPiece.getAttribute('color')
let currentRow = currentPieceBlock.getAttribute('data-row')
let currentColumn = currentPieceBlock.getAttribute('data-column')
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

    item.addEventListener("dragend", pieceMovingToNextBlock);
    if(!item.classList.contains('possible'))
    item.classList.add("possible");
  });

}




let pieceMovingToNextBlock = function pieceMovingToNextBlockFunc
(event) {
  // console.log("moving")
let isEmpty = true;
if(draggedItemClone.parentElement)
draggedItemClone.parentElement.removeChild(draggedItemClone)

currentPiece.style.opacity = "1"
if(!currentHoveringBlock)
return


if(currentHoveringBlock.firstChild === currentPiece)
  return

  if((currentPiece.getAttribute('data-piece') === "whiteKing" || currentPiece.getAttribute('data-piece') === 'blackKing'  || currentPiece.getAttribute('data-piece') === 'whiteRook' || currentPiece.getAttribute('data-piece') === 'whiteKing') &&!currentPiece.hasAttribute('unmoved'))
{
  let allBlocks = document.querySelectorAll('.possible')
  if(allBlocks.length ===0)
  return
  allBlocks.forEach(item=>{
   
    if(item.hasAttribute('castling')){
      item.removeAttribute('castling')
    }
  
  })
}

  if((currentHoveringBlock.classList.contains('possible'))||(currentHoveringBlock.parentElement.classList.contains('possible'))){  
    
  
    
    if(currentHoveringBlock.firstChild)
    isEmpty = false;
 

let  currentPieceClone = currentPiece.cloneNode(true);

let color = currentPiece.getAttribute('color')
event.target.parentElement.removeChild(currentPiece) 
resetPossibleMoves()
if(isEmpty=== true)
{
  attackingBlocks = []
  // castling blocks moving 
  if((isCastlingPossible === true  && currentHoveringBlock.hasAttribute('castling'))  && !currentPieceBlock.hasAttribute('checkmate')){

    castlingMoveFunc(color)
    //  isKingInDanger()

  }
  
  else{
 
  
  currentHoveringBlock.addEventListener("dragstart", selectingPiece)
currentHoveringBlock.appendChild(currentPieceClone)





  }



if(currentHoveringBlock.firstChild)
currentHoveringBlock.firstChild.removeAttribute('unmoved')
if(currentHoveringBlock.hasAttribute('enpassant')){
 checkingEnpassant(currentHoveringBlock)
}



if((enpassantTurn === isWhitePlayerTurn && isEnpassant === true) && (enpassingBlock !== currentPieceBlock )){
  isEnpassant = false;
  let enpassantableBlocks = document.querySelectorAll(`[enpassant]`)
  enpassantableBlocks.forEach(blocks=>{
    blocks.removeAttribute('enpassant')
    blocks.removeAttribute('enpassingblock')
   })
  
  // console.log('how the hell is this not working',enpassantableBlock)
}
// if((enpassantTurn === isWhitePlayerTurn && isEnpassant === true) && (currentHoveringBlock !== enpassantableBlock )){

// }
// console.log({isWhitePlayerTurn,isEnpassant})
if(enpassantTurn === isWhitePlayerTurn && isEnpassant === true){
// console.log('this is running how')
enpassantableBlock.removeChild(enpassantableBlock.firstChild)
// enpassantableBlock.removeAttribute('enpassant')
isEnpassant = false;
}


}
else{

  if((isCastlingPossible === true  && currentHoveringBlock.hasAttribute('castling')) && !currentPieceBlock.hasAttribute('checkmate')){

    castlingMoveFunc(color)
    isKingInDanger()

  }
  else{
  
    attackingBlocks = []
currentHoveringBlock.appendChild(currentPieceClone)
currentPieceClone.style.opacity = "1"
currentHoveringBlock.addEventListener("dragstart", selectingPiece)

currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)
if(currentHoveringBlock.firstChild)
currentHoveringBlock.firstChild.removeAttribute('unmoved')
  }
}
if((isSimilar === true && currentHoveringBlock.hasAttribute('blockable')) && ((currentPiece.getAttribute('data-piece') !== 'whiteKing')|| (currentPiece.getAttribute('data-piece') !== 'blackKing')))
{   let lastchecks = document.querySelectorAll(`[checkmate= '']`)
lastchecks.forEach(item=>{
  item.removeAttribute('checkmate')
})
  isWhitePlayerTurn = isWhitePlayerTurn === true ? false : true;
  
  
  if(attackingBlocks.length>0)
  attackingBlocks.forEach(item=>{
    item.removeAttribute('blockable')
  })
  isWhiteKingInDanger = false
  isBlackKingInDanger = false;
  return
}
// pawn upgrade condition
if((event.target.getAttribute('data-piece') === 'whitePawn' || event.target.getAttribute('data-piece') === 'blackPawn') &&( currentHoveringBlock.getAttribute('data-row') === '0' || currentHoveringBlock.getAttribute('data-row') === '7'))
{
pawnUpgrade(currentHoveringBlock)

}


  isKingInDanger()
  resetPossibleMoves()
  // console.log({isWhiteKingInDanger,isBlackKingInDanger,isWhitePlayerTurn})
  if(isWhiteKingInDanger === true || isBlackKingInDanger === true)
  checkAllPiecesMoves()
resetPossibleMoves()



  // console.log({attackingBlocks,currentPiece},'testing')
 
  // attackingBlocks = []
  // console.log({isWhiteKingInDanger})
 if(((isWhiteKingInDanger === true && isWhitePlayerTurn === true)
 && (!currentHoveringBlock.hasAttribute('blockable') )
 ) || ((isWhiteKingInDanger === true && isWhitePlayerTurn === true)&&(currentHoveringBlock.hasAttribute('blockable')&&currentPiece.getAttribute('data-piece'))))
 if(isCastlingDone === false)
 
 {
  //  console.log('this should be running')
  isWhiteKingInDanger = false;
  isKingInDanger()
  resetPossibleMoves()
  let lastchecks = document.querySelectorAll(`[checkmate= '']`)
  lastchecks.forEach(item=>{
    item.removeAttribute('checkmate')
  })
  let tempClone = currentPieceClone.cloneNode(true)
  tempClone.addEventListener('dragstart',selectingPiece)
  currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)
   if(isEmpty === true){

 

   currentPieceBlock.appendChild(tempClone);
   currentHoveringBlock.removeAttribute('checkmate')


  //  isWhiteKingInDanger = true

   isWhitePlayerTurn = true

   return;
}
// console.log({currentPieceBlock,nextPieceBlock})
// currentPieceBlock.removeChild(currentPieceBlock.firstChild)



currentPieceBlock.appendChild(tempClone)
currentHoveringBlock.appendChild(nextPieceBlock.firstChild)
// currentHoveringBlock.removeAttribute('checkmate')
// currentPieceBlock.removeAttribute('checkmate')
// 

// console.log('is this one')
// isWhiteKingInDanger = true
isKingInDanger()
resetPossibleMoves()
// console.log({isWhiteKingInDanger},'checking')
isWhitePlayerTurn = true
return

  }
  else{
    castlingResetFunc(color)
    return
  }


  if(((isBlackKingInDanger === true && isWhitePlayerTurn === false)
  && (!currentHoveringBlock.hasAttribute('blockable') )
  ) || ((isBlackKingInDanger === true && isWhitePlayerTurn === false)&&(currentHoveringBlock.hasAttribute('blockable')&&currentPiece.getAttribute('data-piece')))
  
  )
  if(isCastlingDone === false)
  {
    // console.log('this should be running')
   isBlackKingInDanger = false;
   isKingInDanger()

   resetPossibleMoves()
   let lastchecks = document.querySelectorAll(`[checkmate= '']`)
   lastchecks.forEach(item=>{
     item.removeAttribute('checkmate')
   })
   let tempClone = currentPieceClone.cloneNode(true)
   tempClone.addEventListener('dragstart',selectingPiece)
   currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)
    if(isEmpty === true){
 
  
 
    currentPieceBlock.appendChild(tempClone);
    currentHoveringBlock.removeAttribute('checkmate')
 
 
   //  isWhiteKingInDanger = true
 
    isWhitePlayerTurn = false
 
    return;
 }
//  console.log({currentPieceBlock,nextPieceBlock})
 // currentPieceBlock.removeChild(currentPieceBlock.firstChild)
 
 
 
 currentPieceBlock.appendChild(tempClone)
 currentHoveringBlock.appendChild(nextPieceBlock.firstChild)
 // currentHoveringBlock.removeAttribute('checkmate')
 // currentPieceBlock.removeAttribute('checkmate')
 // 
 
//  console.log('is this one')
 // isWhiteKingInDanger = true
 isKingInDanger()

 resetPossibleMoves()
//  console.log({isBlackKingInDanger},'checking')
 isWhitePlayerTurn = false
 return
 
   }else{
     castlingResetFunc(color)
     return
   }


}

else{
  isWhitePlayerTurn = isWhitePlayerTurn === true ? true : false;
  // console.log('not possible')
  return
  // resetPossibleMoves();
}



if(isWhiteKingInDanger === false && isBlackKingInDanger === false){
attackingBlocks.forEach(item=>{
item.removeAttribute('blockable')

})
attackingBlocks = []
}

if(!isWhiteKingInDanger === true ){
  // let lastchecks = document.querySelector(`[data-piece='whiteKing']`)
  currentPieceBlock.removeAttribute('checkmate')
  
}

if(!isBlackKingInDanger === true ){
  // let lastchecks = document.querySelector(`[data-piece='blackKing']`)
  currentPieceBlock.removeAttribute('checkmate')
  
}
if(isCheckmate === true)
gameOver() 


isWhitePlayerTurn = isWhitePlayerTurn === true ? false : true;
// console.log({isWhitePlayerTurn,isBlackKingInDanger})

};

 


function resetPossibleMoves() {

// console.log("reseting")

let allBlocks = document.querySelectorAll('.possible')
allBlocks.forEach(item=>{
  item.classList.remove("possible")
  

})

// let lastchecks = document.querySelectorAll(`[checkmate= '']`)
// lastchecks.forEach(item=>{
//   item.removeAttribute('checkmate')
// })
  possibleMoves.forEach((item) => {
    item.classList.remove("possible");
    item.removeAttribute('conquer')
    item.removeEventListener("dragend", pieceMovingToNextBlock);
    if(!item.firstChild)
    item.removeEventListener("dragstart", selectingPiece)
  });

 
  possibleMoves = [];
 
}



function checkAllPiecesMoves(){
  console.log('king is in danger so checking')
  let allPieces ;
console.log('allPieces',allPieces)

  if(isWhitePlayerTurn === false && isWhiteKingInDanger === true) 
    allPieces = document.querySelectorAll(`[color="black"]`) 
 
    if(isWhitePlayerTurn === true && isBlackKingInDanger === true)
    allPieces = document.querySelectorAll(`[color="white"]`) 

if(!allPieces)
return
  allPieces = Array.from(allPieces)
console.log({allPieces})

allPieces.forEach(pieces=>{
  isCheckingIllegalMoves = true;
  let pieceType = pieces.getAttribute('data-piece')
  let pieceColor = pieces.getAttribute('color')
  pieceType = pieceType.replace('white','').replace('black','')
  pieceBlock = pieces.parentElement

// console.log({pieceType,pieceBlock,pieces})


if(pieceType === 'Bishop'){
  bishopPossibleMoves(pieceBlock)
}

if(pieceType === 'Knight'){
knightPossibleMoves(pieceBlock)
}
if(pieceType === 'Rook'){
  rookPossibleMoves(pieceBlock)
  }

if(pieceType === 'Queen'){
queenPossibleMoves(pieceBlock)
}
if(pieceType === 'King'){
kingPossibleMoves(pieceBlock)
}
if(pieceType === 'Pawn'){
 pawnPossibleMoves(pieces)
}
})

console.log('checking if running')

if(isWhitePlayerTurn === false && isWhiteKingInDanger === true){
  console.log('entering')

  whiteIllegalMoves = whiteIllegalMoves.flat()
whiteIllegalMoves = [... whiteIllegalMoves]
whiteIllegalMoves = new Set ([...whiteIllegalMoves])
whiteIllegalMoves = Array.from(whiteIllegalMoves)
console.log({whiteIllegalMoves})
whiteIllegalMoves.forEach(blocks=>{
  blocks.setAttribute('whiteDanger','')
} )


let whiteKing = document.querySelector(`[data-piece ='whiteKing']`)
 whiteKingBlock = whiteKing.parentElement
isGettingKingMoves = true
 kingPossibleMoves(whiteKingBlock)

 kingMoves = kingMoves.flat()

 console.log('kingmoves',kingMoves)
 isCheckmate = kingMoves.every(moves=>{

  return whiteIllegalMoves.some(move=>
    move === moves 
    )
 })
console.log("is Checkmate",isCheckmate)

}

if (isWhitePlayerTurn === true && isBlackKingInDanger === true) {
  console.log('king in check');
kingMoves = []
  blackIllegalMoves = blackIllegalMoves.flat();
  blackIllegalMoves = [...new Set(blackIllegalMoves)];

  blackIllegalMoves.forEach((blocks) => {
    blocks.setAttribute('blackDanger', '');
  });

  let blackKing = document.querySelector(`[data-piece='blackKing']`);
  blackKingBlock = blackKing.parentElement;
  isGettingKingMoves = true;
  kingPossibleMoves(blackKingBlock);

  kingMoves = kingMoves.flat();

  console.log('kingmoves', kingMoves);
  console.log('blackIllegalMoves', blackIllegalMoves);

  isCheckmate = kingMoves.every((move) => blackIllegalMoves.includes(move));

  if (isCheckmate) {
    console.log("Checkmate!");
    // Additional code to handle checkmate condition
  } else {
    console.log("Not checkmate.");
    // Additional code for other scenarios
  }
}

 

  dangerReset()


}


function dangerReset(){
  let allBlocks
  if(isWhitePlayerTurn === false)
 { allBlocks = document.querySelectorAll(`[whiteDanger]`)
 allBlocks.forEach(blocks=>{
  blocks.removeAttribute('whiteDanger')
  blocks.removeAttribute('conquer')
})
} 
 else
 { allBlocks = document.querySelectorAll(`[blackDanger]`)

 allBlocks.forEach(blocks=>{
  blocks.removeAttribute('blackDanger')
})  
}
  

}


function gameOver(){

  setTimeout(()=>{
    window.prompt("game over")

  },500)
}