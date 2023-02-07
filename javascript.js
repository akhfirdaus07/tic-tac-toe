// Declare variable 
const addBtn = document.querySelector('#addBtn');
const result = document.getElementById("result");
const displayUsername = document.getElementById("displayUsername");
const modalOne = document.getElementById("modalOne");
const modalTwo = document.getElementById("modalTwo");
const items=document.querySelectorAll(".item");
let itemsArr=[];
let bestMove;
const humanPlayer = "X";
const aiPlayer = "O";
const winningConditions = [
    [0, 1, 2], //Horizontal
    [3, 4, 5], //Horizontal
    [6, 7, 8], //Horizontal
    [0, 3, 6], //Vertical
    [1, 4, 7], //Vertical
    [2, 5, 8], //Vertical
    [0, 4, 8], //Cross
    [2, 4, 6], //Cross
];
// Declare module pattern
const render=(()=>{
    const username=()=>displayUsername.textContent=form.username.value;
    const resetScreen=()=>{
        for(let item of items){
            item.textContent="";
        }
        displayUsername.textContent="";
        modalOne.style.display = 'block';
        for(let item of items){
            item.addEventListener("click", addValueToBoard)
        }
        result.innerText = ''; 
    };
    return {username,resetScreen};
})();

// Add event listener
window.addEventListener("click", function (event) {
    if (event.target.className === "output") {
        modalTwo.style.display = "none";
        render.resetScreen();
        refreshArrValue();
    }
});
addBtn.addEventListener('click', addUsername);
for(let item of items){
    item.addEventListener("click", addValueToBoard)
};

function addUsername(event) {
    event.preventDefault();
    render.username();
    modalOne.style.display = 'none';
}

function addValueToBoard(){
    this.textContent="X";
    this.removeEventListener("click",addValueToBoard);
    refreshArrValue();
    // //Check for wins and tie
    
    if(checkHumanWin()) {
        result.innerText = 'You Win!'; 
        modalTwo.style.display = 'block';
        return;
    } else if(isTie()) {
        result.innerText = 'Draw!'; 
        modalTwo.style.display = 'block';
        return;   
    }

    aiMove();
    if(checkAiWin()) {
        result.innerText = 'You Lose!'; 
        modalTwo.style.display = 'block';  
        return; 
    } else if(isTie()) {
        result.innerText = 'Draw!'; 
        modalTwo.style.display = 'block';  
        return;
    }
    // if (!checkHumanWin() && !isTie()) turn(bestSpot());
};

// function humanBestMove(){
//     // return winningConditions.some((combination) => {
//     //     return combination.every((i) => {
//     //       return items[i].innerText === humanPlayer;
//     //     });
//     // });

//     for(let winningCondition of winningConditions){
//         if(winningCondition.filter(word => word.includes(humanPlayer))==2){
//             bestMove=winningCondition.indexOf("");
//             return bestMove;
//         }
//     }
// }


function aiMove(){
    

    for(let winningCondition of winningConditions){
        let count=0;
    // [0, 1, 2]
    
        for(let value of winningCondition){
            if(itemsArr[value]==humanPlayer) count++;
        }

        if(count>1){
            for(let item of winningCondition){
                if (itemsArr[item]=="") bestMove=item;
            }

            // console.log(winningCondition)
            // console.log(winningCondition.indexOf(""))
            // bestMove=bestMove.indexOf("");
            
            break;
        }
    }
    console.log(bestMove)
    if(bestMove){
        document.getElementById(bestMove).innerText=aiPlayer;
        document.getElementById(bestMove).removeEventListener("click",addValueToBoard);
        bestMove=undefined;
    }else{
        for(let i =0; i<itemsArr.length;i++){
            if(itemsArr[i]==""){
                document.getElementById(i).innerText=aiPlayer;
                document.getElementById(i).removeEventListener("click",addValueToBoard);
                break;
            }
        };
    };
    refreshArrValue();
};


// function turn(squareId) {
//     itemsArr[squareId] = aiPlayer;
//     document.getElementById(squareId).innerText = aiPlayer;
//     if(checkHumanWin()) {
//         result.innerText = 'You Win!'; 
//         modalTwo.style.display = 'block';    
//     }
// }
// function bestSpot() {
//     return minimax(itemsArr, aiPlayer).index;
// }

// function minimax(newBoard, player) {
//     var availSpots = itemsArr.filter(i => i != "O" && i != "X");

//     if (checkHumanWin()) {
//         return { score: -10 };
//     } else if (checkAiWin()) {
//         return { score: 10 };
//     } else if (availSpots.length === 0) {
//         return { score: 0 };
//     }
//     var moves = [];
//     for (let i = 0; i < availSpots.length; i++) {
//         var move = {};
//         move.index = newBoard[availSpots[i]];
//         newBoard[availSpots[i]] = player;

//         if (player == aiPlayer) {
//             let output = minimax(newBoard, humanPlayer);
//             move.score = output.score;
//         } else {
//             let output = minimax(newBoard, aiPlayer);
//             move.score = output.score;
//         }

//         newBoard[availSpots[i]] = move.index;

//         moves.push(move);
//     }

//     var bestMove;
//     if (player === aiPlayer) {
//         var bestScore = -10000;
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score > bestScore) {
//                 bestScore = moves[i].score;
//                 bestMove = i;
//             }
//         }
//     } else {
//         var bestScore = 10000;
//         for (let i = 0; i < moves.length; i++) {
//             if (moves[i].score < bestScore) {
//                 bestScore = moves[i].score; 
//                 bestMove = i;
//             }
//         }
//     }

//     return moves[bestMove];
// }



// Tic-Tac-Toe Logic
function checkHumanWin() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return items[i].innerText === humanPlayer;
      });
    });
};
function checkAiWin() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return items[i].innerText === aiPlayer;
      });
    });
};

function isTie() {
    return itemsArr.every(el => el == humanPlayer || el == aiPlayer)
}; 

function refreshArrValue(){
    itemsArr=[];
    for(let item of items){
        itemsArr.push(item.innerText);
    };
};