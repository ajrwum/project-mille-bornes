// game init default data
export const ID_P1 = 1;
export const ID_P2 = 2;

export const GAME_INIT_DEFAULT = {
  player1: {name: 'PLAYER 1', age: 30},
  player2: {name: 'PLAYER 2', age: 53},
  mode: {name: 'shortcut'},
};

export const PLAYER_ACTION = {
  drive: 'Drive',
  defend: 'Defend',
  attack: 'Attack',
  discard: 'Discard',
};


// driving distance depending on distance card name
export const CARD_DISTANCE_VALUE = {
  snail: 25,
  duck: 50,
  butterfly: 75,
  rabbit: 100,
  swallow: 200,
};

// about swallow distance cards
export const SWALLOW_CARD_NAME = 'swallow';
export const MAX_SWALLOW_ALLOWED = 2;
export const CLASS_NAME_HIGHLIGHT = 'highlight';


// max distance depending on game mode
export const GAME_MAX_DISTANCE = {
  shortcut: 400,
  interstate: 700,
  scenicroute: 1000,
};


// localStorage related
export const STORAGE_NAME = "mille-bornes-init";


// player hand
export const HAND_MAX_INDEX = 5; // 6 cards in hand
export const DRAWN_CARD_INDEX = 6; // last index is used for the drawn card
export const HAND_PILE_MAX_LENGTH = 7; // hand pile length with the drawn card


