let field = document.querySelector('#field');
let playBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let countField =  document.querySelector('#count');
let count = 0;
let botCount = 0;
playBtn.onclick = gamingProces;
restartBtn.onclick = () => {

};


function gamingProces() {
    getStartData();
    createField();
    autoPaint();
    paintSquare();
}


function getStartData() {

    playBtn.disabled = true;
}


function createField() {
    let squares = '';
    for (let i = 0, squareList = []; i < 25; i++) {
        squareList[i] = i;
        squares += "<div class='square'></div>";
    }
    field.innerHTML = squares
}

function paintSquare() {
    field.onclick = (event) => {
        let div = event.target;
        if (div.classList.contains('square')) {
            if (div.style.backgroundColor == 'blue') {
                div.style.backgroundColor = "green";
                count++;
                countField.innerHTML = `${count}/${botCount}`
            }
        }
    }
}

function random() {
    return Math.floor(Math.random() * 25);
}

function autoPaint() {
    let squares = document.getElementsByClassName('square');
    setTimeout(paint, 500);
    let rand = random();
    function paint() {

        if (squares[rand].style.backgroundColor !== 'green' && squares[rand].style.backgroundColor !== 'blue' && squares[rand].style.backgroundColor !== 'red') {
            squares[rand].style.backgroundColor = 'blue';
            autoPaint();

        } else {
            paint();
        }
    }

    setTimeout(() => redPaint(rand), 1100);

    function redPaint(r) {
        if (squares[r].style.backgroundColor !== 'green') {
            squares[r].style.backgroundColor = 'red';
            botCount++;
            countField.innerHTML = `${count}/${botCount}`
        }
    }

}

// TODO use addEventListener!
