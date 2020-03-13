/* eslint-disable prefer-const */
class Game {
  constructor() {
    this.discardPile = [];
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  // getHandValue(hand) {}
}

let game = new Game();
game.deck.createDeck();
game.dealer.shuffle(game.deck.deck);
console.dir(game.deck.deck);
