class Deck {
  constructor() {
    this.deck = [];
    this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  }

  createDeck(suits, values) {
    // for (const suit of this.suits) {
    //   for (const value of this.values) { // creates an array of values for each suit
    //     this.deck.push(new Card(suit, value));
    //   }
    // }

    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deck.push(new Card(suit, value)); // 13 values per suit
      });
    });
  }
}
