class Dealer {
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
