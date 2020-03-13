/* eslint-disable prefer-const */
/* eslint-disable no-undef */

/* ---------------------------------------
  CLASSES USED:

  class Deck {
    constructor() {
      this.deck = []; <-- **WHERE THE NEW DECK IS STORED**
      this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
      this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  }

  ETERNAL VARIABLES USED:


*/
// let deckOfCards = new Deck(); // Gives our new object (deck) the name of "deckOfCards"

class Dealer {
  constructor() {
    this.dealerHand = [];
  }

  // eslint-disable-next-line class-methods-use-this
  shuffle(deck) {
    // eslint-disable-next-line one-var
    let counter = deck.length,
      temp,
      i;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = deck[counter];
      deck[counter] = deck[i];
      deck[i] = temp;
    }
  }

  // initDeal(player, deck) {
  //  // while both the player and dealer have less than 3 cards
  //   while (this.dealerHand.length <= 2 && game.player.hand.length <= 2) {
  //     this.dealerHand.push(deckOfCards.deck.pop());
  //   }
  // }

  hitPlayerDeal(player, deck) {
    let card = deck.pop;
    // add the value of the card to either the player class, or the game class.
    // Separate function below for dealer hit
  }

  hitDealerDeal(dealer, deck) {
    let card = deck.pop;

    if (dealerHand > 16) {
      return false;
    }
    if (dealerHand < 17) {
      return card;
    }
  }
}
/*--------------------------------*/
