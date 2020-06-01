/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
class Player {
  constructor() {
    this.playerHand = [];
    this.splitHand = [];
    this.cardSpaceP1 = document.querySelector('#p1-space');
  }

  playerHit(hand, theDeck) {
    hand.push(theDeck.pop());
    return hand;
  }


  // split(card) {
  //   // your code here
  // }
}
