const nos = {
    score: 0,
    button: document.querySelector('#nosBut'),
    display: document.querySelector('#nosDisplay')
}

const ellos = {
    score: 0,
    button: document.querySelector('#ellosBut'),
    display: document.querySelector('#ellosDisplay')
}


const resetBut = document.querySelector('#reset');
const ptsSelect = document.querySelector('#pts');
let winningScore = 15;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
        player.display.textContent = player.score;
    }
}

nos.button.addEventListener('click', function () {
    updateScores(nos, ellos)
});

ellos.button.addEventListener('click', function () {
    updateScores(ellos, nos)
});

ptsSelect.addEventListener('change', function (e) {
    winningScore = parseInt(this.value);
    reset();
});

resetBut.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [nos, ellos]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
};