class Player {
  constructor() {
    this.playerHand = [];
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
