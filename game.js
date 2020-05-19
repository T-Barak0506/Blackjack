/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
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

    // CHECKERS
    this.bjChecker = true;
    this.doubleChecker = true;
    this.splitCheck = false;

    // HAND MODIFIERS
    this.insuranceHand = false;
    this.splitHand = false;
    this.doubleHand = false;


    // MISC. RAW VALUES:
    this.legitBetValue = false;
    this.roundNumber = 0;
    this.playerHandValue = 0;
    this.dealerHandValue = 0;
    this.totalBet = 0;
  }

  checkBetValue(betValue) {
    // TODO: Create a custom alert
    let str = betValue.value.trim();

    if (str[str.length - 1] === '.') {
      str = 5;
    }


    if (str === null || str === '') {
      // If the input value is submitted blank
      alert('You need to input an amount of coins to bet.');
      str = '';
      // ...
    } else if ((typeof parseInt(str, 10) !== 'number')
             || (isNaN(str))
             || (Number.isFinite(str))) {
      // If the value entered isn't a legitimate number
      alert('You need to input an ACTUAL numerical value. Don\'t try to break me.');
      str = '';
      // ...
    } else if (parseInt(str, 10) > this.player.playerCoins) {
      alert(`You only have ${this.player.playerCoins} coins, Don't try and lie to me cowboy.`);
      str = '';
      // ...
    } else if (parseInt(str, 10) <= 0) {
      alert('Needs to be an integer greater than 0 yeah?');
      str = '';
      // ...
    } else {
      this.legitBetValue = true;

      // Displays the total bet
      this.menu.wageredCoins.textContent = Math.floor(str);

      // Subtracts the bet value from the player's total coins and displayes it
      this.player.playerCoins -= Math.floor(parseInt(str, 10));
      this.menu.coinAmount.textContent = this.player.playerCoins.toString();
    }
  }

  getInitialCoins(playerCoins, current, remaining) {
    current.textContent = playerCoins.toString();
    remaining.textContent = playerCoins.toString();
  }


  determineWinner() {
    if (this.bjChecker === true && this.playerHandValue === 21) {
      console.log('BLACKJACK!! YOU WIN!!');
    }

    if (this.playerHandValue > 21 || this.dealerHandValue > this.playerHandValue && this.dealerHandValue <= 21) {
      console.log('Dealer wins lol u suck');
    } else if (this.dealerHandValue === this.playerHandValue && this.bjChecker === false) {
      console.log('It\'s a push, so no one wins.');
    } else if (this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 && this.bjChecker === false || this.dealerHandValue > 21) {
      console.log('You won WOW YOU EXIST');
    }

    return `playerHand: ${this.playerHandValue}\nDealerHand: ${this.dealerHandValue}`;
  }


  checkForBlackjack() {
    if (this.playerHandValue === 21) {
      game.determineWinner();
    } else {
      this.bjChecker = false;
    }
  }


  getDealerHandValue(hand) {
    let handValue = 0;

    this.dealerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    hand.forEach((data) => {
      if (data.value === 'K' || data.value === 'Q' || data.value === 'J') {
        handValue += 10;
      } else if (data.value === 'A') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });

    // Loops through the array again, but checks for aces. If the hand value exceeds 21, ten-
    // is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.value === 'A' && handValue > 21) {
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
      if (data.value === 'K' || data.value === 'Q' || data.value === 'J') {
        handValue += 10;
      } else if (data.value === 'A') {
        handValue += 11;
      } else {
        handValue += parseInt(data.value, 10);
      }
    });

    // Looping to check for aces. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).

    hand.forEach((data) => {
      if (data.value === 'A' && handValue > 21) {
        handValue -= 10;
      }
    });

    // adds the total to the handValue
    this.playerHandValue += handValue;
    document.getElementById('p1').innerHTML = `<strong>${this.playerHandValue.toString()}</strong>`;

    // Ends the game if the player's hand exceeds 21
    if (this.playerHandValue >= 21 && this.bjChecker === false) {
      game.menu.disableBtn(game.menu.hitButton);
      game.menu.disableBtn(game.menu.standButton);
      game.menu.toggleDisplay(game.menu.cmdMenu);
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
    }, 1000 * 1);


    return this.dealerHandValue;
  }
}


/* --------------BREAK:---------------*/


// Creates a "New game" with a deck, also plays background music
const game = new Game();
game.getInitialCoins(game.player.playerCoins, game.menu.coinAmount, game.menu.remainingCoins);
game.deck.createDeck();
game.menu.toggleBetMenu();
// //game.backgroundMusic.playSound();


// mouseOver and click events for the theme choice buttons
game.menu.classicTheme.addEventListener('mouseover', () => {
  game.menu.themeName.textContent = 'Classic';
  game.menu.themeName.style.color = '#004b00';

  setTimeout(() => {
    game.menu.themeName.textContent = '';
  }, 2000);
});

game.menu.classicTheme.addEventListener('click', () => {
  game.menu.currentThemeId = 0;
  game.menu.toggleThemes();
});

game.menu.rubyTheme.addEventListener('mouseover', () => {
  game.menu.themeName.textContent = 'Ruby';
  game.menu.themeName.style.color = '#750202';

  setTimeout(() => {
    game.menu.themeName.textContent = '';
  }, 2000);
});

game.menu.rubyTheme.addEventListener('click', () => {
  game.menu.currentThemeId = 1;
  game.menu.toggleThemes();
});

game.menu.aquaTheme.addEventListener('mouseover', () => {
  game.menu.themeName.textContent = 'Aqua';
  game.menu.themeName.style.color = '#007e8e';

  setTimeout(() => {
    game.menu.themeName.textContent = '';
  }, 2000);
});

game.menu.aquaTheme.addEventListener('click', () => {
  game.menu.currentThemeId = 2;
  game.menu.toggleThemes();
});

game.menu.charcoalTheme.addEventListener('mouseover', () => {
  game.menu.themeName.textContent = 'Charcoal';
  game.menu.themeName.style.color = '#545454';

  setTimeout(() => {
    game.menu.themeName.textContent = '';
  }, 2000);
});

game.menu.charcoalTheme.addEventListener('click', () => {
  game.menu.currentThemeId = 3;
  game.menu.toggleThemes();
});


// ---------------------------------------------------------------


// Start the game!
game.menu.start.addEventListener('click', () => {
  game.checkBetValue(game.menu.betValueInput);

  if (game.legitBetValue === true) {
    game.menu.disableBtn(game.menu.start);
    game.menu.toggleBetMenu();
    game.menu.toggleTotalBetMenu();
    // ...
  }
});

// Adds the "onClick" functions to the hit and stand buttons
game.menu.hitButton.addEventListener('click', () => {
  game.player.playerHit(game.player.playerHand, game.deck.deckOfCards);
  game.getPlayerHandValue(game.player.playerHand);
});

game.menu.standButton.addEventListener('click', () => {
  game.menu.disableBtn(game.menu.standButton);
  game.menu.disableBtn(game.menu.hitButton);
  // game.menu.toggleDisplay(game.menu.cmdMenu);
  game.dealerPlay(game.dealer.dealerHand, game.deck.deckOfCards);
});


// Shuffles the deck
game.dealer.shuffle(game.deck.deckOfCards);


// Gives 2 cards to both the player and dealer
game.dealer.initDeal2Hand(game.player.playerHand, game.dealer.dealerHand, game.deck.deckOfCards);
/* ----------------------------------------------------------*/

game.getPlayerHandValue(game.player.playerHand);
game.getDealerHandValue(game.dealer.dealerHand);
game.checkForBlackjack();

console.dir(game);
