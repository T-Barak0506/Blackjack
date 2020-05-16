/* eslint-disable class-methods-use-this */
class Player {
  constructor() {
    this.playerHand = [];
    this.splitHand = [];
    this.playerCoins = 2225;
  }

  playerHit(hand, theDeck) {
    hand.push(theDeck.pop());
    return hand;
  }


  split(card) {
    // your code here
  }
}
