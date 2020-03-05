/* eslint-disable prefer-const */
/* eslint-disable no-undef */
class Dealer {
<<<<<<< HEAD
    constructor(deck){
      this.dealerHand = [];
    }
shuffle(){
  let temp;
  let i;
  let counter = this.deck.length, temp, i;

    while(counter) {
        i = Math.floor(Math.random() * counter--);
        temp = this.deck[counter];
        this.deck[counter] = this.deck[i];
        this.deck[i] = temp;
    }
    return this.deck;
}

Deal(){
  let hand = [];
  //what the player holds
  while( hand.length < 2) {
    hand.push(this.deck.pop());
  }
  return hand;
}
}
console.log(deck.deal())
=======
  constructor(deck) {
    this.hand = [];
    this.deck = deck;
  }
}
let deckOfCards = new Deck();
deckOfCards.createDeck();
// let dealer = new Dealer(deckOfCards.deck);
console.log(deckOfCards.deck);
<<<<<<< HEAD
console.log(x);
=======
>>>>>>> 7f5bf224b1cc53d09b6f5d3ba4a32845a1ff5a2e
>>>>>>> 17dc758bce9d6299c3cf5b6bab2d73380de1bfd6
