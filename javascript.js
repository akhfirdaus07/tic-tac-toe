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
    const displayWin=()=>{
        result.innerText = 'You Win!'; 
        modalTwo.style.display = 'block';
        return;
    };
    const displayLose=()=>{
        result.innerText = 'You Lose!'; 
        modalTwo.style.display = 'block';  
        return;
    };
    const displayDraw=()=>{
        result.innerText = 'Draw!'; 
        modalTwo.style.display = 'block';
        return;   
    };
    return {username, resetScreen, displayWin, displayLose, displayDraw};
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
    
    if(checkHumanWin()) render.displayWin();
    else if(isDraw()) render.displayDraw();

    aiMove();
    if(checkAiWin()) render.displayLose(); 
    else if(isDraw()) render.displayDraw();
};
function aiMove(){
    for(let winningCondition of winningConditions){
        let count=0;
        for(let value of winningCondition){
            if(itemsArr[value]==humanPlayer) count++;
        }

        if(count>1){
            for(let item of winningCondition){
                if (itemsArr[item]=="") bestMove=item;
            }
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

function isDraw() {
    return itemsArr.every(el => el == humanPlayer || el == aiPlayer)
}; 

function refreshArrValue(){
    itemsArr=[];
    for(let item of items){
        itemsArr.push(item.innerText);
    };
};