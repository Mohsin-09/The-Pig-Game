const container = document.querySelector('.container');
const currentScore = document.querySelectorAll('.current-score');
const totalscore = document.querySelectorAll('.total-score');
const player = document.querySelectorAll('.player');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const img = document.querySelector('img');

const randomNum = () => Math.trunc(Math.random() * 6 + 1);
let currentPlayer = 0;
let playActive = true;

function winner() {
  if (Number(totalscore[currentPlayer].textContent) >= 100) {
    player[currentPlayer].classList.add('winner');
    Array.from(player).map(play => play.classList.remove('active'));
    btnRoll.disabled = true;
    btnHold.disabled = true;
    playActive = false;
  }
}

function shiftingPlayer() {
  currentScore[currentPlayer].textContent = '0';
  player[currentPlayer].classList.remove('active');
  currentPlayer =
    currentPlayer === 0 ? (currentPlayer = 1) : (currentPlayer = 0);
  player[currentPlayer].classList.add('active');
}

container.addEventListener('click', function (e) {
  const clicked = e.target;
  if (!clicked.classList.contains('btn')) return;
  const random = randomNum();

  if (clicked.classList.contains('btn--roll')) {
    img.src = `imgs/dice-${random}.png`;
    currentScore[currentPlayer].textContent =
      Number(currentScore[currentPlayer].textContent) + random;
    if (random === 1) shiftingPlayer();
  }

  if (clicked.classList.contains('btn--hold')) {
    totalscore[currentPlayer].textContent =
      Number(totalscore[currentPlayer].textContent) +
      Number(currentScore[currentPlayer].textContent);
    player[currentPlayer].classList.remove('active');

    winner();
    shiftingPlayer();
    player[currentPlayer].classList.add('active');
    if (!playActive)
      Array.from(player).map(play => play.classList.remove('active'));
  }

  if (clicked.classList.contains('btn--newgame')) {
    btnRoll.disabled = false;
    btnHold.disabled = false;
    playActive = true;
    img.src = `imgs/dice-1.png`;
    Array.from(player).map(active => active.classList.remove('winner'));
    Array.from(player).map(active => active.classList.remove('active'));
    Array.from(totalscore).map(score => (score.textContent = '0'));
    Array.from(currentScore).map(score => (score.textContent = '0'));
    currentPlayer = 0;
    player[currentPlayer].classList.add('active');
  }
});
