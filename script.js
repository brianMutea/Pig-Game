'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const btnRollDice = document.querySelector('.btn--roll');
const holdScoreBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
// const currentScore0 = document.querySelector('#current--0');
const diceImg = document.querySelector('.dice');

let currentScore, totalScore, activePlayer, isPlaying;

const initGame = () => {
  currentScore = 0;
  totalScore = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  const scores = document.querySelectorAll('.score');
  scores.forEach(score => {
    score.textContent = 0;
  });
  const currentScores = document.querySelectorAll('.current-score');
  currentScores.forEach(cScore => {
    cScore.textContent = 0;
  });
  diceImg.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initGame();

const switchPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  } else if (activePlayer === 1) {
    activePlayer = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
};

btnRollDice.addEventListener('click', () => {
  if (isPlaying) {
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${randomDice}.png`;
    if (randomDice !== 1) {
      currentScore += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdScoreBtn.addEventListener('click', () => {
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      totalScore[activePlayer];
  }
  if (totalScore[activePlayer] >= 10) {
    isPlaying = false;
    diceImg.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document.getElementById('winmsg').style.opacity = '1';
  } else {
    switchPlayer();
  }
});

newGameBtn.addEventListener('click', () => {
  initGame();
  document.getElementById('winmsg').style.opacity = '0';
});
