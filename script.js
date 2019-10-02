let field = document.querySelector('#field');

window.onload = ()=>{
    createField();
    paintSquare();

};

function createField(){
    let squareList = [];

    for(let i = 0 ; i<5 ; i++){
        squareList[i] = [];
        for(let j = 0 ; j<5 ; j++){
            squareList[i][j]= j;
            field.innerHTML += "<div class='square'></div>";
        }
    }
}

function paintSquare() {
    field.onclick = (event)=>{
        console.log(event);
        let div = event.target;
        div.style.backgroundColor = "red";
    }


}
console.log(Math.floor(Math.random()*25));


