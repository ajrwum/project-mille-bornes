// all imports
import { ID_P1, ID_P2, GAME_INIT_DEFAULT, PLAYER_ACTION,
  STORAGE_NAME, TURN_WAIT_DURATION,
  HAND_MAX_INDEX, DRAWN_CARD_INDEX, HAND_PILE_MAX_LENGTH,
  CLASS_NAME_HIGHLIGHT, 
  GAME_MAX_DISTANCE} from "./data.js";
import { cards, noCard, turnedCard } from "./cards.js";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { messages, displayMsg, resetMsg } from "./messages.js";

// console.log('=== 1000 Bornes - main.js - debug log ===');

// setting the board
const board = new Board(cards, GAME_INIT_DEFAULT.mode);

// settings 2 players, at first with static data
const p1 = new Player(ID_P1, GAME_INIT_DEFAULT.player1.name, GAME_INIT_DEFAULT.player1.age);
const p2 = new Player(ID_P2, GAME_INIT_DEFAULT.player2.name, GAME_INIT_DEFAULT.player2.age);

// init boolean to be able to hold on drawing until no error is detected
let isGameOnHold = false;

// init current actionCard
let currentActionCard = {
  playAction: null,
  // playAction: PLAYER_ACTION.drive,
  playCard: noCard
};

function resetCurrentActionCard() {
  currentActionCard = {
    playAction: null,
    playCard: noCard
  };
}

// init the timeoutId
let timeoutId;

// init current and next player id (1 to begin the game)
let currentPlayerId = 1;
let nextPlayerId = null;

// get localStorage
function getLocalStorage() {
  // getting the object stored
  let gameInitData = JSON.parse(localStorage.getItem(STORAGE_NAME));
  
  // testing its existence
  if (gameInitData === null || gameInitData === undefined) {
    gameInitData = JSON.parse(JSON.stringify(GAME_INIT_DEFAULT));
  }
  // console.log(gameInitData);

  // returning the necessary data to begin the game
  return gameInitData;
}

// remove localStorage
// function removeLocalStorage() {
//   localStorage.removeItem(STORAGE_NAME);
// }

// get who is the 1st player (rule states p1 should be the youngest)
function setPlayers(inputs) {
  if (inputs.player1.age < inputs.player2.age) {
    // player1 is younger than player2
    p1.name = inputs.player1.name;
    p1.age = inputs.player1.age;
    p2.name = inputs.player2.name;
    p2.age = inputs.player2.age;
  }
  else if (inputs.player1.age > inputs.player2.age) {
    // player2 is younger than player1
    p1.name = inputs.player2.name;
    p1.age = inputs.player2.age;
    p2.name = inputs.player1.name;
    p2.age = inputs.player1.age;
  }
  else {
    // if no age difference, go for alphabetical on names
    if (p1.name <= p2.name) {
      p1.name = inputs.player1.name;
      p1.age = inputs.player1.age;
      p2.name = inputs.player2.name;
      p2.age = inputs.player2.age;  
    }
    else {
      p1.name = inputs.player2.name;
      p1.age = inputs.player2.age;
      p2.name = inputs.player1.name;
      p2.age = inputs.player1.age;  
    }
  }
}

// getting the current player
function getCurrentPlayer() {
  const player = currentPlayerId === p1.id ? p1 : p2;
  return player;
}

// getting the current player
function getSecondPlayer() {
  const player = currentPlayerId === p1.id ? p2 : p1;
  return player;
}

// to deal first hand to players
function dealCardsToPlayers(cards) {
  // console.log('--- dealCardsToPlayers');
  // deal cards one by one to players 1 and 2
  for (let i=0 ; i <= HAND_MAX_INDEX ; i++) {
    // drawing a card, placing it into the playPile (game history) and in p1 hand
    const dealtCard1 = board.drawingPile.shift();
    board.playPile.unshift(dealtCard1);
    p1.handPile.unshift(dealtCard1);
    // drawing a card, placing it into the playPile (game history) and in p2 hand
    const dealtCard2 = board.drawingPile.shift();
    board.playPile.unshift(dealtCard2);
    p2.handPile.unshift(dealtCard2);
  }
}

// to draw a card from the drawing pile to complete player's hand before play
function drawCardFromDrawingPile(player) {
  // console.log('--- drawCardFromDrawingPile');
  
  // clearing old timeout
  clearTimeout(timeoutId);

  // displaying a message warning for player change
  displayMsg(`${getCurrentPlayer().name.toUpperCase()}, GET READY FOR YOUR TURN...`);

  // setting display 'none' for current player while waiting
  const currentPlayer = getCurrentPlayer();
  const currentPlayerHandElement = document.querySelector(`#player${currentPlayer.id}-hand`);
  currentPlayerHandElement.style.display = 'none';
  // setting display 'none' for second player while waiting
  const secondPlayer = getSecondPlayer();
  const secondPlayerHandElement = document.querySelector(`#player${secondPlayer.id}-hand`);
  secondPlayerHandElement.style.display = 'none';

  
  // setting timeout to give time to players to change place
  timeoutId = setTimeout(() => {
    // resetting message display before new drawing
    resetMsg();
    
    if (board.drawingPile.length === 0) {
      // renewing drawing pile with the discard pile
      board.renewFromDiscardPile();
    }
    // drawing a card, placing it into the playPile (game history) and in the player hand
    const drawnCard = board.drawingPile.shift();
    board.playPile.unshift(drawnCard);
    // placing it also in the adequate player hand
    player.handPile[DRAWN_CARD_INDEX] = drawnCard;
    
    // updating dom for both players
    writePlayerHandHtml(getCurrentPlayer());
    writePlayerHandHtml(getSecondPlayer());
    
    // adding new event listeners to the players' hands
    listenPlayerHandHtml(getCurrentPlayer());
    listenPlayerHandHtml(getSecondPlayer());

  }, TURN_WAIT_DURATION);
}

// to highlight the last chosen card
function highlightLastChosenCard(target) {
  // update classList to visually show the chosen card
  document.querySelectorAll('#hands .card').forEach(card => {
    if (card.classList.contains(CLASS_NAME_HIGHLIGHT)) card.classList.remove(CLASS_NAME_HIGHLIGHT);
    if (card === target.closest('div')) card.classList.add(CLASS_NAME_HIGHLIGHT);
  });
  // update the actionCard object accordingly
  const cardId = Number(target.getAttribute("card-id"));
  currentActionCard.playCard = getCurrentPlayer().handPile.find(card => card.id === cardId);
}

// to update the game when the played card is a safety card
function playWithSafetyCard(playedCard) {
  // console.log(`--- playWithSafetyCard: playedCard`, playedCard);
  // always allowed whatever the action (drive, defend or attack)
  
  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(playedCard);
  
  
  // testing the coup fourre considering the last card played
  let isCoupFourre = false;
  if (board.playPile.length > 0 && board.playPile[0].type === 'hazard') {
    if (playedCard.name === 'ev' && board.playPile[0].name === 'stop') isCoupFourre = true;
    else if (playedCard.name === 'ev' && board.playPile[0].name === 'speed') isCoupFourre = true;
    else if (playedCard.name === 'ft' && board.playPile[0].name === 'gas') isCoupFourre = true;
    else if (playedCard.name === 'pp' && board.playPile[0].name === 'tire') isCoupFourre = true;
    else if (playedCard.name === 'da' && board.playPile[0].name === 'accident') isCoupFourre = true;
  }
  // - removing this card from player's hand and saving it into play history
  const safetyCard = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
  board.playPile.unshift(safetyCard);
  // - adding this card into the discard pile
  currentPlayer.safetyPile.unshift(safetyCard);
  // - updating safety status for the player
  currentPlayer.updateSafetyStatus(isCoupFourre);
  
  // - discarding, if necessary, the nulled hazard card from the player's battle or speed pile
  let hazardCardToDiscard;
  if (currentPlayer.speedPile.length > 0) {
    if (currentPlayer.speedPile[0].type === 'hazard') {
      if (currentPlayer.speedPile[0].name === 'speed' && playedCard.name === 'ev') {
        hazardCardToDiscard = currentPlayer.speedPile.splice(0, 1)[0];
      }
    }
  }
  if (currentPlayer.battlePile.length > 0) {
    if (currentPlayer.battlePile[0].type === 'hazard') {
      if ((currentPlayer.battlePile[0].name === 'stop' && playedCard.name === 'ev')
          || (currentPlayer.battlePile[0].name === 'gas' && playedCard.name === 'ft')
          || (currentPlayer.battlePile[0].name === 'tire' && playedCard.name === 'pp')
          || (currentPlayer.battlePile[0].name === 'accident' && playedCard.name === 'da')) {
        hazardCardToDiscard = currentPlayer.battlePile.splice(0, 1)[0];
      }
    }
  }
  if (hazardCardToDiscard) board.discardPile.unshift(hazardCardToDiscard);
  
  // setting the next player id to her/himself because of the safety card
  nextPlayerId = currentPlayer.id;
} 

// to update the game for the played card to drive
function isCardOkToDrive(playedCard, currentPlayer) {
  let msg = '';
  const isSpeedPileEmpty = currentPlayer.speedPile.length === 0 ? true : false;
  const isBattlePileEmpty = currentPlayer.battlePile.length === 0 ? true : false;

  // testing the card type
  if (playedCard.type === 'distance') {
    if (isBattlePileEmpty) return messages.ERR_BATTLE_PILE_EMPTY;
    else {
      if (currentPlayer.battlePile[0].type === 'hazard') return messages.ERR_NO_ROLLING_UNDER_ATTACK;
      else {
        if (currentPlayer.isEmergencyVehicle.status === true || currentPlayer.battlePile[0].name === 'drive') {
          if (isSpeedPileEmpty || currentPlayer.speedPile[0].type === 'remedy') {
            // no speed limit: test on swallow
            if (playedCard.name === 'swallow')
              return currentPlayer.countSwallows() < 2 ? msg : messages.ERR_MAX_SWALLOW;
            else return msg;
          }
          else {
            // speed limit in place
            switch (playedCard.name) {
              case 'snail':
              case 'duck':
                return msg;
                break;

              case 'butterfly':
              case 'rabbit':
              case 'swallow':
                return messages.ERR_SPEED_LIMIT;
                break;

              default:
                return messages.ERR_ACTION_CARD_NOK;
                break;
            }
          }
        }
        else return messages.ERR_NEED_DRIVE_AFTER_ATTACK;
      }
    }
  }
  else return messages.ERR_CARD_NOT_DISTANCE;

}
function playCardToDrive(playedCard) {
  // console.log(`--- playCardToDrive: playedCard`, playedCard);

  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(playedCard);

  const msg = isCardOkToDrive(playedCard, currentPlayer);
  if (msg) {
    displayMsg(msg);
    // indicating a hold for new card drawing
    isGameOnHold = true;
  }
  else {
    isGameOnHold = false;
    // removing the card from handPile and saving it into play history
    const cardToMove = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
    board.playPile.unshift(cardToMove);
    // tests for placement location
    if (playedCard.name === 'drive') {
      // placing it on battlePile
      currentPlayer.battlePile.unshift(cardToMove);
    }
    if (playedCard.type === 'distance') {
      // placing it on distancePile
      currentPlayer.distancePile.unshift(cardToMove);
    }
    
    // setting the next player id to the 2nd player
    nextPlayerId = secondPlayer.id;
  }
}

// to update the game for the played card to defend
function isCardOkToDefend(playedCard, currentPlayer) {
  let msg = '';
  const isSpeedPileEmpty = currentPlayer.speedPile.length === 0 ? true : false;
  const isBattlePileEmpty = currentPlayer.battlePile.length === 0 ? true : false;

  if (playedCard.type === 'remedy') {
    switch (playedCard.name) {
      case 'drive':
        if (currentPlayer.isEmergencyVehicle.status === true) {
          return messages.ERR_DRIVE_REMEDY_USELESS;
        }
        else {
          if (!isBattlePileEmpty) {
            if (currentPlayer.battlePile[0].type === 'hazard') {
              if (currentPlayer.battlePile[0].name === 'stop') return msg;
              else return messages.ERR_NEED_REPAIR_REMEDY;
            }
            else{
              if (currentPlayer.battlePile[0].name !== 'drive') return msg;
              else return messages.ERR_DRIVE_REMEDY_USELESS;;
            }
          }
          else return msg;
        }
        break;

      case 'speed':
        if (currentPlayer.isEmergencyVehicle.status === true) {
          return messages.ERR_SPEED_REMEDY_USELESS;
        }
        else {
          if (isSpeedPileEmpty) {
            return messages.ERR_SPEED_REMEDY_USELESS;
          }
          else {
            if (currentPlayer.speedPile[0].type === 'hazard') return msg;
            else return messages.ERR_SPEED_REMEDY_USELESS;
          }
        };
        break;

      case 'gas':
        if (currentPlayer.isFuelTruck.status === true) {
          return messages.ERR_GAS_REMEDY_USELESS;
        }
        else {
          if (isBattlePileEmpty) {
            return messages.ERR_GAS_REMEDY_USELESS;
          }
          else {
            if (currentPlayer.battlePile[0].type === 'hazard') {
              if (currentPlayer.battlePile[0].name === 'gas') return msg;
              else return messages.ERR_GAS_REMEDY_USELESS;
            }
            else return messages.ERR_GAS_REMEDY_USELESS;
          }
        }
        break;

      case 'tire':
        if (currentPlayer.isPunctureProof.status === true) {
          return messages.ERR_TIRE_REMEDY_USELESS;
        }
        else {
          if (isBattlePileEmpty) {
            return messages.ERR_TIRE_REMEDY_USELESS;
          }
          else {
            if (currentPlayer.battlePile[0].type === 'hazard') {
              if (currentPlayer.battlePile[0].name === 'tire') return msg;
              else return messages.ERR_TIRE_REMEDY_USELESS;
            }
            else return messages.ERR_TIRE_REMEDY_USELESS;
          }
        }
        break;

      case 'accident':
        if (currentPlayer.isDrivingAce.status === true) {
          return messages.ERR_ACCIDENT_REMEDY_USELESS;
        }
        else {
          if (isBattlePileEmpty) {
            return messages.ERR_ACCIDENT_REMEDY_USELESS;
          }
          else {
            if (currentPlayer.battlePile[0].type === 'hazard') {
              if (currentPlayer.battlePile[0].name === 'accident') return msg;
              else return messages.ERR_ACCIDENT_REMEDY_USELESS;
            }
            else return messages.ERR_ACCIDENT_REMEDY_USELESS;
          }
        }
        break;

      default:
        return messages.ERR_ACTION_CARD_NOK;
        break;
    }
  }
  else return messages.ERR_CARD_NOT_DEFENSE;
}
function playCardToDefend(playedCard) {
  // console.log(`--- playCardToDefend: playedCard`, playedCard);
  
  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(playedCard);

  const msg = isCardOkToDefend(playedCard, currentPlayer);
  if (msg) {
    displayMsg(msg);
    // indicating a hold for new card drawing
    isGameOnHold = true;
  }
  else {
    isGameOnHold = false;
    // removing the card from handPile and saving it into play history
    const cardToMove = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
    board.playPile.unshift(cardToMove);
    // test for placement location
    if (playedCard.name === 'speed') {
      // placing it on speedPile
      currentPlayer.speedPile.unshift(cardToMove);
    }
    else {
      // placing it on battlePile
      currentPlayer.battlePile.unshift(cardToMove);
    }
    
    // setting the next player id to the 2nd player
    nextPlayerId = secondPlayer.id;
  }

}  

// to update the game for the played card to attack
function isCardOkToAttack(playedCard, opponent) {
  let msg = '';
  const isOpponentSpeedPileEmpty = opponent.speedPile.length === 0 ? true : false;
  const isOpponentBattlePileEmpty = opponent.battlePile.length === 0 ? true : false;

  if (playedCard.type === 'hazard') {
    switch (playedCard.name) {
      case 'stop':
        if (opponent.isEmergencyVehicle.status === true) {
          return messages.ERR_DRIVE_ATTACK_USELESS;
        }
        else {
          if (!isOpponentBattlePileEmpty) {
            if (opponent.battlePile[0].type === 'hazard') {
              return messages.ERR_OPP_ALREADY_UNDER_ATTACK;
            }
            else{
              if (opponent.battlePile[0].name === 'drive') return msg;
              else return messages.ERR_OPP_NOT_ROLLING;
            }
          }
          else return messages.ERR_OPP_NOT_STARTED;
        }
        break;

      case 'speed':
        if (opponent.isEmergencyVehicle.status === true) {
          return messages.ERR_SPEED_ATTACK_USELESS;
        }
        else {
          if (isOpponentSpeedPileEmpty) return msg;
          else {
            if (!opponent.speedPile[0].type === 'hazard') return msg;
            else return messages.ERR_OPP_ALREADY_UNDER_ATTACK;
          }
        };
        break;

      case 'gas':
        if (opponent.isFuelTruck.status === true) {
          return messages.ERR_GAS_ATTACK_USELESS;
        }
        else {
          if (!isOpponentBattlePileEmpty) {
            if (opponent.battlePile[0].type === 'hazard') {
              return messages.ERR_OPP_ALREADY_UNDER_ATTACK;
            }
            else{
              if (opponent.battlePile[0].name === 'drive') return msg;
              else return messages.ERR_OPP_NOT_ROLLING;
            }
          }
          else return messages.ERR_OPP_NOT_STARTED;
        }
        break;

      case 'tire':
        if (opponent.isPunctureProof.status === true) {
          return messages.ERR_TIRE_ATTACK_USELESS;
        }
        else {
          if (!isOpponentBattlePileEmpty) {
            if (opponent.battlePile[0].type === 'hazard') {
              return messages.ERR_OPP_ALREADY_UNDER_ATTACK;
            }
            else{
              if (opponent.battlePile[0].name === 'drive') return msg;
              else return messages.ERR_OPP_NOT_ROLLING;
            }
          }
          else return messages.ERR_OPP_NOT_STARTED;
        }
        break;

      case 'accident':
        if (opponent.isDrivingAce.status === true) {
          return messages.ERR_ACCIDENT_ATTACK_USELESS;
        }
        else {
          if (!isOpponentBattlePileEmpty) {
            if (opponent.battlePile[0].type === 'hazard') {
              return messages.ERR_OPP_ALREADY_UNDER_ATTACK;
            }
            else{
              if (opponent.battlePile[0].name === 'drive') return msg;
              else return messages.ERR_OPP_NOT_ROLLING;
            }
          }
          else return messages.ERR_OPP_NOT_STARTED;
        }
        break;

      default:
        return messages.ERR_ACTION_CARD_NOK;
        break;
    }
  }
  else return messages.ERR_CARD_NOT_ATTACK;


}
function playCardToAttack(playedCard) {
  // console.log(`--- playCardToAttack: playedCard`, playedCard);

  const currentPlayer = getCurrentPlayer();
  const opponentPlayer = getSecondPlayer();
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(playedCard);

  const msg = isCardOkToAttack(playedCard, opponentPlayer);
  if (msg) {
    displayMsg(msg);
    // indicating a hold for new card drawing
    isGameOnHold = true;
  }
  else {
    isGameOnHold = false;
    // removing the card from handPile and saving it into play history
    const cardToMove = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
    board.playPile.unshift(cardToMove);
    // test for placement location
    if (playedCard.name === 'speed') {
      // placing it on the opponent's speedPile
      opponentPlayer.speedPile.unshift(cardToMove);
    }
    else {
      // placing it on the opponent's battlePile
      opponentPlayer.battlePile.unshift(cardToMove);
    }

    // setting the next player id to the 2nd player
    nextPlayerId = opponentPlayer.id;
  }

}  

// to update the game for the played card to discard
function playCardToDiscard(playedCard) {
  // console.log(`--- playCardToDiscard: playedCard`, playedCard);

  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(playedCard);

  // no restriction on this move: any card can be discarded
  // - removing this card from player's hand and saving it into play history
  const cardToDiscard = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
  board.playPile.unshift(cardToDiscard);
  // - adding this card into the discard pile
  board.discardPile.unshift(cardToDiscard);

  // setting the next player id to the 2nd player
  nextPlayerId = secondPlayer.id;
}  

// to check the validity of the combination action + card
function playActionAndCard(playActionCard) {
  // console.log(`--- playActionAndCard: playActionCard`, playActionCard);
  isGameOnHold = false;

  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const action = playActionCard.playAction;
  const card = playActionCard.playCard;
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(card);

  if (action !== null && card !== noCard) {
    // ok to look further
    switch(action) {
      case PLAYER_ACTION.discard:
        // console.log('--- - action discard');
        playCardToDiscard(card);
        break;
        
      case PLAYER_ACTION.drive:
        // console.log('--- - action drive');
        if (card.type === 'safety') playWithSafetyCard(card);
        else playCardToDrive(card);
        break;
        
      case PLAYER_ACTION.defend:
        // console.log('--- - action defend');
        if (card.type === 'safety') playWithSafetyCard(card);
        else playCardToDefend(card);
        break;

      case PLAYER_ACTION.attack:
        // console.log('--- - action attack');
        if (card.type === 'safety') playWithSafetyCard(card);
        else playCardToAttack(card);
        break;

      default:
        displayMsg(messages.ERR_NO_SUCH_ACTION);
        isGameOnHold = true;
        break;
    }
  }
  else {
    // display msg and hold
    displayMsg(messages.ERR_NO_SUCH_ACTION);
    isGameOnHold = true;
  }

  // updating the game entire screen after the play
  // - loading the driving zones for both players
  writePlayerDrivingZoneHtml(currentPlayer);
  writePlayerDrivingZoneHtml(secondPlayer);
  // - loading the board
  writeBoardHtml(board);
  // - loading the hands of both players
  writePlayerHandHtml(currentPlayer);
  writePlayerHandHtml(secondPlayer);

  // adding new event listeners to the players' hands
  listenPlayerHandHtml(getCurrentPlayer())
  listenPlayerHandHtml(getSecondPlayer())

  // - resetting the currentActionCard for the next round
  resetCurrentActionCard();

  // checking if there is a winner yet
  isGameFinished();
}

// to write the html for a player's driving zone
function writePlayerDrivingZoneHtml(player) {
  const cssSelector = `#player${player.id}-play`;
  // classLists for safety badges display
  const classSafetyEV = player.isEmergencyVehicle.status
                          ? player.isEmergencyVehicle.coupfourre ? 'on coup-fourre' : 'on'
                          : 'off';
  const classSafetyFT = player.isFuelTruck.status
                          ? player.isFuelTruck.coupfourre ? 'on coup-fourre' : 'on'
                          : 'off';
  const classSafetyPP = player.isPunctureProof.status
                          ? player.isPunctureProof.coupfourre ? 'on coup-fourre' : 'on'
                          : 'off';
  const classSafetyDA = player.isDrivingAce.status
                          ? player.isDrivingAce.coupfourre ? 'on coup-fourre' : 'on'
                          : 'off';
  // testing if speed or battle piles are empty to display the pile's top card (index 0) if possible
  const speedCard = player.speedPile.length === 0 ? noCard : player.speedPile[0];
  const battleCard = player.battlePile.length === 0 ? noCard : player.battlePile[0];
  // preparing and loading the html
  const playerDrivingZone = `
  <div class="name"><span>${player.name.toUpperCase()}</span></div>
  <div class="safety blue">
    <div class="${classSafetyEV}"> <img src="./img/icon-ev-2.png" alt="emergency vehicle safety"> </div>
    <div class="${classSafetyFT}"> <img src="./img/icon-ft-2.png" alt="fuel tank safety"> </div>
    <div class="${classSafetyPP}"> <img src="./img/icon-pp-2.png" alt="puncture proof safety"> </div>
    <div class="${classSafetyDA}"> <img src="./img/icon-da-2.png" alt="driving ace safety"> </div>
  </div>
  <div class="distance">
    <div class="km-counter"><span>${player.countDistance()}</span></div>
    <div class="swallow-counter"><span>${player.countSwallows()}</span> <img src="./img/icon-swallow.png" alt="swallow icon"> </div>
  </div>
  <div class="driving">
    <div class="speed"> <img src="${speedCard.img}" alt="${speedCard.alt}"> </div>
    <div class="battle"> <img src="${battleCard.img}" alt="${battleCard.alt}"> </div>
  </div>
  `;
  document.querySelector(cssSelector).innerHTML = playerDrivingZone;
}

// to write the html for the board section
function writeBoardHtml(board) {
  const cssSelector = `#board`;
  // testing if discard pile is empty
  const discardCard = board.discardPile.length === 0 ? noCard : board.discardPile[0];
  // preparing and loading the html
  const boardHtml = `
  <div id="drawing-pile" class="card"> <img src="${turnedCard.img}" alt="${turnedCard.alt}"> </div>
  <div id="discard-pile" class="card"> <img src="${discardCard.img}" alt="${discardCard.alt}"> </div>
  `;
  document.querySelector(cssSelector).innerHTML = boardHtml;
}

// to write the html for a player's hand
function writePlayerHandHtml(player) {
  const cssSelector = `#player${player.id}-hand`;
  const playerHandElement = document.querySelector(cssSelector);
  // console.log(`--- writePlayerHandHtml: playerHandElement`, playerHandElement);

  // testing if there is a drawn card or not
  const drawnCard = player.handPile.length < HAND_PILE_MAX_LENGTH
                      ? noCard
                      : player.handPile[DRAWN_CARD_INDEX];
  // preparing and loading the html
  const playerHandHtml = `
  <div class="submit">
    <div class="name">${player.name.toUpperCase()}'S TURN</div>
    <div><button>Let's Drive</button></div>
  </div>
  <div id="play${player.id}">
    <div>
      <p>Choose an action:</p>
    </div>
    <div class="action">
      <div>
        <input type="radio" name="action-player${player.id}" id="drive${player.id}">
        <label for="drive${player.id}">Drive</label>
      </div>
      <div>
        <input type="radio" name="action-player${player.id}" id="defend${player.id}">
        <label for="defend${player.id}">Defend</label>
      </div>
      <div>
        <input type="radio" name="action-player${player.id}" id="attack${player.id}">
        <label for="attack${player.id}">Attack</label>
      </div>
      <div>
        <input type="radio" name="action-player${player.id}" id="discard${player.id}">
        <label for="discard${player.id}">Discard</label>
      </div>
    </div>
    <div class="hand">
      <div id="p${player.id}-new-card">
        <div><p>Then a card:</p></div>
        <div class="card"> <img card-id="${drawnCard.id}" src="${drawnCard.img}" alt="${drawnCard.alt}"> </div>
      </div>
      <div id="p${player.id}-old-cards">
        <div class="card"> <img card-id="${player.handPile[0].id}" src="${player.handPile[0].img}" alt="${player.handPile[0].alt}"> </div>
        <div class="card"> <img card-id="${player.handPile[1].id}" src="${player.handPile[1].img}" alt="${player.handPile[1].alt}"> </div>
        <div class="card"> <img card-id="${player.handPile[2].id}" src="${player.handPile[2].img}" alt="${player.handPile[2].alt}"> </div>
        <div class="card"> <img card-id="${player.handPile[3].id}" src="${player.handPile[3].img}" alt="${player.handPile[3].alt}"> </div>
        <div class="card"> <img card-id="${player.handPile[4].id}" src="${player.handPile[4].img}" alt="${player.handPile[4].alt}"> </div>
        <div class="card"> <img card-id="${player.handPile[5].id}" src="${player.handPile[5].img}" alt="${player.handPile[5].alt}"> </div>
      </div>
    </div>
  </div>
  `;
  playerHandElement.innerHTML = playerHandHtml;

  // hiding the hand not belonging to the current player
  adjustPlayerHandDisplayValue();

}

// to adjust visibility of the right player's hand
function adjustPlayerHandDisplayValue() {
  // setting display 'block' for current player
  const currentPlayer = getCurrentPlayer();
  const currentPlayerHandElement = document.querySelector(`#player${currentPlayer.id}-hand`);
  currentPlayerHandElement.style.display = 'block';
  
  // setting display 'none' for second player
  const secondPlayer = getSecondPlayer();
  const secondPlayerHandElement = document.querySelector(`#player${secondPlayer.id}-hand`);
  secondPlayerHandElement.style.display = 'none';
}

// to add event listeners to the current player's hand (action, card and button)
function listenPlayerHandHtml(player) {
  // console.log('--- listenPlayerHandHtml');

  // constructing the css selectors for future manipulation
  const actionCssSelector = `#play${player.id} .action`;
  const cardsCssSelector = `#hands .card`;
  const btnCssSelector = `#player${player.id}-hand button`;
  
  // adding event listener to the action for the current player
  document.querySelector(actionCssSelector).addEventListener('click', (event) => {

    // getting the id of the selected labelled radio input
    const inputId = event.target.id;
    // cutting the player.id last character to extract the action id, ie the action key we need
    const actionId = inputId.slice(0, inputId.length - 1);
    
    // updating the actionCard object accordingly
    currentActionCard.playAction = PLAYER_ACTION[actionId];

    // updating the button label
    const btnElement = document.querySelector(btnCssSelector);
    btnElement.textContent = `Let's ${currentActionCard.playAction}`;

  });

  // adding event listeners to each card of the players' hands
  document.querySelectorAll(cardsCssSelector).forEach((card) => {
    card.addEventListener('click', (event) => {
      // console.log(`- cards: add event - event.target`, event.target);

      // highlight card (checking previous choice gets un-highlighted)
      highlightLastChosenCard(event.target);
      // the highlight also updates the actionCard object
    });
  });
  
  // adding event listener to the play button for both players
  document.querySelector(btnCssSelector).addEventListener('click', (event) => {
    // console.log(`- button: add event - event.target`, event.target, 'player', player);

    // check the validity of the combination action + card (returning the nextPlayerId)
    playActionAndCard(currentActionCard);
    if (!isGameOnHold) {
      // setting the game for next round
      currentPlayerId = nextPlayerId;
  
      // no message currently displayed, drawing a new card
      drawCardFromDrawingPile(getCurrentPlayer());
    }
  });

}


// to test the end of game
function isGameFinished() {
  // console.log(`--- isGameFinished: gameMode`, board.gameMode);

  // getting players
  const currentPlayer = getCurrentPlayer();

  // getting the goal (set by choosing the game mode)
  const distanceGoal = GAME_MAX_DISTANCE[board.gameMode];

  // getting currentPlayer data
  const nameCurrentPlayer = currentPlayer.name.toUpperCase();
  const doneByCurrentPlayer = getCurrentPlayer().countDistance();

  if (doneByCurrentPlayer === distanceGoal) {
    let msg = String(distanceGoal) + messages.WINNER_PART1 + nameCurrentPlayer + messages.WINNER_PART2;
    displayMsg(msg);
    isGameOnHold = true;
    return true;
  }
  if (doneByCurrentPlayer > distanceGoal) {
    let msg = messages.LOSER_PART1 + nameCurrentPlayer
              + messages.LOSER_PART2 + String(distanceGoal) + messages.LOSER_PART3 ;
    displayMsg(msg);
    isGameOnHold = true;
    return true;
  }

  return false;

}



window.addEventListener('load', () => {
  // updating board and players from inputs
  const gameInputs = getLocalStorage();
  board.gameMode = gameInputs.mode.name;

  // updating the header to reflect the game mode
  document.querySelector('header p').textContent = `${GAME_MAX_DISTANCE[board.gameMode]} BORNES`;

  // defining 1st player and updating players accordingly
  setPlayers(gameInputs);
  
  // shuffling cards in drawing deck and dealing first cards to both players
  const shuffledCards = board.shuffleCards();
  dealCardsToPlayers(shuffledCards);
  // console.log(`p1.handPile`, p1.handPile);
  // console.log(`p2.handPile`, p2.handPile);
  
  // loading the driving zones for both players
  writePlayerDrivingZoneHtml(p1);
  writePlayerDrivingZoneHtml(p2);
  // loading the board
  writeBoardHtml(board);
  // loading the hands of both players
  writePlayerHandHtml(p1);
  writePlayerHandHtml(p2);


  // THE CURRENT PLAYER'S TURN BEGINS HERE
  
    //   // setting timeout to give time to players to change place
    //   timeoutId = setTimeout(() => {
      //     drawCardFromDrawingPile(getCurrentPlayer());
      //   }, TIMEOUT_DURATION);


      
  // draw a card for the current player
  if (!isGameOnHold) {
    // console.log(`--- window.load: currentActionCard`, currentActionCard);
    // no msg displayed at the moment, drawing a new card
    drawCardFromDrawingPile(getCurrentPlayer());
  } 
  
});
