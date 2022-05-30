const chessBoard = document.querySelector(".chess-board")
const boardLength = 8;
let possibleMoves = [];
let conquerMoves = [];
const letters = ['A','B','C','D','E','F','G','H']
const lettersIn = {
    'A' : 0,'B' : 1,'C' : 2,'D' : 3,'E' : 4,'F' : 5,'G' : 6,'H' : 7 
}
let boardId = 0;
let currentPiece = 0;
let rowStart = 0;
let rowEnd = 7;
let columnStart = 0;
let columnEnd = 7;


let possiblemovesCalculations = function piecesPossibleMoves(event)
{
 

let currentBlock = event.target;

if(!currentBlock.classList.contains("filled"))
return
let pieceType = currentBlock.getAttribute('data-piece');
let currentPosition = parseInt(currentBlock.getAttribute('data-id'));    

if(currentBlock!==currentPiece&&currentPiece!==0)
{
  
    resetPossibleMoves()
}
if(pieceType === 'whitePawn'|| pieceType==='blackPawn'){
pawnPossibleMoves(currentBlock,currentPosition,pieceType)
}
if(pieceType === 'whiteRook' || pieceType === "blackRook"){
    RookPossibleMoves(currentBlock,currentPosition,pieceType)
}

}
function createBoard(){
for(let i = 0;i<boardLength;i++){
    for(let j = 0;j<boardLength;j++){
        
        const boardBlock = document.createElement("div")
        boardBlock.setAttribute('data-id',boardId);
        boardBlock.setAttribute('data-rc',`${letters[j]}${i}`);
        boardBlock.setAttribute('data-column',`${letters[j]}`)
        boardBlock.setAttribute('data-row',`${i}`)

        if(i%2===0&&j%2==0||i%2===1&&j%2==1){
            boardBlock.classList.add("whiteBlock");
        }else{
            boardBlock.classList.add("blackBlock");
        }
       
        chessBoard.append(boardBlock)
   
    if(boardId===49){
        boardBlock.setAttribute("data-piece",'whiteRook')
        boardBlock.classList.add("filled")
    }

    if(boardId===0){
        boardBlock.setAttribute("data-piece",'blackBishop')
        boardBlock.classList.add("filled")
    }
    if(boardId===6){
        boardBlock.setAttribute("data-piece",'blackPawn')
        boardBlock.classList.add("filled")
    }

    if(boardId===8){
        boardBlock.setAttribute("data-piece",'blackPawn')
        boardBlock.classList.add("filled")
    }
    if(boardId===52){
        boardBlock.setAttribute("data-piece",'blackPawn')
        boardBlock.classList.add("filled")
    }
    if(boardId===10){
        boardBlock.setAttribute("data-piece",'whiteRook')
        boardBlock.classList.add("filled")
    }
    if(boardId===11){
        boardBlock.setAttribute("data-piece",'whiteKnight')
        boardBlock.classList.add("filled")
    }
    if(boardId===12){
        boardBlock.setAttribute("data-piece",'whiteQueen')
        boardBlock.classList.add("filled")
    }
    if(boardId===13){
        boardBlock.setAttribute("data-piece",'whiteKing')
        boardBlock.classList.add("filled")
    }

    
  piecesEvents(boardBlock)
    boardId++;
    }
}
}
createBoard()





function piecesEvents(boardBlock){

    
    if(boardBlock === currentPiece)
    return;


boardBlock.addEventListener('click',possiblemovesCalculations)
    } 



function pawnPossibleMoves(currentBlock,currentPosition,pieceType){
    currentPiece = currentBlock;
let nextForwardMoves = document.querySelector(`[data-id="${currentPosition - boardLength}"]`);
nextForwardMoves.classList.add("possible")

if(nextForwardMoves.classList.contains("filled") 
)
{
    nextForwardMoves.classList.remove('possible')
}
pawnPossibleConquer(nextForwardMoves,pieceType)
 possibleMoves = document.querySelectorAll('.possible')

 piecesMove(possibleMoves,currentBlock)
}

function RookPossibleMoves(currentBlock,currentPosition,pieceType){
    currentPiece = currentBlock;
    // let currentRC = currentBlock.getAttribute("data-rc")
    // console.log({currentRC})
   let currentRow = currentBlock.getAttribute("data-row")
   let currentColumn = currentBlock.getAttribute("data-column")

   let allRows =  document.querySelectorAll(`[data-column="${currentColumn}"]`);
   let allColumns =  document.querySelectorAll(`[data-row="${currentRow}"]`);
//    allRows = Array.from(allRows)
//    allColumns = Array.from(allColumns)
let r = parseInt(currentRow)
while(r<8){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${r}"]`);
   
    if(nextBlock.classList.contains("filled")&&currentPiece!==nextBlock)
    {
        rowEnd = r;
        break;
    }
    r++;

}
r = parseInt(currentRow)
while(r>=0){
    let nextBlock = document.querySelector(`[data-rc="${currentColumn}${r}"]`);
  
    if(nextBlock.classList.contains("filled")&&currentPiece!==nextBlock)
    {
        rowStart = r;
        break;
    }
    r--;

}
let  c = lettersIn[currentColumn]
console.log({c})
while(c<8){
    let nextBlock = document.querySelector(`[data-rc="${letters[c]}${currentRow}"]`);
    console.log(nextBlock,c)
    if(nextBlock.classList.contains("filled")&&currentPiece!==nextBlock)
    {
        columnEnd = c;
        break;
    }
    c++;

}
c = lettersIn[currentColumn]

while(c>=0){
    let nextBlock = document.querySelector(`[data-rc="${letters[c]}${currentRow}"]`);
    console.log(nextBlock)
    if(nextBlock.classList.contains("filled")&&currentPiece!==nextBlock)
    {
        columnStart = c;
        break;
    }
    c--;

}

console.log({columnEnd,columnStart})
console.log({rowEnd,rowStart})
console.log(allColumns)
// console.log({rowEnd,columnEnd})
allColumns = Array.from(allColumns).slice(columnStart,columnEnd+1)
allRows = Array.from(allRows).slice(rowStart,rowEnd+1)
   possibleMoves.push(...allColumns)
   possibleMoves.push(...allRows)
   
piecesMove(possibleMoves,pieceType)
console.log(possibleMoves)
}

function piecesMove(possibleMoves,pieceType)
{
    let currentPieceType = currentPiece.getAttribute("data-piece")

possibleMoves.forEach(blocks=>{
    blocks.classList.add('possible')
   if(currentPieceType === 'whitePawn'||currentPieceType === 'blackPawn')
{
    blocks.addEventListener('click',pawnMove)
}

    if(currentPieceType === 'whiteRook'||currentPieceType === 'blackRook')
{
    blocks.addEventListener('click',pawnMove)
}

})
}

let rookMove = function rookMoveFunc(blocks){
    blocks = blocks.target
    blockClickEventFunc(blocks)
    let currentPieceType = currentPiece.getAttribute("data-piece")
    piecesMoving(blocks,currentPieceType)
}
let pawnMove = function pawnMoveFunc(blocks){


blocks = blocks.target
let currentPieceType = currentPiece.getAttribute("data-piece")
blockClickEventFunc(blocks)
piecesMoving(blocks,currentPieceType)
    if(blocks.hasAttribute("conquer")){
        pawnConquerMove(blocks)
    }
  
}

function piecesMoving(blocks,currentPieceType){
    blocks.setAttribute("data-piece",`${currentPieceType}`)
    currentPiece.removeAttribute("data-piece",`${currentPieceType}`)
    blocks.classList.remove("possible")
    blocks.classList.add("filled")
    currentPiece.classList.remove("filled")
}
function pawnConquerMove(blocks){
blocks.removeAttribute("conquer")
blocks.removeEventListener('click',pawnMove)
blocks.removeAttribute('eventListenerSecondary')

blocks.addEventListener('click',possiblemovesCalculations)
}

function pawnPossibleConquer(nextForwardMoves,pieceType){
    
    let leftPieceType = nextForwardMoves.previousElementSibling.getAttribute('data-piece');
    let rightPieceType = nextForwardMoves.nextElementSibling.getAttribute('data-piece');
  
    if(nextForwardMoves.previousElementSibling.classList.contains('filled') && leftPieceType!==pieceType){
        nextForwardMoves.previousElementSibling.setAttribute('conquer','')
    
        nextForwardMoves.previousElementSibling.classList.add('possible')
     
         nextForwardMoves.previousElementSibling.removeEventListener('click',possiblemovesCalculations)
    }
    if(nextForwardMoves.nextElementSibling.classList.contains('filled') && rightPieceType!==pieceType){
        nextForwardMoves.nextElementSibling.setAttribute('conquer','')
        nextForwardMoves.nextElementSibling.classList.add('possible')
        nextForwardMoves.nextElementSibling.removeEventListener('click',possiblemovesCalculations)
    }
}

function blockClickEventFunc(blocks){
    if(blocks.hasAttribute('eventListenerSecondary'))
    {  blocks.removeAttribute('eventListenerSecondary')
    
    blocks.removeEventListener('click',pawnMove)
    blocks.removeEventListener('click',possiblemovesCalculations)
        return;
    }
    blocks.setAttribute("eventListenerSecondary",'')
}

function resetPossibleMoves (){
  
    rowStart = 0;
rowEnd = 7;
 columnStart = 0;
columnEnd = 7;
    possibleMoves.forEach(blocks=>{
    blocks.removeEventListener('click',pawnMove)
        blocks.classList.remove('possible')
        blocks.removeAttribute('conquer')
        blocks.removeAttribute('eventListenerSecondary')
        blocks.removeEventListener('click',possiblemovesCalculations)
       possibleMoves = []

    })
    
}