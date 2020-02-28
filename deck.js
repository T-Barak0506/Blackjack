class Deck {
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