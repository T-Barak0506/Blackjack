/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
class Game {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.menu = new Menu();

    // SOUNDS:
    this.backgroundMusic = new Sound('./media/Casino-delfino.mp3');

    // RAW NUMBERS:
    this.roundNumber = 0;
    this.playerHandValue = 0;
    this.dealerHandValue = 0;
  }

  determineWinner() {
    if (this.playerHandValue > 21 || this.dealerHandValue > this.playerHandValue && this.dealerHandValue <= 21) {
      console.log('Dealer wins lol u suck');
    } else if (this.dealerHandValue === this.playerHandValue) {
      console.log('It\'s a push, so no one wins.');
    } else if (this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 || this.dealerHandValue > 21) {
      console.log('You won WOW YOU EXIST');
    }

    return `playerHand: ${this.playerHandValue}\nDealerHand: ${this.dealerHandValue}`;
  }

  getDealerHandValue(hand) {
    let handValue = 0;

    this.dealerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    hand.forEach((data) => {
      if (data.value === 'King' || data.value === 'Queen' || data.value === 'Jack') {
        handValue += 10;
      } else if (data.value === 'Ace') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });

    // Loops through the array again, but checks for aces. If the hand value exceeds 21, ten-
    // is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.value === 'Ace' && handValue > 21) {
        handValue -= 10;
      }
    });

    this.dealerHandValue += handValue;
    document.getElementById('cpu').innerHTML = `<strong>${this.dealerHandValue.toString()}</strong>`;


    return this.dealerHandValue;
  }


  getPlayerHandValue(hand) {
    let handValue = 0;

    this.playerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    hand.forEach((data) => {
      if (data.value === 'King' || data.value === 'Queen' || data.value === 'Jack') {
        handValue += 10;
      } else if (data.value === 'Ace') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });


    // Looping to check for aces. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.value === 'Ace' && handValue > 21) {
        handValue -= 10;
      }
    });

    // adds the total to the handValue
    this.playerHandValue += handValue;
    document.getElementById('p1').innerHTML = `<strong>${this.playerHandValue.toString()}</strong>`;

    // Ends the game if the player's hand exceeds 21
    if (this.playerHandValue >= 21) {
      game.menu.disableBtn(game.menu.hitButton);
      game.menu.disableBtn(game.menu.standButton);
      game.determineWinner();
    }

    return this.playerHandValue;
  }

  dealerPlay(hand, theDeck) {
    // Check the hand value after each draw; draws each card-
    // in .75 second increments
    const interval = setInterval(() => {
      if (this.dealerHandValue < 17) {
        hand.push(theDeck.pop());
        game.getDealerHandValue(game.dealer.dealerHand);
      } else {
        game.determineWinner();
        clearInterval(interval);
      }
    }, 1000 * 0.75);


    return this.dealerHandValue;
  }
}


/* --------------BREAK:---------------*/


// Creates a "New game" with a deck, also plays background music
const game = new Game();
game.deck.createDeck();
// game.backgroundMusic.playSound();


// Adds the "onClick" functions to the hit and stay buttons
game.menu.hitButton.addEventListener('click', () => {
  game.player.playerHit(game.player.playerHand, game.deck.deckOfCards);
  game.getPlayerHandValue(game.player.playerHand);
});

game.menu.standButton.addEventListener('click', () => {
  game.menu.disableBtn(game.menu.standButton);
  game.menu.disableBtn(game.menu.hitButton);
  game.dealerPlay(game.dealer.dealerHand, game.deck.deckOfCards);
});


// Shuffles the deck
game.dealer.shuffle(game.deck.deckOfCards);


// Gives 2 cards to both the player and dealer
game.dealer.initDeal2Hand(game.player.playerHand, game.dealer.dealerHand, game.deck.deckOfCards);
/* ----------------------------------------------------------*/

game.getPlayerHandValue(game.player.playerHand);
game.getDealerHandValue(game.dealer.dealerHand);

console.dir(game);
