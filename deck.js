class Deck {
  constructor() {
    this.deck = [];
  }

  // TODO: Change loops to forEach
  // TODO: find a way to link variables between js files


  createDeck(suits, values) {
    for (const suit of suits) {
      for (const value of values) { // creates an array of values for each suit
        this.deck.push(new Card(suit, value));
      }
    }
  }
}
