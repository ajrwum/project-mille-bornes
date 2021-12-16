// all messages
const messages = {
  ERR_INVALID_INPUTS: "Please enter valid data for each player.",

  ERR_NO_SUCH_ACTION: "Please choose an action.",
  ERR_ACTION_CARD_NOK: "Currently, this card cannot be played.",

  ERR_BATTLE_PILE_EMPTY: 'You need a drive card to begin rolling.',
  ERR_BATTLE_PILE_RED: 'You cannot drive until your battle pile is green.',
  ERR_MAX_SWALLOW: 'You cannot play more than 2 swallow cards (200).',
  ERR_SPEED_LIMIT: 'You cannot drive faster than the speed limit.',
  
  ERR_CARD_NOT_DEFENSE: 'The chosen card is not a defense card.',
  ERR_DRIVE_REMEDY_USELESS: 'You do not need a drive remedy card.',
  ERR_SPEED_REMEDY_USELESS: 'You do not need an speed limit remedy card.',
  ERR_GAS_REMEDY_USELESS: 'You do not need a gas remedy.',
  ERR_TIRE_REMEDY_USELESS: 'You do not need a tire remedy.',
  ERR_ACCIDENT_REMEDY_USELESS: 'You do not need an accident remedy.',
  ERR_NEED_REPAIR_REMEDY: 'You need a repair remedy before drive.',

  ERR_CARD_NOT_ATTACK: 'The chosen card is not an attack card.',
  ERR_DRIVE_ATTACK_USELESS: 'You cannot use a drive attack card.',
  ERR_SPEED_ATTACK_USELESS: 'You cannot use a speed limit attack card.',
  ERR_GAS_ATTACK_USELESS: 'You cannot use a gas attack.',
  ERR_TIRE_ATTACK_USELESS: 'You cannot use a tire attack.',
  ERR_ACCIDENT_ATTACK_USELESS: 'You cannot use an accident attack.',
  ERR_NEED_REPAIR_ATTACK: 'You cannot play an attack card on another.',

  LOSER_PART1: "SORRY ",
  LOSER_PART2: ", YOU'VE GONE BEYOND ",
  LOSER_PART3: " MILES, YOU LOSE...",

  WINNER_PART1: " MILES DONE!  CONGRATS, ",
  WINNER_PART2: " , YOU WIN!!!",
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