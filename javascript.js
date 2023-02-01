let gameBoard=[];

const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addUsername);

const render=(()=>{
    const username=()=>document.querySelector("#displayUsername").textContent=form.username.value;
    ;
    return {username};
})();

function addUsername(event) {
    event.preventDefault();
    render.username();
    document.getElementById("modalOne").style.display = 'none';
}

const items=document.querySelectorAll(".item")

function addValueToBoard(){
    this.textContent="X";
    this.removeEventListener("click",addValueToBoard)
}

for(let item of items){
    item.addEventListener("click", addValueToBoard)
}
