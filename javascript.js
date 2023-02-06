// Render and style layout
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addUsername);

const render=(()=>{
    const username=()=>document.querySelector("#displayUsername").textContent=form.username.value;
    const resetScreen=()=>{
        for(let item of items){
            item.textContent="";
        }
        document.getElementById("displayUsername").textContent="";
        document.getElementById("modalOne").style.display = 'block';
        for(let item of items){
            item.addEventListener("click", addValueToBoard)
        }
        document.getElementById("result").innerText = ''; 
    };
    return {username,resetScreen};
})();

function addUsername(event) {
    event.preventDefault();
    render.username();
    document.getElementById("modalOne").style.display = 'none';
}

const items=document.querySelectorAll(".item");
for(let item of items){
    item.addEventListener("click", addValueToBoard)
}

function addValueToBoard(){
    this.textContent="X";
    this.removeEventListener("click",addValueToBoard);
    //Check for wins and tie
    if(checkHumanWin()) {
        document.getElementById("result").innerText = 'You Win!'; 
        document.getElementById("modalTwo").style.display = 'block';   
    }else if(checkAiWin()) {
        document.getElementById("result").innerText = 'You Lose!'; 
        document.getElementById("modalTwo").style.display = 'block';   
    }else if(isTie()) {
        document.getElementById("result").innerText = 'Draw!'; 
        document.getElementById("modalTwo").style.display = 'block';   
    }
    refreshArrValue();
}

window.addEventListener("click", function (event) {
    if (event.target.className === "output") {
        document.getElementById("modalTwo").style.display = "none";
        render.resetScreen();
    }
});

// Tic-Tac-Toe Logic
var humanPlayer = "X";
var aiPlayer = "O";
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


let itemsArr=[];


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
refreshArrValue();

//Start of AI mode code
function emptyCells() {
    return itemsArr.filter((item) => item.innerText === "");
}
let turnX = true;
let gameOver = false;
function basicAI() {
    items.forEach((item) =>
        item.addEventListener("click", () => {
            if (turnX && item.innerHTML === `<div></div>` && !gameOver) {
                item.innerHTML = `<div class="x" id="x">X</div>`;
                turnX = !turnX;
                if (!turnX && emptyCells().length > 0 && !gameOver) {
                    emptyCells()[0].innerHTML = `<div class="o" id="o">O</div>`;
                    turnX = !turnX;
                }
            }
            //Check for wins and tie
            if(checkHumanWin()) {
                document.getElementById("result").innerText = 'You Win!'; 
                document.getElementById("modalTwo").style.display = 'block';   
            }else if(checkAiWin()) {
                document.getElementById("result").innerText = 'You Lose!'; 
                document.getElementById("modalTwo").style.display = 'block';   
            }else if(isTie()) {
                document.getElementById("result").innerText = 'Draw!'; 
                document.getElementById("modalTwo").style.display = 'block';   
            }
        })
    );
};

basicAI();
// End of AI mode code

