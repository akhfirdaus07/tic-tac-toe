// Declare variable 
const addBtn = document.querySelector('#addBtn');
const result = document.getElementById("result");
const displayUsername = document.getElementById("displayUsername");
const modalOne = document.getElementById("modalOne");
const modalTwo = document.getElementById("modalTwo");
const items=document.querySelectorAll(".item");
let itemsArr=[];
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
    //Check for wins and tie
    if(checkHumanWin()) {
        result.innerText = 'You Win!'; 
        modalTwo.style.display = 'block';   
    // }else if(checkAiWin()) {
    //     result.innerText = 'You Lose!'; 
    //     modalTwo.style.display = 'block';   
    }else if(isTie()) {
        result.innerText = 'Draw!'; 
        modalTwo.style.display = 'block';   
    }
    refreshArrValue();
    if (!checkHumanWin() && !isTie()) turn(bestSpot(), aiPlayer);
}
function turn(squareId, player) {
    itemsArr[squareId] = player;
    document.getElementById(squareId).innerText = player;
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}
function bestSpot() {
    return minimax(itemsArr, aiPlayer).index;
}

function minimax(newBoard, player) {
    var availSpots = itemsArr.filter(i => i != "O" && i != "X");

    if (checkHumanWin) {
        return { score: -10 };
    } else if (checkAiWin) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (let i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);
    }

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}



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
    return itemsArr.every((item) => {
        return item.innerText === "X" || item.innerText === "O";
    });
};


function refreshArrValue(){
    itemsArr=[];
    for(let item of items){
        itemsArr.push(item.innerText);
    };
};