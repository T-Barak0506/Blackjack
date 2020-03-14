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
game.dealer.shuffle(game.deck.deckOfCards); // Shuffle the deck twice because... why not :)
game.dealer.shuffle(game.deck.deckOfCards);
game.dealer.initDeal2Hand(game.dealer.dealerHand, game.deck.deckOfCards);
game.dealer.initDeal2Hand(game.player.playerHand, game.deck.deckOfCards);
/* ----------------------------------------------------------*/

console.dir(game);
