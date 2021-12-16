// all messages
const messages = {
  ERR_INVALID_INPUTS: "Please enter valid data for each player.",
  ERR_NO_SUCH_ACTION: "No such action is allowed.",
  ERR_ACTION_CARD_NOK: "Currently, this card cannot be played.",
  ERR_BATTLE_PILE_EMPTY: 'You need a drive card to begin rolling.',
  ERR_BATTLE_PILE_RED: 'You cannot drive until your battle pile is green.',
  ERR_MAX_SWALLOW: 'You cannot play more than 2 swallow cards (200).',
  ERR_SPEED_LIMIT: 'You cannot drive faster than the speed limit.'
};

// display error message
function displayMsg(msg) {
  const msgElement = document.querySelector('#display-msg span');
  msgElement.textContent = msg;
}

function resetMsg() {
  const msgElement = document.querySelector('#display-msg span');
  msgElement.textContent = '';
}


export { messages, displayMsg, resetMsg }