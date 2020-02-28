//Note to self, check syntax for error on first line
class Dealer {
    constructor(deck) {
      this.hand = [];
    }
  }

shuffle(){
    let counter = this.deck.length, temp, i;

    while(counter) {
        i = Math.floor(Math.random() * counter--);
        temp = this.deck[counter];
        this.deck[counter] = this
    }
}