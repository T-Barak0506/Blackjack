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
    this.themeChange = new Sound('./media/sounds/chipLay3.wav');
    this.dealSound = new Sound('./media/sounds/cardShove1.wav');
    this.flipSound = new Sound('./media/sounds/cardFlip.wav');
    this.cardHitSound = new Sound('./media/sounds/diceThrow4.wav');
    this.doubleSound = new Sound('./media/sounds/chipsHandle1.wav');
    this.startSound = new Sound('./media/sounds/chipsHandle4.wav');
    this.cardRemoveSound = new Sound('./media/sounds/cardTakeOutPackage1.wav');
    this.playerStandSound = new Sound('./media/sounds/cardPlace2.wav');


    // COMMON CHECKERS
    this.bjChecker = true;
    this.splitChecker = false;
    this.legitBetValue = false;
    this.gameOver = false;


    // HAND VALUES
    this.playerHandValue = 0;
    this.dealerHandValue = 0;


    // HAND MODIFIERS
    this.insuranceHand = false;
    this.splitHand = false;
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
      timerNum = 900;
    } else {
      timerNum = 500;
    }

    if (this.bjChecker === true && this.playerHandValue === 21 && this.player.playerHand.length === 2) {
      // If the player's first 2 cards equal 21
      const bjWin = Math.floor(this.currency.totalBet * 1.5);
      this.menu.toggleDisplay(this.menu.cmdMenu);


      setTimeout(() => {
        this.menu.resTopText.textContent = 'blackjack!!';
        this.menu.resBottomText.textContent = `You won ${bjWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        this.menu.toggleDisplay(this.menu.resultOverlay);

        this.currency.playerCoins += bjWin;
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, 550);
    }

    if (this.playerHandValue > 21 || this.dealerHandValue > this.playerHandValue && this.dealerHandValue <= 21 && this.insuranceHand === false || this.playerHandValue === this.dealerHandValue && this.dealerHandValue === 21 && this.dealer.dealerHand.length === 2 && this.player.playerHand.length !== 2 && this.insuranceHand === false) {
      // If the player goes over 21 or the dealer has a higher hand value
      setTimeout(() => {
        this.menu.resTopText.textContent = 'dealer wins!';
        this.menu.resBottomText.textContent = `You lost ${this.currency.totalBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        this.menu.toggleDisplay(this.menu.resultOverlay);

        // The player loses all wagered coins
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, timerNum);
    } else if (this.dealerHandValue === this.playerHandValue && this.bjChecker === false || this.playerHandValue === this.dealerHandValue && this.dealerHandValue === 21 && this.bjChecker === true && this.dealer.dealerHand.length === 2) {
      // If the dealer has the same hand value as the player
      setTimeout(() => {
        this.menu.resTopText.textContent = 'push';
        this.menu.resBottomText.textContent = 'Your wager was returned';
        this.menu.toggleDisplay(this.menu.resultOverlay);

        // Returns the wagered coins to the player
        this.currency.playerCoins += this.currency.totalBet;
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, 450);
    } else if (this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 && this.bjChecker === false || this.dealerHandValue > 21 && this.bjChecker === false) {
      // If the player has a higher hand value or if the dealer goes over 21
      const winAmount = this.currency.totalBet * 2;
      setTimeout(() => {
        this.menu.resTopText.textContent = 'you win!';
        this.menu.resBottomText.textContent = `You won ${winAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        this.menu.toggleDisplay(this.menu.resultOverlay);

        // Returns the wagered coins, doubled, to the player
        this.currency.playerCoins += winAmount;
        this.currency.totalBet = 0;
        this.currency.updateCoinCount();
      }, 550);
    } else if (this.dealerHandValue === 21 && this.dealer.dealerHand.length === 2 && this.insuranceHand === true) {
      // If the dealer gets blackjack and the player has insurance
      const winAmount = this.currency.insureBet * 2;

      setTimeout(() => {
        this.menu.resTopText.textContent = 'insured';
        this.menu.resBottomText.textContent = '';
        this.menu.toggleDisplay(this.menu.resultOverlay);

        // Returns the wagered coins, doubled, to the player
        this.currency.playerCoins += winAmount;
        this.currency.totalBet = 0;
        this.currency.insureBet = 0;
        this.currency.updateCoinCount();
      }, 550);
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

      // setTimeout(() => {
      //   this.determineWinner();
      // }, 600);
    }

    return this.playerHandValue;
  }

  dealerPlay(hand, theDeck) {
    this.menu.disableBtn(this.menu.standButton);
    this.menu.disableBtn(this.menu.hitButton);

    const item = document.querySelectorAll('#cpu-space .card')[1];

    // Reveals the 2nd card in the dealer's hand
    this.flipSound.playSound();
    hand[hand.length - 1].hidden = false;
    item.style.backgroundImage = `url('${hand[hand.length - 1].visual}')`;


    if (this.playerHandValue >= 22) {
      setTimeout(() => {
        this.getDealerHandValue(this.dealer.dealerHand);
        this.determineWinner();
      }, 750);
      // .
    } else if (this.playerHandValue <= 21 && this.bjChecker === false || this.playerHandValue === 21 && this.bjChecker === true) {
      setTimeout(() => {
        this.getDealerHandValue(this.dealer.dealerHand);
      }, 750);

      // Check the hand value after each draw; draws each card-
      // in .75 second increments
      setTimeout(() => {
        const interval = setInterval(() => {
          if (this.dealerHandValue < 17) {
            setTimeout(() => {
              this.dealSound.stopSound();
              hand.push(theDeck.pop());
              this.dealer.getDealerCardVisual(this.dealer.dealerHand);
              this.dealSound.playSound();
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

  checkForBlackjack() {
    if (this.playerHandValue === 21) {
      this.bjChecker = true;
      this.menu.toggleDisplay(this.menu.cmdMenu);
      setTimeout(() => {
        this.dealerPlay(this.dealer.dealerHand, this.deck.deckOfCards);
      }, 700);
    } else {
      this.bjChecker = false;
    }
  }

  checkHand() {
    // Checks if the hand meets the requirements to double or split
    const doubleAmount = Math.floor(this.currency.totalBet * 1.8);

    if (this.playerHandValue >= 9 && this.playerHandValue <= 18 && doubleAmount <= this.currency.playerCoins) {
      this.menu.doubleContainer.style.display = 'block';
    } else {
      this.menu.doubleContainer.style.display = 'none';
    }

    this.menu.splitContainer.style.display = 'none';

    // Checks if the hand meets the requirements to split
  //   if (this.player.playerHand[0].value && this.player.playerHand[1].value === faceCards || this.player.playerHand[0].value === this.player.playerHand[1].value) {
  //     this.menu.splitContainer.style.display = 'block';
  //   } else {
  //     this.menu.splitContainer.style.display = 'none';
  //   }
  }

  nextRound() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.toggle('inactive'));
    this.cardRemoveSound.playSound();

    setTimeout(() => {
      // Removes the card visuals and the cards from both hands and resets the card values
      cards.forEach((card) => card.remove());

      while (this.player.playerHand.length >= 1) {
        this.deck.discardPile.push(this.player.playerHand.pop());
      }

      while (this.dealer.dealerHand.length >= 1) {
        this.deck.discardPile.push(this.dealer.dealerHand.pop());
      }

      this.playerHandValue = 0;
      this.dealerHandValue = 0;
      this.insuranceHand = false;

      document.querySelector('#p1').textContent = `${this.playerHandValue.toString()}`;
      document.querySelector('#cpu').textContent = `${this.dealerHandValue.toString()}`;

      if (this.currency.playerCoins > 0) {
        this.menu.enableBtn(this.menu.start);
        this.legitBetValue = false;
        this.menu.cmdMenu.classList.add('hidden');
        this.menu.insuranceMenu.classList.add('hidden');
        this.bjChecker = true;

        if (this.deck.deckOfCards.length <= 13) {
          this.deck.restartDeck();
          this.menu.shuffleNotice();
          this.dealer.shuffle(this.deck.deckOfCards);
        } else {
          this.menu.toggleBetMenu();
        }
      } else {
        this.menu.resTopText.textContent = 'game over!';
        this.menu.resBottomText.textContent = 'You ran out of coins!';
        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.gameOver = true;
      }
    }, 500);
  }
}


/* -------------------------------------------*/

const game = new Game();
// game.backgroundMusic.playSound();

// Destructuring the game object to reduce clutter
const {
  menu, player, dealer, deck, currency,
} = game;

/* ------------------------------------------------------------------------------------------------------*/


// mouseOver and click events for the theme choice buttons
menu.classicTheme.addEventListener('mouseover', () => {
  menu.themeName.textContent = 'Classic';
  menu.themeName.style.color = '#004b00';

  setTimeout(() => {
    menu.themeName.textContent = '';
  }, 2000);
});

menu.classicTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 0;
  menu.toggleThemes();
});

menu.rubyTheme.addEventListener('mouseover', () => {
  menu.themeName.textContent = 'Ruby';
  menu.themeName.style.color = '#750202';

  setTimeout(() => {
    menu.themeName.textContent = '';
  }, 2000);
});

menu.rubyTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 1;
  menu.toggleThemes();
});

menu.aquaTheme.addEventListener('mouseover', () => {
  menu.themeName.textContent = 'Aqua';
  menu.themeName.style.color = '#007e8e';

  setTimeout(() => {
    menu.themeName.textContent = '';
  }, 2000);
});

menu.aquaTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 2;
  menu.toggleThemes();
});

menu.charcoalTheme.addEventListener('mouseover', () => {
  menu.themeName.textContent = 'Charcoal';
  menu.themeName.style.color = '#545454';

  setTimeout(() => {
    menu.themeName.textContent = '';
  }, 2000);
});

menu.charcoalTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 3;
  menu.toggleThemes();
});


// ---------------------------------------------------------------

currency.updateCoinCount();
deck.createDeck();
dealer.shuffle(deck.deckOfCards);
menu.shuffleNotice();


// Adds the "onClick" functions to the hit, stand, double and split buttons
menu.doubleButton.addEventListener('click', () => {
  const doubleAmount = Math.floor(currency.totalBet * 1.8);

  game.doubleSound.playSound();

  menu.betNotice.textContent = 'Double down bet accepted.';
  menu.betNotice.style.display = 'block';
  menu.toggleDisplay(menu.betNotice);

  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  // Adds the coins to the wager
  currency.playerCoins -= doubleAmount;
  currency.totalBet = doubleAmount;
  currency.updateCoinCount();

  setTimeout(() => {
    game.dealSound.stopSound();
    player.playerHit(player.playerHand, deck.deckOfCards);
    dealer.getPlayerCardVisual(player.playerHand);
    game.dealSound.playSound();
  }, 400);

  setTimeout(() => {
    game.getPlayerHandValue(player.playerHand);
    menu.toggleDisplay(menu.cmdMenu);
  }, 1199);

  setTimeout(() => {
    game.dealerPlay(dealer.dealerHand, deck.deckOfCards);
  }, 1699);

  setTimeout(() => {
    menu.toggleDisplay(menu.betNotice);
    setTimeout(() => {
      menu.betNotice.textContent = '';
      menu.betNotice.style.display = 'none';
    }, 500);
  }, 1900);
});


menu.hitButton.addEventListener('click', () => {
  game.cardHitSound.playSound();
  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  setTimeout(() => {
    game.dealSound.stopSound();
    player.playerHit(player.playerHand, deck.deckOfCards);
    dealer.getPlayerCardVisual(player.playerHand);
    game.dealSound.playSound();
  }, 400);

  setTimeout(() => {
    game.getPlayerHandValue(player.playerHand);

    if (game.playerHandValue === 21) {
      menu.disableBtn(menu.hitButton);
      menu.disableBtn(menu.standButton);
      setTimeout(() => {
        game.dealerPlay(dealer.dealerHand, deck.deckOfCards);
      }, 560);
      // .
    } else if (game.playerHandValue >= 22) {
      setTimeout(() => {
        game.dealerPlay(dealer.dealerHand, deck.deckOfCards);
      }, 560);
      // .
    } else {
      menu.enableBtn(menu.hitButton);
      menu.enableBtn(menu.standButton);
      // .
    }
  }, 1199);
});


menu.standButton.addEventListener('click', () => {
  game.playerStandSound.playSound();

  menu.toggleDisplay(menu.cmdMenu);
  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  setTimeout(() => {
    game.dealerPlay(dealer.dealerHand, deck.deckOfCards);
  }, 560);
});

/* -------------------------------------------------------------------------------------*/

// Start the game!
menu.start.addEventListener('click', () => {
  game.checkBetValue(menu.betValueInput);
  game.startSound.playSound();

  if (game.legitBetValue === true) {
    menu.enableBtn(menu.hitButton);
    menu.enableBtn(menu.standButton);
    menu.enableBtn(menu.doubleButton);
    menu.enableBtn(menu.splitButton);
    menu.disableBtn(menu.start);
    menu.toggleBetMenu(); // Hides the bet menu

    // Gives 2 cards to both the player and dealer
    dealer.initDeal2Hand(player.playerHand, dealer.dealerHand, deck.deckOfCards);

    setTimeout(() => {
      game.getPlayerHandValue(player.playerHand); // Check hand value
      game.checkHand(); // Checks if the player can double down or split
      game.getDealerHandValue(dealer.dealerHand);
      menu.toggleTotalBetMenu();
      game.checkForBlackjack();


      if (game.playerHandValue === 21) {
        menu.disableBtn(menu.hitButton);
        menu.disableBtn(menu.standButton);
        menu.disableBtn(menu.doubleButton);
        menu.disableBtn(menu.splitButton);
      }

      if ((currency.totalBet * 0.5) < currency.playerCoins && dealer.dealerHand[0].value === 'A' && game.playerHandValue <= 20) {
        // If the user has enough coins, doesn't have an hand of 21, and the dealer's face up card is an ace
        menu.enableBtn(menu.insureYes);
        menu.enableBtn(menu.insureNo);
        menu.toggleDisplay(menu.insuranceMenu);
      } else {
        menu.toggleDisplay(menu.cmdMenu);
      }
    }, 2800);
    // ...
  }
});

/* --------------------------------------- */

// After the round finishes and the overlay is displayed, click on it to go to the next round
menu.resultOverlay.addEventListener('click', () => {
  if (game.gameOver === false) {
    game.menu.toggleDisplay(menu.resultOverlay);

    setTimeout(() => {
      game.nextRound();
      menu.toggleTotalBetMenu();
    }, 300);
  // .
  } else {
    location.reload();
  }
});

menu.insureYes.addEventListener('click', () => {
  const insureAmount = Math.floor(currency.totalBet * 0.5);
  currency.insureBet += insureAmount;
  currency.playerCoins -= insureAmount;
  currency.updateCoinCount();

  menu.betNotice.textContent = 'Insurance bet accepted.';
  menu.betNotice.style.display = 'block';
  menu.toggleDisplay(menu.betNotice);

  menu.disableBtn(menu.insureYes);
  menu.disableBtn(menu.insureNo);
  menu.toggleDisplay(menu.insuranceMenu);

  game.insuranceHand = true;

  setTimeout(() => {
    menu.toggleDisplay(menu.cmdMenu);
  }, 450);

  setTimeout(() => {
    menu.toggleDisplay(menu.betNotice);
    setTimeout(() => {
      menu.betNotice.textContent = '';
      menu.betNotice.style.display = 'none';
    }, 500);
  }, 1900);
});

menu.insureNo.addEventListener('click', () => {
  menu.disableBtn(menu.insureYes);
  menu.disableBtn(menu.insureNo);
  menu.toggleDisplay(menu.insuranceMenu);

  setTimeout(() => {
    menu.toggleDisplay(menu.cmdMenu);
  }, 450);
});


console.dir(game);
