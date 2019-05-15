// $(document).ready(function() {
//   endGame();
// });

const cards = document.querySelectorAll('.game__card');
const modal = document.getElementById('overlay');
const closeModal = document.getElementById('closeModal');
const playAgain = document.getElementById('play-again');
const finalMoves = document.getElementById('moves--counter');
let isCardFlipped = false;
let firstCard, secondCard;
let lockBoard = false;
let matchedCards = 0;

let moves = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.toggle('flip');

  if (!isCardFlipped) {
    // first click
    moves++;
    isCardFlipped = true;
    firstCard = this;
    return;
  }
  // second click

  secondCard = this;
  moves++;

  checkCards();
}

function checkCards() {
  console.log(firstCard.dataset.framework, secondCard.dataset.framework);
  let cardsMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  cardsMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  matchedCards += 2;
  resetTheBoard();
  endGame();
  console.log(matchedCards);
}

function unflipCards() {
  lockBoard = true;

  // console.log('nie te same', firstCard);
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetTheBoard();
  }, 1000);
}

// function to reset the board, double click on card is prevent now
function resetTheBoard() {
  [isCardFlipped, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//immediately invoked function expression
function shuffleCards() {
  cards.forEach(card => {
    let randomNumber = Math.floor(Math.random() * 12);
    card.style.order = randomNumber;
  });
}

function endGame() {
  if (matchedCards == 6) {
    // console.log('test', modal);
    modal.classList.add('show');
    finalMoves.innerHTML = moves;
    closeTheModal();
  }
}

function closeTheModal() {
  closeModal.addEventListener('click', function() {
    startGame();
  });
  cards.forEach(card => card.classList.remove('flip'));
}

function startGame() {
  matchedCards = 0;
  moves = 0;
  resetTheBoard();
  modal.classList.remove('show');
  shuffleCards();
  addEvent();
}

function addEvent() {
  cards.forEach(card => card.addEventListener('click', flipCard));
}

// playAgain.forEach(button => button.addEventListener('click', play));

function play() {
  cards.forEach(card => card.classList.remove('flip'));
  startGame();
}

document.body.onload = startGame();
