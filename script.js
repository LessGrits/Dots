let field = document.querySelector('#field');
let playBtn = document.querySelector('#start');
// let restartBtn = document.querySelector('#restart');
let countField =  document.querySelector('#count');
let getName = document.querySelector('#name');
let name;
let getLevel = document.querySelector('#select__level');
let level;
let userCount = 0;
let botCount = 0;
let result = document.querySelector('#result');
let squareList = [];

window.onload = ()=>{
    createField();
};

playBtn.onclick = gamingProces;

function gamingProces() {

    getStartData();
    autoPaint(level);
    paintSquare();
}


function getStartData() {
    name = getName.value;
    level = getLevel.value;

    // playBtn.disabled = true;

}


function createField() {

    let squares = '';
    for (let i = 0; i < 25; i++) {
        squareList[i] = i;
        squares += "<div class='square white'></div>";
    }
    field.innerHTML = squares

}

function paintSquare() {
    field.onmousedown = (event) => {
        let div = event.target;
        if (div.classList.contains('square') && div.classList.contains('blue')) {
            div.classList.remove("blue");
            div.classList.add("green");
            userCount++;
                countField.innerHTML = `${userCount}/${botCount}`;
            showResult()
        }
    }
}

function random() {
    return squareList.splice(Math.floor(Math.random() * squareList.length),1);
}

function autoPaint(computerTime) {
    console.log(computerTime);
    let squares = document.getElementsByClassName('square');


   let rand = random();

    let bluePaint =  setTimeout(paint, 1000);
    if(squares[rand] === undefined){
        clearTimeout(bluePaint);
    }



    function paint() {

        if ( squares[rand].classList.contains('white')) {
            squares[rand].classList.remove("white");
            squares[rand].classList.add("blue");
            setTimeout(() => redPaint(rand), computerTime);
            autoPaint(level);

        } else {
            paint();
        }
    }


    function redPaint(r) {
        if (!squares[r].classList.contains('green')) {
            squares[r].classList.remove('blue');

            squares[r].classList.add('red');
            botCount++;
            countField.innerHTML = `${userCount}/${botCount}`;
            showResult();
        }
    }
}
function showResult(){
    let allColuredSquares = document.getElementsByClassName('red').length + document.getElementsByClassName('green').length;
    console.log(allColuredSquares);
    if(allColuredSquares === 25){
        result.innerHTML = botCount > userCount ? 'result: Computer win':`result: ${name} win`;
    }
}

// TODO use addEventListener!
// TODO use class \/

