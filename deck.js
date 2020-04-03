class Deck {
  constructor() {
    this.deckOfCards = [];
    this.discardPile = [];
    this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  }

  createDeck() {
    // 13 values per suit
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deckOfCards.push(new Card(suit, value));
      });
    });

    return this.deckOfCards;
  }
}
