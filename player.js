/* eslint-disable class-methods-use-this */
class Player {
  constructor() {
    this.playerHand = [];
    this.playerHandValue = 0;
    this.playerCoins = 500;
  }

  playerHit(playerHand, theDeck) {
    playerHand.push(theDeck.pop());
  }

  playerStand(player, deck) {
    // your code here
  }

  split(card) {
    // your code here
  }
}
