/* eslint-disable one-var */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

class Dealer {
  constructor() {
    this.dealerHand = [];
    this.wageredCoins = 0;
  }

  shuffle(deck) {
    let counter = 0;

    // Shuffle the deck thrice because... why not :)
    while (counter < 3) {
      let counter2 = deck.length,
        temp,
        i;

      while (counter2) {
        i = Math.floor(Math.random() * counter2--);
        temp = deck[counter2];
        deck[counter2] = deck[i];
        deck[i] = temp;
      }

      counter++;
    }

    return deck;
  }

  initDeal2Hand(playerHand, dealerHand, theDeck) {
    // adds 2 cards to the player's and dealer's hands
    while (playerHand.length < 2 && dealerHand.length < 2) {
      playerHand.push(theDeck.pop());
      dealerHand.push(theDeck.pop());
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
