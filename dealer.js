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

  VARIABLES USED:


*/
let deckOfCards = new Deck(); // Gives our new object (deck) the name of "deckOfCards"

class Dealer {
  constructor() {
    this.dealerHand = [];
  }

  // eslint-disable-next-line class-methods-use-this
  shuffle() {
    // eslint-disable-next-line one-var
    let counter = deckOfCards.deck.length,
      temp,
      i;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = deckOfCards.deck[counter];
      deckOfCards.deck[counter] = deckOfCards.deck[i];
      deckOfCards.deck[i] = temp;
    }
    return deckOfCards.deck;
  }

  deal() {
    let hand = [];
    // what the player holds
    while (hand.length < 2) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
}
/*--------------------------------*/

deckOfCards.createDeck();
// console.log(deckOfCards.shuffle());
// deckOfCards.deal();

// Pulling info from the new deck from the deck class in deck.js
// Imagine pulling direct data without using the 'this' keyword tho
console.log(deckOfCards.deck);
