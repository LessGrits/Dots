let field = document.querySelector('#field');
let playBtn = document.querySelector('#start');
let getName = document.querySelector('#name');
let getLevel = document.querySelector('#select__level');
let currentResult = document.querySelector('#result');
let boardResults = document.querySelector('.board');
let name;
let level;
let userCount = 0;
let botCount = 0;
let currentWinner = '';
let squareList = [];
let localResults = [];

const month = ['jun', "feb", "march", "apr", "may", "june", "july", "aug", "sep", "oct", "nov", "dec"];


window.onload = () => {
    createField();
};


playBtn.addEventListener('click', () => {
    createField();
    getStartData();
    autoPaint(level);
    paintSquare();
}, false);


function getStartData() {
    name = getName.value;
    level = getLevel.value;
    userCount = 0;
    botCount = 0;
    playBtn.style.cursor = 'not-allowed';
    playBtn.disabled = true;
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
    field.addEventListener("mousedown", (event) => {
        let div = event.target;
        if (div.classList.contains('square') && div.classList.contains('blue')) {
            div.classList.remove("blue");
            div.classList.add("green");
            userCount++;
            // countField.innerHTML = `${userCount}/${botCount}`;
            showResult()
        }
    }, false)
}


function random() {
    return squareList.splice(Math.floor(Math.random() * squareList.length), 1);
}


function autoPaint(computerTime) {
    console.log(computerTime);
    let squares = document.getElementsByClassName('square');

    let rand = random();

    let bluePaint = setTimeout(paint, 1000);
    if (squares[rand] === undefined) {
        clearTimeout(bluePaint);
    }


    function paint() {

        if (squares[rand].classList.contains('white')) {
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
            // countField.innerHTML = `${userCount}/${botCount}`;
            showResult();
        }
    }
}


function showResult() {
    let allColuredSquares = document.getElementsByClassName('red').length + document.getElementsByClassName('green').length;
    console.log(allColuredSquares);
    if (allColuredSquares === 25) {
        currentWinner = (botCount > userCount) ? "Computer" : name;
        currentResult.innerHTML = `result: ${currentWinner} win`;
        let date = new Date();
        localResults.push({
            name: currentWinner,
            date: `${date.getDay() - 1}.${month[date.getMonth()]}.${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`
        });
        writeBoard();
        playBtn.style.cursor = 'pointer';
        playBtn.value = 'Play again';
        playBtn.disabled = false;
    }
}


function writeBoard() {
    boardResults.innerHTML = '';
    for (let game of localResults) {
        boardResults.innerHTML += `<div class="one_result">
                <span id="player__name__in__board">Name: ${game.name}</span>
                <span id="game__date">Date:${game.date}</span>
            </div>`
    }
}


