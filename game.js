/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Game {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.menu = new Menu();
    this.roundNumber = 0;
    this.playerHandValue = 0;
    this.dealerHandValue = 0;
  }


  getPlayerHandValue(hand) {
    let handValue = 0;

    this.playerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    //  final hand value for the player's hand.
    hand.forEach((data) => {
      if (data.value === 'King' || data.value === 'Queen' || data.value === 'Jack') {
        handValue += 10;
      } else if (data.value === 'Ace') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });


    // Loops through the array again, but checks for ace cards. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.value === 'Ace' && handValue > 21) {
        handValue -= 10;
      }
    });

    this.playerHandValue += handValue;
    document.getElementById('p1').innerHTML = `<strong>${this.playerHandValue.toString()}</strong>`;

    return handValue;
  }


  getDealerHandValue(hand) {
    let handValue = 0;

    this.dealerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    //  final hand value for the player's hand.
    hand.forEach((data) => {
      if (data.value === 'King' || data.value === 'Queen' || data.value === 'Jack') {
        handValue += 10;
      } else if (data.value === 'Ace') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });

    // Loops through the array again, but checks for ace cards. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.value === 'Ace' && handValue > 21) {
        handValue -= 10;
      }
    });

    this.dealerHandValue += handValue;
    document.getElementById('cpu').innerHTML = `<strong>${this.dealerHandValue.toString()}</strong>`;


    return this.dealerHandValue;
  }
}

const intervalConversion = {
  seconds: 1000,
  minutes: 60000,
  hours: 3e+6,
};

// Creates a "New game" with a deck
const game = new Game();
game.deck.createDeck();


// Shuffles the deck
game.dealer.shuffle(game.deck.deckOfCards);


// Gives 2 cards to both the player and dealer
game.dealer.initDeal2Hand(game.player.playerHand, game.dealer.dealerHand, game.deck.deckOfCards);
/* ----------------------------------------------------------*/

game.getPlayerHandValue(game.player.playerHand);
game.getDealerHandValue(game.dealer.dealerHand);

game.menu.disableBtn(game.menu.hitButton);

console.dir(game);
// console.dir(game.dealer.dealerHand);
// console.dir(game.dealer.dealerHand[0]);
// console.dir(game.dealer.dealerHand[0].value);
// console.dir(game.dealer.dealerHandValue);
