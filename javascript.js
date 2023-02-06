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
    checkPlayerWin();
    if(checkPlayerWin()) {
        document.getElementById("modalTwo").style.display = 'block';
        
    }
}

// function resetScreen(){
//     for(let item of items){
//         item.textContent="";
//     }
//     document.getElementById("displayUsername").textContent="";
//     document.getElementById("modalOne").style.display = 'block';
//     for(let item of items){
//         item.addEventListener("click", addValueToBoard)
//     }
// }

window.addEventListener("click", function (event) {
    if (event.target.className === "result") {
        document.getElementById("modalTwo").style.display = "none";
        render.resetScreen();
    }
});

// Tic-Tac-Toe Logic
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

function checkPlayerWin() {
    return winningConditions.some((combination) => {
      return combination.every((i) => {
        return items[i].innerText === "X";
      });
    });
}