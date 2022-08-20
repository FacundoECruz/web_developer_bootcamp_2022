const nosBut = document.querySelector('#nosBut');
const ellosBut = document.querySelector('#ellosBut');
const resetBut = document.querySelector('#reset');
const ptsSelect = document.querySelector('#pts');

const nosDisplay = document.querySelector('#nosDisplay');
const ellosDisplay = document.querySelector('#ellosDisplay');

let nos = 0;
let ellos = 0;
let winningScore = 5;
let isGameOver = false;

nosBut.addEventListener('click', function () {
    if (!isGameOver) {
        nos += 1;
        if (nos === winningScore) {
            isGameOver = true;
            nosDisplay.classList.add('winner');
            ellosDisplay.classList.add('loser');
        }
        nosDisplay.textContent = nos;
    }
});

ellosBut.addEventListener('click', function () {
    if (!isGameOver) {
        ellos += 1;
        if (ellos === winningScore) {
            isGameOver = true;
            ellosDisplay.classList.add('winner');
            nosDisplay.classList.add('loser');
        }
        ellosDisplay.textContent = ellos;
    }
});

ptsSelect.addEventListener('change', function () {
    pts = parseInt(this.value);
    reset();
});

resetBut.addEventListener('click', reset)

function reset() {
    isGameOver - false;
    nos = 0;
    ellos = 0;
    nosDisplay.textContent = 0;
    ellosDisplay.textContent = 0;
    ellosDisplay.classList.remove('winner', 'loser');
    nosDisplay.classList.remove('winner', 'loser');
}