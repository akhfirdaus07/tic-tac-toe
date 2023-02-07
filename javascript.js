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
// Declare render module pattern
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
// Declare logic module pattern
const logic=(()=>{
    const checkHumanWin=()=>{
        return winningConditions.some((combination) => {
          return combination.every((i) => {
            return itemsArr[i] === humanPlayer;
          });
        });
    };
    const checkAiWin=()=>{
        return winningConditions.some((combination) => {
          return combination.every((i) => {
            return itemsArr[i] === aiPlayer;
          });
        });
    };
    const isDraw=()=>{
        return itemsArr.every(el => el == humanPlayer || el == aiPlayer)
    }; 
    const refreshArrValue=()=>{
        itemsArr=[];
        for(let item of items){
            itemsArr.push(item.innerText);
        };
    };
    return {checkHumanWin, checkAiWin, isDraw, refreshArrValue};
})();
// Add event listener
window.addEventListener("click", function (event) {
    if (event.target.className === "output") {
        modalTwo.style.display = "none";
        render.resetScreen();
        logic.refreshArrValue();
    }
});
addBtn.addEventListener('click', addUsername);
for(let item of items){
    item.addEventListener("click", addValueToBoard)
};
// Global function
function addUsername(event) {
    event.preventDefault();
    render.username();
    modalOne.style.display = 'none';
}
function addValueToBoard(){
    this.textContent=humanPlayer;
    this.removeEventListener("click",addValueToBoard);
    logic.refreshArrValue();
    //Check for Human win and tie
    if(logic.checkHumanWin()) render.displayWin()
    else if(logic.isDraw()) render.displayDraw();
    // AI Move
    aiMove();
    // Check for AI win and tie
    if(logic.checkAiWin()) render.displayLose()
    else if(logic.isDraw()) render.displayDraw();
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
    logic.refreshArrValue();
};