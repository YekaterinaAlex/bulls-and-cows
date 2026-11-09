import { generateSecret } from './core/generateSecret.js';
import { isValidGuess } from './core/isValidGuess.js';
import { createDigitValidator } from './core/createDigitValidator.js';
import { evaluateGuess } from './core/evaluateGuess.js';
import { saveGameRecord } from './core/saveGameRecord.js';
import { getGameRecords } from './core/getGameRecords.js';

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
const revealSecret = (secret: string): void => {
  const secretDigits = secretContainer.querySelectorAll('.secret-digit');

  secretDigits.forEach((card, index) => {
    card.textContent = secret[index];
  });
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

const settingsRow = document.createElement('div');
settingsRow.className = 'settings-row';

lengthLabel.before(settingsRow);
settingsRow.append(lengthLabel, baseLabel);

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
let currentSecret = '';
const previousGuesses = new Set<string>();

startButton.addEventListener('click', () => {
  lengthSelect.disabled = true;
  baseSelect.disabled = true;

  startButton.textContent = 'New Game';
  gameStatus.textContent = 'Game started';
  guessInput.disabled = false;
  checkButton.disabled = false;
  stopButton.disabled = false;

  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);

  attempts = 0;
  attemptsCounter.textContent = 'Attempts: 0';
  previousGuesses.clear();
  errorMessage.textContent = '';
  historySection.replaceChildren(historyTitle, historyMessage);
  historyMessage.textContent = 'No guesses yet';
  guessInput.value = '';
  currentSecret = generateSecret(length, base);

  renderSecretCards(length);
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
guessInput.addEventListener('input', () => {
  errorMessage.textContent = '';
  const base = Number(baseSelect.value);
  const isAllowedDigit = createDigitValidator(base);

  const uniqueDigits = new Set<string>();

  guessInput.value = [...guessInput.value]
    .filter(isAllowedDigit)
    .filter((digit) => {
      const normalizedDigit = digit.toLowerCase();

      if (uniqueDigits.has(normalizedDigit)) {
        return false;
      }

      uniqueDigits.add(normalizedDigit);
      return true;
    })
    .slice(0, Number(lengthSelect.value))
    .join('');
});
guessLabel.append(guessInput);
document.body.append(guessLabel);

const checkButton = document.createElement('button');
checkButton.textContent = 'Check Guess';
checkButton.type = 'button';
checkButton.disabled = true;

document.body.append(checkButton);
const guessRow = document.createElement('div');
guessRow.className = 'guess-row';

guessLabel.before(guessRow);
guessRow.append(guessLabel, checkButton);

const errorMessage = document.createElement('p');
errorMessage.className = 'error-message';
errorMessage.setAttribute('role', 'alert');

document.body.append(errorMessage);

checkButton.addEventListener('click', () => {
  const guess = guessInput.value.trim().toLowerCase();
  const length = Number(lengthSelect.value);
  const base = Number(baseSelect.value);

  if (!isValidGuess(guess, length, base)) {
    errorMessage.textContent = 'Invalid guess! Check the digits and try again.';
    return;
  }
  if (previousGuesses.has(guess)) {
    errorMessage.textContent = 'You already tried this guess!';
    return;
  }
  errorMessage.textContent = '';
  previousGuesses.add(guess);
  const result = evaluateGuess(currentSecret, guess);

  console.log('Bulls:', result.bulls);
  console.log('Cows:', result.cows);

  historyMessage.remove();

  const historyItem = document.createElement('p');
  historyItem.textContent = `${guess} — 🐂 ${result.bulls} | 🐄 ${result.cows}`;
  attempts++;
  attemptsCounter.textContent = `Attempts: ${attempts}`;
  guessInput.value = '';
  historySection.append(historyItem);
  historyItem.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
  });

  if (result.bulls === length) {
    gameStatus.textContent = 'Congratulations! You won! 🏆';
    revealSecret(currentSecret);
    stopTimer();

    saveGameRecord({
      attempts: attempts,
      time: seconds,
      length: length,
      base: base,
    });
    renderLeaderboard();

    guessInput.disabled = true;
    checkButton.disabled = true;
    stopButton.disabled = true;
    lengthSelect.disabled = false;
    baseSelect.disabled = false;
    startButton.textContent = 'Start Game';
  }
});

guessInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    checkButton.click();
  }
});

const historySection = document.createElement('section');
historySection.className = 'history-section';
const historyTitle = document.createElement('title');
historyTitle.textContent = 'Guess History';

const historyMessage = document.createElement('p');
historyMessage.textContent = 'No guesses yet';
historySection.append(historyTitle, historyMessage);

document.body.append(historySection);

const leaderboardSection = document.createElement('section');
leaderboardSection.className = 'leaderboard-section';

const leaderboardTitle = document.createElement('h2');
leaderboardTitle.textContent = '🏆 Leaderboard';

leaderboardSection.append(leaderboardTitle);
document.body.append(leaderboardSection);

const renderLeaderboard = (): void => {
  const records = getGameRecords();

  records.sort((a, b) => {
    if (a.attempts !== b.attempts) {
      return a.attempts - b.attempts;
    }

    return a.time - b.time;
  });

  leaderboardSection.replaceChildren(leaderboardTitle);

  if (records.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No records yet';

    leaderboardSection.append(emptyMessage);
    return;
  }

  records.forEach((record) => {
    const recordItem = document.createElement('p');
    const system = numberSystems.find((item) => Number(item.base) === record.base);

    const baseName = system?.name ?? String(record.base);

    recordItem.textContent = `Length: ${record.length} | Base: ${baseName} | Attempts: ${record.attempts} | Time: ${record.time}s`;

    leaderboardSection.append(recordItem);
  });
};

renderLeaderboard();

let attempts = 0;

const attemptsCounter = document.createElement('p');
attemptsCounter.className = 'attempts-counter';
attemptsCounter.textContent = 'Attempts: 0';

document.body.append(attemptsCounter);

const timer = document.createElement('p');

timer.className = 'game-timer';
timer.textContent = 'Time: 00:00';

document.body.append(timer);

const statsRow = document.createElement('div');
statsRow.className = 'stats-row';

attemptsCounter.before(statsRow);
statsRow.append(attemptsCounter, timer);
statsRow.after(leaderboardSection);

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

const buttonsRow = document.createElement('div');
buttonsRow.className = 'buttons-row';

startButton.before(buttonsRow);
buttonsRow.append(startButton, stopButton);

stopButton.addEventListener('click', () => {
  stopTimer();

  revealSecret(currentSecret);
  guessInput.disabled = true;
  checkButton.disabled = true;
  stopButton.disabled = true;

  lengthSelect.disabled = false;
  baseSelect.disabled = false;

  startButton.textContent = 'Start Game';
  gameStatus.textContent = 'Game stopped.';
});
