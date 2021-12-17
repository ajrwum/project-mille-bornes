// all imports
import { GAME_INIT_DEFAULT, STORAGE_NAME } from "./data.js";
import { messages, displayMsg, resetMsg } from "./messages.js";

// storage to pass, set with default values
let storage = {
  player1: {name: 'PLAYER 1', age: 30},
  player2: {name: 'PLAYER 2', age: 53},
  mode: {name: 'shortcut'},
};

// set localStorage
function setInputsIntoLocalStorage(storage) {
  // console.log(`--- setInputsIntoLocalStorage: storage`, storage);
  localStorage.setItem(STORAGE_NAME, JSON.stringify(storage));
}

// check inputs for players and store them in localStorage
function areAllInputsForPlayersOkAndStored(targetMode) {
  // console.log(`targetMode`, targetMode, targetMode.id, targetMode.checked);
  // getting dom elements
  const p1name = document.getElementById("p1-firstname").value;
  const p1age = Number(document.getElementById("p1-age").value);
  const p2name = document.getElementById("p2-firstname").value;
  const p2age = Number(document.getElementById("p2-age").value);
  // testing inputs
  if (p1name && p1age && p2name && p2age) {
    if (p1age > 0 && p2age > 0) {
      // updating storage with inputs
      storage = {
        player1: {name: p1name, age: p1age},
        player2: {name: p2name, age: p2age},
        mode: {name: targetMode.id},            
      };
      // setting storage to localStorage
      setInputsIntoLocalStorage(storage);
      return true;
    }
    return false;
  }
  return false;
}

// set event listeners on buttons
const rollBtn = document.getElementById('link');
const gameMode = document.querySelector('#mode .mode');
gameMode.addEventListener('click', (event) => {
  if (areAllInputsForPlayersOkAndStored(event.target)) {
    resetMsg();
    // adding the link to the game page
    rollBtn.innerHTML = `<a id="roll" href="./main.html">LET'S ROLL!</a>`;
  }
  else {
    // reset of gameMode input to allow new control of inputs when necessary
    event.target.checked = false;
    displayMsg(messages.ERR_INVALID_INPUTS);
  }
});



