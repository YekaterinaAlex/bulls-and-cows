const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';
document.body.append(title);

const secretContainer = document.createElement('div');
secretContainer.className = 'secret-container';

const renderSecretCards = (length: number): void => {
  secretContainer.replaceChildren();
  for (let i = 0; i < length; i++) {
    const digit = document.createElement('div');
    digit.className = 'secret-digit';
    digit.textContent = '?';

    secretContainer.append(digit);
  }
};
renderSecretCards(4);
document.body.append(secretContainer);

const lengthLabel = document.createElement('label');
lengthLabel.textContent = 'Secret number length: ';

const lengthSelect = document.createElement('select');

for (let i = 2; i <= 6; i++) {
  const option = document.createElement('option');

  option.value = String(i);
  option.textContent = String(i);

  lengthSelect.append(option);
}

lengthSelect.value = '4';
lengthSelect.addEventListener('change', () => {
  const length = Number(lengthSelect.value);
  renderSecretCards(length);
});

lengthLabel.append(lengthSelect);
document.body.append(lengthLabel);

const baseLabel = document.createElement('label');
baseLabel.textContent = 'Number system: ';

const baseSelect = document.createElement('select');

const numberSystems = [
  { name: 'bin', base: '2' },
  { name: 'oct', base: '8' },
  { name: 'dec', base: '10' },
  { name: 'hex', base: '16' },
];

for (const system of numberSystems) {
  const option = document.createElement('option');

  option.value = String(system.base);
  option.textContent = String(system.name);
  baseSelect.append(option);
}

baseSelect.value = '10';

baseLabel.append(baseSelect);
document.body.append(baseLabel);

baseSelect.addEventListener('change', () => {
  const base = Number(baseSelect.value);

  for (const option of Array.from(lengthSelect.options)) {
    option.disabled = Number(option.value) > base;

    if (Number(lengthSelect.value) > base) {
      lengthSelect.value = '2';
      renderSecretCards(2);
    }
  }
});

const startButton = document.createElement('button');
startButton.textContent = 'Start Game';
startButton.type = 'button';

document.body.append(startButton);

const gameStatus = document.createElement('p');
gameStatus.className = 'game-status';
document.body.append(gameStatus);

startButton.addEventListener('click', () => {
  lengthSelect.disabled = true;
  baseSelect.disabled = true;

  startButton.textContent = 'New Game';
  gameStatus.textContent = 'Game started';
  guessInput.disabled = false;
  checkButton.disabled = false;
  stopButton.disabled = false;

  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
  }
  seconds = 0;
  updateTimer();

  timerInterval = window.setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
});

const guessLabel = document.createElement('label');
guessLabel.textContent = 'Your Guess';

const guessInput = document.createElement('input');

guessInput.type = 'text';
guessInput.placeholder = 'Enter your guess';
guessInput.autocomplete = 'off';
guessInput.disabled = true;

guessLabel.append(guessInput);
document.body.append(guessLabel);

const checkButton = document.createElement('button');
checkButton.textContent = 'Check Guess';
checkButton.type = 'button';
checkButton.disabled = true;

document.body.append(checkButton);

const historySection = document.createElement('section');
historySection.className = 'history-section';
const historyTitle = document.createElement('title');
historyTitle.textContent = 'Guess History';

const historyMessage = document.createElement('p');
historyMessage.textContent = 'No guesses yet';
historySection.append(historyTitle, historyMessage);

document.body.append(historySection);

const attemptsCounter = document.createElement('p');
attemptsCounter.className = 'attempts-counter';
attemptsCounter.textContent = 'Attempts: 0';

document.body.append(attemptsCounter);

const timer = document.createElement('p');

timer.className = 'game-timer';
timer.textContent = 'Time: 00:00';

document.body.append(timer);

let seconds = 0;
let timerInterval: number | null = null;

const updateTimer = (): void => {
  const minutes = Math.floor(seconds / 60);
  const remainSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainSeconds).padStart(2, '0');

  timer.textContent = `Time: ${formattedMinutes}:${formattedSeconds}`;
};

const stopTimer = (): void => {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
};

const stopButton = document.createElement('button');

stopButton.textContent = 'Stop Game';
stopButton.type = 'button';
stopButton.disabled = true;
stopButton.id = 'stop-button';

startButton.after(stopButton);

stopButton.addEventListener('click', () => {
  stopTimer();

  guessInput.disabled = true;
  checkButton.disabled = true;
  stopButton.disabled = true;

  lengthSelect.disabled = false;
  baseSelect.disabled = false;

  startButton.textContent = 'Start Game';
  gameStatus.textContent = 'Game stopped.';
});
