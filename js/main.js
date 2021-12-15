// all imports
import { ID_P1, ID_P2, GAME_INIT_DEFAULT, PLAYER_ACTION,
  STORAGE_NAME,
  HAND_MAX_INDEX, DRAWN_CARD_INDEX, HAND_PILE_MAX_LENGTH,
  CLASS_NAME_HIGHLIGHT } from "./data.js";
import { cards, noCard, turnedCard } from "./cards.js";
import { Board } from "./board.js";
import { Player } from "./player.js";

console.log('=== 1000 Bornes - main.js - debug log ===');

// setting the board
const board = new Board(cards, GAME_INIT_DEFAULT.mode);

// settings 2 players, at first with static data
const p1 = new Player(ID_P1, GAME_INIT_DEFAULT.player1.name, GAME_INIT_DEFAULT.player1.age);
const p2 = new Player(ID_P2, GAME_INIT_DEFAULT.player2.name, GAME_INIT_DEFAULT.player2.age);

// init current actionCard
let currentActionCard = {
  playAction: PLAYER_ACTION.drive,
  playCard: noCard
};

// init current and next player id (1 to begin the game)
let currentPlayerId = 1;
let nextPlayerId = 0;

// get localStorage
function getLocalStorage() {
  // getting the object stored
  let gameInitData = JSON.parse(localStorage.getItem(STORAGE_NAME));
  
  // testing its existence
  if (gameInitData === null || gameInitData === undefined) {
    gameInitData = JSON.parse(JSON.stringify(GAME_INIT_DEFAULT));
  }
  console.log(gameInitData);

  // returning the necessary data to begin the game
  return gameInitData;
}

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
  console.log('--- dealCardsToPlayers');
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
  console.log('--- drawCardFromDrawingPile');
  // drawing a card, placing it into the playPile (game history) and in the player hand
  const drawnCard = board.drawingPile.shift();
  board.playPile.unshift(drawnCard);
  // placing it also in the adequate player hand
  player.handPile[DRAWN_CARD_INDEX] = drawnCard;
  // update dom
  writePlayerHandHtml(player);
}

// to highlight the last chosen card
function highlightLastChosenCard(target) {
  // update classList to visually show the chosen card
  document.querySelectorAll('#hands .card').forEach(card => {
    console.log(`card`, card);
    if (card.classList.contains(CLASS_NAME_HIGHLIGHT)) card.classList.remove(CLASS_NAME_HIGHLIGHT);
    if (card === target.closest('div')) card.classList.add(CLASS_NAME_HIGHLIGHT);
  });
  // update the actionCard object accordingly
  const cardId = Number(target.getAttribute("card-id"));
  currentActionCard.playCard = getCurrentPlayer().handPile.find(card => card.id === cardId);
}

// to check the validity of the combination action + card
function checkPlay(playActionCard) {
  console.log(`--- checkPlay: playActionCard`, playActionCard);

  const currentPlayer = getCurrentPlayer();
  const secondPlayer = getSecondPlayer();
  const action = playActionCard.playAction;
  const card = playActionCard.playCard;
  const cardIndexInHandPile = currentPlayer.handPile.indexOf(card);
  console.log(`--- cardIndexInHandPile`, cardIndexInHandPile);

  if (card.type === 'safety') {
    // always allowed
    console.log('--- - safety card ok');
    // testing the coup fourre considering the last card played
    let isCoupFourre = false;
    if (board.playPile.length > 0 && board.playPile[0].type === 'hazard') {
      if (card.name === 'ev' && board.playPile[0].name === 'stop') isCoupFourre = true;
      else if (card.name === 'ev' && board.playPile[0].name === 'speed') isCoupFourre = true;
      else if (card.name === 'ft' && board.playPile[0].name === 'gas') isCoupFourre = true;
      else if (card.name === 'pp' && board.playPile[0].name === 'tire') isCoupFourre = true;
      else if (card.name === 'da' && board.playPile[0].name === 'accident') isCoupFourre = true;
    }
    // - removing this card from player's hand and saving it into play history
    const safetyCard = currentPlayer.handPile.splice(cardIndexInHandPile, 1)[0];
    board.playPile.unshift(safetyCard);
    // - adding this card into the discard pile
    currentPlayer.safetyPile.unshift(safetyCard);
    // - updating safety status for the player
    currentPlayer.updateSafetyStatus(isCoupFourre);
    console.log(`currentPlayer`, currentPlayer);
    // - discarding the current card form the player's battle or speed pile if necessary
/// ====
///+=== 
// revoir le cas ev avec stop sur battle pile ou speed sur speed pile
// autrement battle pile

    let hazardCardToDiscard;
    if (currentPlayer.speedPile.length > 0) {
      console.log("player's speedPile not empty");
      if (currentPlayer.speedPile[0].type === 'hazard') {
        console.log("last card on speedPile = hazard");
        if (currentPlayer.speedPile[0].name === 'speed' && card.name === 'ev') {
          console.log("last card on speedPile = speed & safety = ev");
          hazardCardToDiscard = currentPlayer.speedPile.splice(cardIndexInHandPile, 1);
        }
      }
    }
    else if (currentPlayer.battlePile.length > 0) {
      hazardCardToDiscard = currentPlayer.battlePile.splice(cardIndexInHandPile, 1);
    }
    if (hazardCardToDiscard) board.discardPile.unshift(hazardCardToDiscard);

/// ======
//// ===== set current player = same player id because of safety card



  }
  else {
    let isPlayOk = false;
    switch(action) {
      case PLAYER_ACTION.drive:
        if (card.type === 'safety') {
          isPlayOk = true;
        }
        else {
          if (currentPlayer.battlePile.length === 0) {
            // the game just begins, needing a drive card
            isPlayOk = card.name === 'drive' || card.name === 'ev' ? true : false;
          }
          else {
            // the game has already begun
            // - testing current top battle card
            // - if current battle card type = hazard
            // -- if card = ev, ok + new drawn card
            // -- else, nok 'You cannot drive until your battle pile is green.'
            // - else current battle card type = remedy
            // -- if card = ev, ok
            // -- if card type = distance
            // --- if name = swallow
            // ---- if counter < 2, ok
            // ---- else, nok 'You cannot play more than 2 swallow cards (200).'
            // --- else, ok
            // -- else, nok
          }
        }

        if (isPlayOk) {
          console.log('--- - action drive ok');
        }
        break;
        
      case PLAYER_ACTION.defend:
        if (isPlayOk) {console.log('--- - action defend ok');}
        break;

      case PLAYER_ACTION.attack:
        if (isPlayOk) {console.log('--- - action attack ok');}
        break;

      case PLAYER_ACTION.discard:
        // no restriction on this move
        isPlayOk = true;
        // playing the game
        if (isPlayOk) {
          console.log('--- - action discard ok');
          // - removing this card from player's hand and saving it into play history
          const cardToDiscard = currentPlayer.handPile.splice(cardIndexInHandPile, 1);
          board.playPile.unshift(cardToDiscard);
          // - adding this card into the discard pile
          board.discardPile.unshift(cardToDiscard);
        }
        break;
        
      default:
        console.log('No such action allowed, sorry!');
        break;
    }
  }
  
  // updating the player hand on screen
  writePlayerHandHtml(currentPlayer);
  // updating driving zone
  writePlayerDrivingZoneHtml(currentPlayer);
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
  <div id="discard-pile" class="card"> <img src="${noCard.img}" alt="${noCard.alt}"> </div>
  `;
  document.querySelector(cssSelector).innerHTML = boardHtml;
}

// to write the html for a player's hand
function writePlayerHandHtml(player) {
  const cssSelector = `#player${player.id}-hand`;
  const playerHandElement = document.querySelector(cssSelector);

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
        <input type="radio" name="action-player${player.id}" id="drive${player.id}" checked>
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
  if (!playerHandElement.id.includes(String(currentPlayerId)))
      playerHandElement.style.display = 'none';
}


window.addEventListener('load', () => {
  // updating board and players from inputs
  const gameInputs = getLocalStorage();
  board.gameMode = gameInputs.mode.name;
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

  // constructing the css selectors for future manipulation
  const actionCssSelector = `#play${getCurrentPlayer().id} .action`;
  const cardsCssSelector = `#hands .card`;
  const btnCssSelector = `#player${getCurrentPlayer().id}-hand button`;
  
  // draw a card for the current player
  drawCardFromDrawingPile(getCurrentPlayer());

  // adding event listener to the action for the current player
  document.querySelector(actionCssSelector).addEventListener('click', (event) => {

    // getting the id of the selected labelled radio input
    const inputId = event.target.id;
    // cutting the player.id last character to extract the action id, ie the action key we need
    const actionId = inputId.slice(0, inputId.length - 1);
    
    // updating the actionCard object accordingly
    currentActionCard.playAction = PLAYER_ACTION[actionId];
    console.log(`currentActionCard.playAction`, currentActionCard.playAction);

    // updating the button label
    const btnElement = document.querySelector(btnCssSelector);
    btnElement.textContent = `Let's ${currentActionCard.playAction}`;

  });

  // adding event listeners to each card of the players' hands
  document.querySelectorAll(cardsCssSelector).forEach((card) => {
    card.addEventListener('click', (event) => {
      console.log(`event.target`, event.target);

      // highlight card (checking previous choice gets un-highlighted)
      highlightLastChosenCard(event.target);
      // the highlight also updates the actionCard object

     
      // // adapting depending on how many cards clicked
      // if (memoryGame.pickedCards.length === 2) {
        //   // setting timeout to be able to see both cards turned
        //   timeoutId = setTimeout(() => {
          //     checkClickedPair();
          //   }, TIMEOUT_DURATION);
          // }
          
    });
  });
      
  // adding event listener to the play button for both players
  document.querySelector(btnCssSelector).addEventListener('click', (event) => {
    console.log(`event.target`, event.target);
    // check the validity of the combination action + card (returning the nextPlayerId)
    checkPlay(currentActionCard);
  });

});
