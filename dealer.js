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
class Dealer {
  constructor(deck) {
    this.dealerHand = [];
  }

  shuffle() {
    let temp;
    let i;
    let counter = this.deck.length;

    while (counter) {
      i = Math.floor(Math.random() * counter--);
      temp = this.deck[counter];
      this.deck[counter] = this.deck[i];
      this.deck[i] = temp;
    }
    return this.deck;
  }

  Deal() {
    let hand = [];
    // what the player holds
    while (hand.length < 2) {
      hand.push(this.deck.pop());
    }
    return hand;
  }
}

let deckOfCards = new Deck(); // Gives our new object (deck) the name of "deckOfCards"
deckOfCards.createDeck();


// Pulling info from the new deck from the deck class in deck.js
// Imagine pulling direct data without using the 'this' keyword tho
console.log(deckOfCards.suits);
console.log(deckOfCards.values);
console.log(deckOfCards.deck);
