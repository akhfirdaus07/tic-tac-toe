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