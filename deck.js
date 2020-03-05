class Deck {
<<<<<<< HEAD
    constructor(){
        this.deck = [];
    }

    createDeck(suits, values){
        for(let suit of suits){
            for(let value of values){
                this.deck.push(new Card(suit, value));
            }
        }
        return this.deck.length;
    }
}
let deck = new Deck(suits, values)
deck.createDeck(suits, values);
console.log(deck.createDeck(suits, values));
=======
  constructor() {
    this.deck = [];
    this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
  }


  createDeck(suits, values) {
    // for (const suit of this.suits) {
    //   for (const value of this.values) { // creates an array of values for each suit
    //     this.deck.push(new Card(suit, value));
    //   }
    // }

    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deck.push(new Card(suit, value)); // 13 values per suit
      });
    });
  }
}
>>>>>>> 7f5bf224b1cc53d09b6f5d3ba4a32845a1ff5a2e
