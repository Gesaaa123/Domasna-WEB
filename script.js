
const PAIRS = 6;
const FLIP_BACK_DELAY = 1000;
const WIN_MSG = (t) => `Браво! Ги најде сите парови за ${t} обиди.`;


const IMG_PATH = "./oweb_domasna3/";
const imageSet = ["1.png","2.png","3.png","4.png","5.png","6.png"].map(f => IMG_PATH + f);
const backImage = IMG_PATH + "back.png";

// --- STATE ---
let deck = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let tries = 0;
let matchedPairs = 0;

// --- DOM ---
const boardEl  = document.getElementById("game-board");
const triesEl  = document.getElementById("tries");
const restartBtn = document.getElementById("restart");

// --- BOOT ---
console.log("Memory game boot…");   // ndihmë debug
initGame();
restartBtn.addEventListener("click", initGame);


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

  const front = document.createElement("div");
  front.className = "card-face card-front";
  const frontImg = document.createElement("img");
  frontImg.src = value;
  frontImg.alt = "лице";
  front.appendChild(frontImg);

  inner.appendChild(back);
  inner.appendChild(front);
  card.appendChild(inner);
  card.addEventListener("click", onCardClick);
  return card;
}

function onCardClick(e) {
  const card = e.currentTarget;
  if (lockBoard) return;
  if (card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");

  if (!firstCard) { firstCard = card; return; }

  secondCard = card;
  tries++; triesEl.textContent = tries;
  lockBoard = true;

  if (isMatch(firstCard, secondCard)) {
    handleMatch();
  } else {
    setTimeout(unflipPair, FLIP_BACK_DELAY);
  }
}

function isMatch(a, b) { return a.dataset.value === b.dataset.value; }

function handleMatch() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  firstCard.removeEventListener("click", onCardClick);
  secondCard.removeEventListener("click", onCardClick);
  matchedPairs++;
  resetPick();

  if (matchedPairs === PAIRS) setTimeout(() => alert(WIN_MSG(tries)), 300);
}

function unflipPair() {
  if (firstCard) firstCard.classList.remove("flipped");
  if (secondCard) secondCard.classList.remove("flipped");
  resetPick();
}

function resetPick() { firstCard = null; secondCard = null; lockBoard = false; }

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
