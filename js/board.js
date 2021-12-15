class Board {
  constructor(cards, gameMode) {
    // main deck of cards, used for feeding players' hand pilesd nand after for drawing
    this.drawingPile = cards,
    // used to store cards discarded by the players
    this.discardPile = [],
    // used to keep the memory of the played cards in order
    this.playPile = [],
    // game mode
    this.gameMode = gameMode
  }

  shuffleCards() {
    console.log('--- shuffleCards');
    // ensuring a deck of cards exists
    if (!this.drawingPile) return;

    // getting a new independent copy of the deck of cards
    let currentDeck = [...this.drawingPile];
    // initializing the future shuffled deck of cards
    const shuffledDeck = [];

    // looping through the copy deck of cards
    while (currentDeck.length > 0) {
      // getting a random index depending on the size of the currentDeck
      const randomIdx = Math.floor(Math.random() * currentDeck.length);
      // pushing the item to the shuffledDeck array
      shuffledDeck.push(currentDeck[randomIdx]);
      // splicing this item from the currentDeck --> length decreases
      currentDeck.splice(randomIdx, 1);
    }

    // updating this.cards with the shuffledDeck
    this.drawingPile = [...shuffledDeck];
    return this.drawingPile;
  }

  renewFromDiscardPile() {
    console.log('--- renewFromDiscardPile');
    // checking if there are cards to renew the empty drawing pile
    if (this.drawingPile.length === 0 && this.discardPile.length > 0) {
      // creating a deep copy of the discard pile
      this.drawingPile = [...this.discardPile];
      // shuffling the newly created drawing pile
      this.shuffleCards();
    }
  }
} 

export { Board }