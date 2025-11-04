
const PAIRS = 6;
const FLIP_BACK_DELAY = 1000;
const WIN_MSG = (t) => `Браво! Ги најде сите парови за ${t} обиди.`;

const imageSet = ["1.png","2.png","3.png","4.png","5.png","6.png"];
const backImage = "back.png";

let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let matchedPairs = 0;

const boardEl = document.getElementById("game-board");
const triesEl = document.getElementById("tries");
const restartBtn = document.getElementById("restart");

document.addEventListener("DOMContentLoaded", () => {
  initGame();
  restartBtn.addEventListener("click", initGame);
});

function initGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  tries = 0;
  matchedPairs = 0;
  triesEl.textContent = tries;

  const base = imageSet.slice(0, PAIRS);
  deck = shuffle([...base, ...base]);

  boardEl.innerHTML = "";
  deck.forEach((value, index) => {
    boardEl.appendChild(createCard(value, index));
  });
}

function createCard(value, index) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute("role", "gridcell");
  card.dataset.value = value;
  card.dataset.index = index;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const back = document.createElement("div");
  back.className = "card-face card-back";
  const backImg = document.createElement("img");
  backImg.src = backImage;
  backImg.alt = "грб";
  back.appendChild(backImg);

  const front = document.createEl
