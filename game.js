/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
class Game {
  constructor() {
    this.discardPile = [];
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.wageredCoins = 0;
  }

  getHandValue(hand, currentHandValue) {
    let handValue = currentHandValue;

    // loops through all the card values and displays a final hand value based on what's-
    // shown on the card
    for (let i = 0; i < hand.length - 1; i++) {
      if (hand[i].value === '2') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '3') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '4') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '5') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '6') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '7') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '8') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '9') {
        handValue += parseInt(hand[i].value, 10);
      }

      if (hand[i].value === '10' || hand[i].value === 'Jack' || hand[i].value === 'Queen' || hand[i].value === 'King') {
        handValue += 10;
      }
    }
    return handValue;
  }
}

let game = new Game();
game.deck.createDeck();

// Shuffle the deck twice because... why not :)
game.dealer.shuffle(game.deck.deckOfCards);
game.dealer.shuffle(game.deck.deckOfCards);

// Gives 2 cards to both the player and dealer
game.dealer.initDeal2Hand(game.dealer.dealerHand, game.deck.deckOfCards);
game.dealer.initDeal2Hand(game.player.playerHand, game.deck.deckOfCards);
/* ----------------------------------------------------------*/
// game.player.playerHit(game.player.playerHand, game.deck.deckOfCards);

game.getHandValue(game.dealer.dealerHand, game.dealer.dealerHandValue);
console.dir(game);
console.dir(game.dealer.dealerHand);
console.dir(game.dealer.dealerHand[0]);
console.dir(game.dealer.dealerHand[0].value);
console.dir(game.dealer.dealerHandValue);
