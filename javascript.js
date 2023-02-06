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
    checkHumanWin();
    if(checkHumanWin()) {
        document.getElementById("result").innerText = 'You Win'; 
        document.getElementById("modalTwo").style.display = 'block';   
    }
}

window.addEventListener("click", function (event) {
    if (event.target.className === "result") {
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

function isTie() {
    return items.every((item) => {
        return item.innerText === "X" || cell.innerText === "O";
    });
};

//Start of AI mode code
function emptyCells() {
    return items.filter((item) => item.innerText === "");
}

function basicAI() {
    items.forEach((item) =>
        item.addEventListener("click", () => {
        if (turnX && cell.innerHTML === `<div></div>` && !gameOver) {
            cell.innerHTML = `<div class="x" id="x">X</div>`;
            turnX = !turnX;
            if (!turnX && emptyCells().length > 0 && !gameOver) {
            emptyCells()[0].innerHTML = `<div class="o" id="o">O</div>`;
            turnX = !turnX;
            }
        }
        //Check for wins and tie
        const playerTurn = document.querySelector("#player-turn");
        if (checkWinOCell()) {
            playerTurn.innerHTML = `AI wins this round! 🤠🎉`;
            playerTurn.style.opacity = "1";
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
        }
        if (checkWinXCell()) {
            playerTurn.innerHTML = `Human wins this round! 😉🎉`;
            playerTurn.style.opacity = "1";
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
        }
        if (isTieCell()) {
            playerTurn.innerHTML = `It's a tie!🤝`;
            playerTurn.style.opacity = "1";
            restart.innerHTML = `Play Again<i class="fas fa-redo" id="icon">`;
            gameOver = true;
        }
        })
    );
};


// End of AI mode code

