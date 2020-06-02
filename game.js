/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
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
    this.currency = new Currency();


    // SOUNDS:
    // this.backgroundMusic = new Sound('./media/Casino-delfino.mp3');
    // this.shuffleSound = new Sound('./media/sounds/19245__deathpie__shuffle.wav');

    // CHECKERS
    this.bjChecker = true;
    this.doubleChecker = true;
    this.splitChecker = false;

    // HAND MODIFIERS
    this.insuranceHand = false;
    this.splitHand = false;
    this.doubleHand = false;

    // MISC. RAW VALUES:
    this.legitBetValue = false;
    this.roundNumber = 0;
    this.playerHandValue = 0;
    this.dealerHandValue = 0;
  }

  checkBetValue(betValue) {
    // If the start button is clicked, checks the value entered to make sure it's legit
    // TODO: Create a custom alert
    let str = betValue.value.trim();

    if (str[str.length - 1] === '.') {
      str = 5;
    }


    if (str === null || str === '') {
      // If the input value is submitted blank
      alert('You need to input an amount of coins to bet.');
      betValue.value = '';
      // ...
    } else if ((typeof parseInt(str, 10) !== 'number')
             || (isNaN(str))
             || (Number.isFinite(str))) {
      // If the value entered isn't a legitimate number
      alert('You need to input an ACTUAL numerical value. Don\'t try to break me.');
      betValue.value = '';
      // ...
    } else if (parseInt(str, 10) > this.currency.playerCoins) {
      // If the user tries to bet more coins than they currently have
      alert(`You only have ${this.currency.playerCoins} coins, Don't try and lie to me cowboy.`);
      betValue.value = '';
      // ...
    } else if (parseInt(str, 10) <= 0) {
      // If the number submitted is less than 0
      alert('Needs to be an integer greater than 0 yeah?');
      betValue.value = '';
      // ...
    } else {
      this.legitBetValue = true;

      // Displays the total bet
      this.currency.totalBet = Math.floor(str);

      // Subtracts the bet value from the player's total coins
      this.currency.playerCoins -= Math.floor(parseInt(str, 10));

      // Display the changes
      this.currency.updateCoinCount();
    }
  }


  determineWinner() {
    let timerNum;

    if (this.playerHandValue > 21) {
      timerNum = 1600;
    } else {
      timerNum = 500;
    }

    if (this.bjChecker === true && this.playerHandValue === 21) {
      const bjWin = Math.floor(this.currency.totalBet * 1.5);

      console.log('BLACKJACK!! YOU WIN!!');

      this.currency.playerCoins += bjWin;
      this.currency.totalBet = 0;
      this.currency.updateCoinCount();
    }

    if (this.playerHandValue > 21 || this.dealerHandValue > this.playerHandValue && this.dealerHandValue <= 21) {
      setTimeout(() => {
        console.log('Dealer wins lol u suck');

        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, timerNum);
    } else if (this.dealerHandValue === this.playerHandValue && this.bjChecker === false) {
      setTimeout(() => {
        console.log('It\'s a push, so no one wins.');

        this.currency.playerCoins += this.currency.totalBet;
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, 1000);
    } else if (this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 && this.bjChecker === false || this.dealerHandValue > 21) {
      setTimeout(() => {
        console.log('You won WOW YOU EXIST');

        this.currency.playerCoins += (this.currency.totalBet * 2);
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, 1000);
    }

    return `playerHand: ${this.playerHandValue}\nDealerHand: ${this.dealerHandValue}`;
  }


  checkForBlackjack() {
    if (this.playerHandValue === 21) {
      this.menu.toggleDisplay(this.menu.cmdMenu);
      this.determineWinner();
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
      if (data.hidden === false) {
        if (data.value === 'K' || data.value === 'Q' || data.value === 'J') {
          handValue += 10;
        } else if (data.value === 'A') {
          handValue += 11;
        } else {
          handValue += parseInt(data.value, 10);
        }
      }
    });

    // Loops through the array again, but checks for aces. If the hand value exceeds 21, ten-
    // is subtracted from this value. (Since Aces can also equal 1).
    hand.forEach((data) => {
      if (data.hidden === false) {
        if (data.value === 'A' && handValue > 21) {
          handValue -= 10;
        }
      }
    });

    this.dealerHandValue += handValue;
    document.getElementById('cpu').textContent = `${this.dealerHandValue.toString()}`;


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
    document.getElementById('p1').textContent = `${this.playerHandValue.toString()}`;

    // Ends the game if the player's hand exceeds 21
    if (this.playerHandValue >= 21 && this.bjChecker === false) {
      this.menu.disableBtn(this.menu.hitButton);
      this.menu.disableBtn(this.menu.standButton);
      this.menu.toggleDisplay(this.menu.cmdMenu);

      setTimeout(() => {
        this.determineWinner();
      }, 600);
    }

    return this.playerHandValue;
  }

  dealerPlay(hand, theDeck) {
    this.menu.disableBtn(this.menu.standButton);
    this.menu.disableBtn(this.menu.hitButton);

    const item = document.querySelectorAll('#cpu-space .card')[1];
    hand[hand.length - 1].hidden = false;
    item.style.backgroundImage = `url('${hand[hand.length - 1].visual}')`;


    if (this.playerHandValue >= 22) {
      setTimeout(() => {
        this.getDealerHandValue(this.dealer.dealerHand);
      }, 750);
      // .
    } else if (this.playerHandValue <= 21 && this.bjChecker === false) {
      setTimeout(() => {
        this.getDealerHandValue(this.dealer.dealerHand);
      }, 750);

      // Check the hand value after each draw; draws each card-
      // in .75 second increments
      setTimeout(() => {
        const interval = setInterval(() => {
          if (this.dealerHandValue < 17) {
            setTimeout(() => {
              hand.push(theDeck.pop());
              this.dealer.getDealerCardVisual(this.dealer.dealerHand);
            }, 200);

            setTimeout(() => {
              this.getDealerHandValue(this.dealer.dealerHand);
            }, 900);
          } else {
            this.determineWinner();
            clearInterval(interval);
          }
        }, 1200);
      }, 500);
    }


    return this.dealerHandValue;
  }

  checkHand() {
    const faceCards = 'J' || 'Q' || 'K';
    // Checks if the hand meets the requirements to double
    if (this.playerHandValue >= 9 && this.playerHandValue <= 18 && this.currency.totalBet * 1.8 <= this.currency.playerCoins) {
      this.menu.doubleContainer.style.display = 'block';
    } else {
      this.menu.doubleContainer.style.display = 'none';
    }

    if (this.player.playerHand[0].value && this.player.playerHand[1].value === faceCards || this.player.playerHand[0].value === this.player.playerHand[1].value) {
      this.menu.splitContainer.style.display = 'block';
    } else {
      this.menu.splitContainer.style.display = 'none';
    }
  }
}


/* -------------------------------------------*/

const game = new Game();
// game.backgroundMusic.playSound();

game.currency.updateCoinCount();
game.deck.createDeck();
game.dealer.shuffle(game.deck.deckOfCards);
game.menu.shuffleNotice();

setTimeout(() => {
  window.scroll(0, 0);
  game.menu.toggleBetMenu();
}, 3500);


/* ------------------------------------------------------------------------------------------------------*/


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


// Adds the "onClick" functions to the hit, stand, double and split buttons
game.menu.doubleButton.addEventListener('click', () => {
  const doubleAmount = Math.floor(game.currency.totalBet * 1.8);

  game.menu.disableBtn(game.menu.hitButton);
  game.menu.disableBtn(game.menu.standButton);
  game.menu.disableBtn(game.menu.doubleButton);
  game.menu.disableBtn(game.menu.splitButton);

  // Adds the coins to the wager
  game.currency.playerCoins -= doubleAmount;
  game.currency.totalBet = doubleAmount;
  game.currency.updateCoinCount();

  setTimeout(() => {
    game.player.playerHit(game.player.playerHand, game.deck.deckOfCards);
    game.dealer.getPlayerCardVisual(game.player.playerHand);
  }, 400);

  setTimeout(() => {
    game.menu.toggleDisplay(game.menu.cmdMenu);
    game.getPlayerHandValue(game.player.playerHand);
  }, 1199);

  setTimeout(() => {
    game.dealerPlay(game.dealer.dealerHand, game.deck.deckOfCards);
  }, 1699);
});

game.menu.hitButton.addEventListener('click', () => {
  game.menu.disableBtn(game.menu.hitButton);
  game.menu.disableBtn(game.menu.standButton);
  game.menu.disableBtn(game.menu.doubleButton);
  game.menu.disableBtn(game.menu.splitButton);

  setTimeout(() => {
    game.player.playerHit(game.player.playerHand, game.deck.deckOfCards);
    game.dealer.getPlayerCardVisual(game.player.playerHand);
  }, 400);

  setTimeout(() => {
    game.getPlayerHandValue(game.player.playerHand);

    if (game.playerHandValue === 21) {
      game.menu.disableBtn(game.menu.hitButton);
      game.menu.disableBtn(game.menu.standButton);
      // .
    } else if (game.playerHandValue >= 22) {
      setTimeout(() => {
        game.dealerPlay(game.dealer.dealerHand, game.deck.deckOfCards);
      }, 560);
      // .
    } else {
      game.menu.enableBtn(game.menu.hitButton);
      game.menu.enableBtn(game.menu.standButton);
      // .
    }
  }, 1199);
});

game.menu.standButton.addEventListener('click', () => {
  game.menu.toggleDisplay(game.menu.cmdMenu);

  setTimeout(() => {
    game.dealerPlay(game.dealer.dealerHand, game.deck.deckOfCards);
  }, 560);
});

/* -------------------------------------------------------------------------------------*/

// Start the game!
game.menu.start.addEventListener('click', () => {
  game.checkBetValue(game.menu.betValueInput);

  if (game.legitBetValue === true) {
    game.menu.disableBtn(game.menu.start);
    game.menu.toggleBetMenu();
    game.menu.toggleTotalBetMenu();

    // Gives 2 cards to both the player and dealer
    game.dealer.initDeal2Hand(game.player.playerHand, game.dealer.dealerHand, game.deck.deckOfCards);

    setTimeout(() => {
      game.getPlayerHandValue(game.player.playerHand);
      game.checkHand();
      game.getDealerHandValue(game.dealer.dealerHand);
      game.menu.toggleDisplay(game.menu.cmdMenu);
      game.checkForBlackjack();
    }, 2700);
    // ...
  }
});

/* -------------------------- */


console.dir(game);
