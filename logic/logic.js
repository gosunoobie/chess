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
console.log(selectedBlock.parentElement,"king position")


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

      if (boardId === 49) {
     createPiece('whiteKnight','white',boardBlock)
      }

      if (boardId === 1) {

        createPiece('blackQueen','black',boardBlock)    
      }
      if (boardId === 6) {
        createPiece('blackRook','black',boardBlock)  
      }

      if (boardId === 8) {
        createPiece('blackKnight','black',boardBlock)  
      }
      if (boardId === 45) {
        createPiece('whiteKnight','white',boardBlock)  
      }
      if (boardId === 10) {
        createPiece('blackKing','black',boardBlock)  
      }
      if (boardId === 44) {
        createPiece('whiteKnight','white',boardBlock)  
      }
      if (boardId === 12) {
  
      }
      if (boardId === 20) {
        createPiece('blackKnight','black',boardBlock) 
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
  actualPiece.setAttribute('draggable','true')
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

function pawnPossibleMoves(selectedBlock) {
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
   
  if(nextBlock.firstChild)
  return;
      possibleMoves.push(nextBlock);
  
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
    pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
    }
  
    if (selectedPieceColor === "black") {
      nextBlock = document.querySelector(
        `[data-id="${selectedBlockId + boardLength}"]`
      );
      if(nextBlock.firstChild)
      return;
      possibleMoves.push(nextBlock);
      currentColumn = lettersIn[nextBlock.getAttribute('data-column')]
      pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock)
    }
  
    addingEventsInPossibleMoves(possibleMoves);
  }
  

function pawnConquerPossibleMoves(nextBlock,currentColumn,selectedBlock){
console.log('entered this event',nextBlock,selectedBlock)

  
if(currentColumn>0&&nextBlock.previousElementSibling.firstChild){

  if(nextBlock.previousElementSibling.firstChild.getAttribute('color')===currentPiece.getAttribute('color'))

  return 

  console.log("reached level 2")
  possibleMoves.push(nextBlock.previousElementSibling)
if(nextBlock.previousElementSibling.firstChild.getAttribute('data-piece') ==="whiteKing"||nextBlock.previousElementSibling.firstChild.getAttribute('data-piece') ==="whiteBlack")
 { attackingBlocks.push(currentPieceBlock)
  console.log('done blockable',selectedBlock.parentElement)
  nextBlock.previousElementSibling.setAttribute('checkmate','') 
}
  nextBlock.previousElementSibling.setAttribute('conquer','')
}
if(currentColumn<7&& nextBlock.nextElementSibling.firstChild){


  if(nextBlock.nextElementSibling.firstChild.getAttribute('color') === currentPiece.getAttribute('color'))
  return
    possibleMoves.push(nextBlock.nextElementSibling)
    if(nextBlock.nextElementSibling.firstChild.getAttribute('data-piece') ==="whiteKing"||nextBlock.nextElementSibling.firstChild.getAttribute('data-piece') ==="whiteBlack")
    { attackingBlocks.push(currentPieceBlock)
      console.log('done blockable',selectedBlock.parentElement)
    nextBlock.nextElementSibling.setAttribute('checkmate','') 
   }
    nextBlock.nextElementSibling.setAttribute('conquer','')
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

let rows = parseInt(currentRow)
let currentPieceRow = rows;
let  column = lettersIn[currentColumn]

let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');


while(rows<8&&column>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[column]}${rows}"]`);
    nextBlock.setAttribute('direction','bl')
    possibleMoves.push(nextBlock)
console.log({currentBlock,nextBlock})  
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
console.log(attackingBlocks.length)

if(attackingBlocks.length === 2){

  console.log("checking")
  let attackingBlocksDirection = attackingBlocks[1].getAttribute('direction')

attackingBlocks = possibleMoves.filter(blocks=>{
  if(blocks.getAttribute('direction') === attackingBlocksDirection ||blocks === attackingBlocks[0])
  return blocks;
})

attackingBlocks = attackingBlocks.map(items=>{
 
  items.setAttribute('blockable','')
  return items
})

console.log({attackingBlocksDirection,attackingBlocks})
}

addingEventsInPossibleMoves(possibleMoves)
}

// For the Rook 

function rookPossibleMoves(currentBlock){


   let currentRow = currentBlock.getAttribute("data-row")
   let currentColumn = currentBlock.getAttribute("data-column")
   let currentPieceType = currentBlock.firstChild.getAttribute('data-piece').replace('white','').replace('black','');
 
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


  console.log(nextBlock,nextPieceColor,currentBlock.firstChild.getAttribute('color'))
  if((column===currentPieceColumn-1 && nextPieceType === "King") && currentBlock.firstChild.getAttribute('color') !== nextPieceColor)
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
possibleMoves = [... new Set(possibleMoves)]

if(attackingBlocks.length === 2){

  console.log("checking")
  let attackingBlocksDirection = attackingBlocks[1].getAttribute('direction')

attackingBlocks = possibleMoves.filter(blocks=>{
  if(blocks.getAttribute('direction') === attackingBlocksDirection ||blocks === attackingBlocks[0])
  return blocks;
})
attackingBlocks = attackingBlocks.map(items=>{
 
  items.setAttribute('blockable','')
  return items
})
console.log({attackingBlocksDirection,attackingBlocks})
}

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
  console.log({possibleMoves,attackingBlocks})
  console.log(currentPiece,'currentPiece')
// console.log('chekcing defendable')
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
    console.log(attackingBlocks.includes(item),'true or false')
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


  console.log({isSimilar},currentPiece,'similar?')
}

//same in all pieces

function addingEventsInPossibleMoves(possibleMoves) {


if(currentPiece.getAttribute('data-piece')==="whiteKing"||currentPiece.getAttribute('data-piece')==="blackKing"){
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
    item.classList.add("possible");
  });

}

let blockingCheckmate = function blockingCheckmateFunc(event){

  console.log("blocking")
//   let isEmpty = true;
// if(draggedItemClone.parentElement)
// draggedItemClone.parentElement.removeChild(draggedItemClone)

// currentPiece.style.opacity = "1"
// if(currentHoveringBlock.firstChild === currentPiece)
// return


//   if((currentHoveringBlock.classList.contains('possible'))||(currentHoveringBlock.parentElement.classList.contains('possible'))){  
    
  
    
//     if(currentHoveringBlock.firstChild)
//     isEmpty = false;
 

// let  currentPieceClone = currentPiece.cloneNode(true);


// event.target.parentElement.removeChild(currentPiece) 
// resetPossibleMoves()
// if(isEmpty=== true)
// {currentHoveringBlock.addEventListener("dragstart", selectingPiece)
// currentHoveringBlock.appendChild(currentPieceClone)

// }
// else{
// currentHoveringBlock.appendChild(currentPieceClone)
// currentPieceClone.style.opacity = "1"
// currentHoveringBlock.addEventListener("dragstart", selectingPiece)

// currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)


// }}
// resetPossibleMoves()
}




let pieceMovingToNextBlock = function pieceMovingToNextBlockFunc
(event) {
  console.log("moving")
let isEmpty = true;
if(draggedItemClone.parentElement)
draggedItemClone.parentElement.removeChild(draggedItemClone)

currentPiece.style.opacity = "1"
if(!currentHoveringBlock)
return
if(currentHoveringBlock.firstChild === currentPiece)
return


  if((currentHoveringBlock.classList.contains('possible'))||(currentHoveringBlock.parentElement.classList.contains('possible'))){  
    
  
    
    if(currentHoveringBlock.firstChild)
    isEmpty = false;
 

let  currentPieceClone = currentPiece.cloneNode(true);


event.target.parentElement.removeChild(currentPiece) 
resetPossibleMoves()
if(isEmpty=== true)
{currentHoveringBlock.addEventListener("dragstart", selectingPiece)
currentHoveringBlock.appendChild(currentPieceClone)

}
else{
currentHoveringBlock.appendChild(currentPieceClone)
currentPieceClone.style.opacity = "1"
currentHoveringBlock.addEventListener("dragstart", selectingPiece)

currentHoveringBlock.removeChild(currentHoveringBlock.firstChild)


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

  console.log({attackingBlocks,currentPiece},'testing')
  resetPossibleMoves()
  // attackingBlocks = []
  console.log({isWhiteKingInDanger})
 if(((isWhiteKingInDanger === true && isWhitePlayerTurn === true)
 && (!currentHoveringBlock.hasAttribute('blockable') )
 ) || ((isWhiteKingInDanger === true && isWhitePlayerTurn === true)&&(currentHoveringBlock.hasAttribute('blockable')&&currentPiece.getAttribute('data-piece')))
 
 ){
   console.log('this should be running')
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
console.log({currentPieceBlock,nextPieceBlock})
// currentPieceBlock.removeChild(currentPieceBlock.firstChild)



currentPieceBlock.appendChild(tempClone)
currentHoveringBlock.appendChild(nextPieceBlock.firstChild)
// currentHoveringBlock.removeAttribute('checkmate')
// currentPieceBlock.removeAttribute('checkmate')
// 

console.log('is this one')
// isWhiteKingInDanger = true
isKingInDanger()
resetPossibleMoves()
console.log({isWhiteKingInDanger},'checking')
isWhitePlayerTurn = true
return

  }

  if(((isBlackKingInDanger === true && isWhitePlayerTurn === false)
  && (!currentHoveringBlock.hasAttribute('blockable') )
  ) || ((isBlackKingInDanger === true && isWhitePlayerTurn === false)&&(currentHoveringBlock.hasAttribute('blockable')&&currentPiece.getAttribute('data-piece')))
  
  ){
    console.log('this should be running')
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
 console.log({currentPieceBlock,nextPieceBlock})
 // currentPieceBlock.removeChild(currentPieceBlock.firstChild)
 
 
 
 currentPieceBlock.appendChild(tempClone)
 currentHoveringBlock.appendChild(nextPieceBlock.firstChild)
 // currentHoveringBlock.removeAttribute('checkmate')
 // currentPieceBlock.removeAttribute('checkmate')
 // 
 
 console.log('is this one')
 // isWhiteKingInDanger = true
 isKingInDanger()
 resetPossibleMoves()
 console.log({isBlackKingInDanger},'checking')
 isWhitePlayerTurn = false
 return
 
   }


}

else{
  isWhitePlayerTurn = isWhitePlayerTurn === true ? true : false;
  console.log('not possible')
  return
  // resetPossibleMoves();
}
let lastchecks = document.querySelectorAll(`[checkmate= '']`)
lastchecks.forEach(item=>{
  item.removeAttribute('checkmate')
})


if(isWhiteKingInDanger === false && isBlackKingInDanger === false){
attackingBlocks.forEach(item=>{
item.removeAttribute('blockable')

})
attackingBlocks = []
}
isWhitePlayerTurn = isWhitePlayerTurn === true ? false : true;
console.log({isWhitePlayerTurn,isBlackKingInDanger})

};

 


function resetPossibleMoves() {

console.log("reseting")

let allBlocks = document.querySelectorAll('.possible')
allBlocks.forEach(item=>{
  item.classList.remove("possible")
})
  possibleMoves.forEach((item) => {
    item.classList.remove("possible");
    item.removeAttribute('conquer')
    item.removeEventListener("dragend", pieceMovingToNextBlock);
    if(!item.firstChild)
    item.removeEventListener("dragstart", selectingPiece)
  });

 
  possibleMoves = [];
 
}
