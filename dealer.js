/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

class Dealer {
  constructor() {
    this.dealerHand = [];
    this.dealerHandValue = 0;
  }

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
    return deck;
  }

  initDeal2Hand(playerHand, theDeck) {
    // adds 2 cards to the player's and dealer's hands
    while (playerHand.length < 2) {
      playerHand.push(theDeck.pop());
    }
    return playerHand;
  }

  // hitPlayerDeal(playerHand, theDeck) {
  //   let card = deck.pop;
  //   add the value of the card to either the player class, or the game class.
  //   Separate function below for dealer hit
  // }

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
