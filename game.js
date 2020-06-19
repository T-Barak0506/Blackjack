/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */

class Game {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
    this.menu = new Menu();
    this.currency = new Currency();


    // COMMON CHECKERS
    this.bjChecker = true;
    this.legitBetValue = false;
    this.gameOver = false;

    // HAND VALUES
    this.playerHandValue = 0;
    this.dealerHandValue = 0;


    // HAND MODIFIERS
    this.insuranceHand = false;
    this.splitHand = false;
    this.splitHandNum = 0;


    // SOUNDS:
    this.themeChange = new Sound('./media/sounds/themeChange.wav');
    this.dealSound = new Sound('./media/sounds/cardDeal.wav');
    this.flipSound = new Sound('./media/sounds/cardFlip.wav');
    this.crowdGasp = new Sound('./media/sounds/crowdGasp.mp3');
    this.crowdAw = new Sound('./media/sounds/crowdAw.mp3');
    this.crowdCheer = new Sound('./media/sounds/applause.mp3');
    this.crowdClap = new Sound('./media/sounds/crowdClap.wav');
    this.coinWinSound = new Sound('./media/sounds/ka-ching.mp3');
    this.cardHitSound = new Sound('./media/sounds/playerHit.wav');
    this.doubleSound = new Sound('./media/sounds/doubleDown.wav');
    this.startSound = new Sound('./media/sounds/start.wav');
    this.cardRemoveSound = new Sound('./media/sounds/removeCards.wav');
    this.playerStandSound = new Sound('./media/sounds/removeCards.wav');
  }

  checkBetValue(betValue) {
    // If the start button is clicked, checks the value entered to make sure it's legit
    // TODO: Create a custom alert
    let str = betValue.value.trim();

    if (str[str.length - 1] === '.') {
      str = 5;
    }

    if (parseInt(str, 10) <= 0) {
      // If the number submitted is less than 0
      alert('Needs to be an integer greater than 0 yeah?');
      betValue.value = '';
      return betValue.value;
      // ...
    }

    if (!str) {
      // If the input value is submitted blank
      alert('You need to input an amount of coins to bet.');
      betValue.value = '';
      return betValue.value;
      // ...
    }

    if ((typeof parseInt(str, 10) !== 'number')
             || (isNaN(str))
             || (Number.isFinite(str))) {
      // If the value entered isn't a legitimate number
      alert('You need to input an ACTUAL numerical value. Don\'t try to break me.');
      betValue.value = '';
      return betValue.value;
      // ...
    }

    if (parseInt(str, 10) > this.currency.playerCoins) {
      // If the user tries to bet more coins than they currently have
      alert(`You only have ${this.currency.playerCoins} coins, Don't try and lie to me cowboy.`);
      betValue.value = '';
      return betValue.value;
      // ...
    }

    this.legitBetValue = true;

    // Displays the total bet
    this.currency.totalBet = Math.floor(str);

    // Subtracts the bet value from the player's total coins
    this.currency.playerCoins -= Math.floor(parseInt(str, 10));

    // Display the changes
    this.currency.updateCoinCount();

    return this.currency.playerCoins;
  }


  determineWinner() {
    let timerNum;

    if (this.playerHandValue > 21) {
      timerNum = 900;
    } else {
      timerNum = 500;
    }


    if (this.bjChecker === true && this.playerHandValue === 21) {
      // If the player's first 2 cards equal 21 (blackjack)
      const bjWin = Math.floor(this.currency.totalBet * 1.5);

      if (this.dealerHandValue === 21 && this.dealer.dealerHand.length === 2) {
        // If the dealer also has blackjack
        this.currency.playerCoins += this.currency.totalBet;
        this.currency.totalBet = 0;
        this.currency.storeCoins();

        setTimeout(() => {
          this.coinWinSound.stopSound();
          this.menu.resTopText.textContent = 'push';
          this.menu.resBottomText.textContent = 'Your wager was returned';
          this.menu.resultOverlay.classList.add('hidden');
          this.currency.updateCoinCount();
        }, 450);

        return `You: ${this.playerHandValue}, CPU: ${this.dealerHandValue}`;
      }

      // If only the player has blackjack
      this.menu.toggleDisplay(this.menu.cmdMenu);

      this.currency.playerCoins += bjWin;
      this.currency.totalBet = 0;
      this.currency.storeCoins();

      setTimeout(() => {
        this.crowdClap.playSound();
        this.coinWinSound.playSound();
        this.menu.resTopText.textContent = 'blackjack!!';
        this.menu.resBottomText.textContent = `You won ${bjWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.currency.updateCoinCount();
      }, 550);
    }

    if (this.playerHandValue > 21 || (this.dealerHandValue > this.playerHandValue && this.dealerHandValue <= 21 && !this.insuranceHand) || (this.playerHandValue === this.dealerHandValue && this.dealerHandValue === 21 && this.dealer.dealerHand.length === 2 && this.player.playerHand.length !== 2 && !this.insuranceHand)) {
      // If the player goes over 21 or the dealer has a higher hand value (not exceeding 21)

      // The player loses all wagered coins
      this.currency.storeCoins();

      setTimeout(() => {
        this.crowdAw.playSound();
        this.menu.resTopText.textContent = 'dealer wins!';

        if (this.splitHand === true) {
          this.menu.resBottomText.textContent = `You lost ${this.currency.splitBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          this.currency.totalBet -= this.currency.splitBet;
        } else {
          this.menu.resBottomText.textContent = `You lost ${this.currency.totalBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          this.currency.totalBet = 0;
        }

        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.currency.updateCoinCount();
      }, timerNum);

      return `You: ${this.playerHandValue}, CPU: ${this.dealerHandValue}`;
    }

    if (this.dealerHandValue === this.playerHandValue && !this.bjChecker) {
      // If the dealer has the same hand value as the player

      // Returns the wagered coins to the player
      if (this.splitHand === true) {
        this.currency.playerCoins += this.currency.splitBet;
        this.currency.totalBet -= this.currency.splitBet;
      } else {
        this.currency.playerCoins += this.currency.totalBet;
        this.currency.totalBet = 0;
      }

      this.currency.storeCoins();

      setTimeout(() => {
        this.menu.resTopText.textContent = 'push';
        this.menu.resBottomText.textContent = 'Your wager was returned';
        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.currency.updateCoinCount();
      }, 450);

      return `You: ${this.playerHandValue}, CPU: ${this.dealerHandValue}`;
    }

    if ((this.playerHandValue > this.dealerHandValue && this.playerHandValue <= 21 && !this.bjChecker) || (this.dealerHandValue > 21 && !this.bjChecker)) {
      // If the player has a higher hand value than the dealer or if the dealer goes over 21
      const winAmount = (!this.currency.splitBet) ? this.currency.totalBet * 2 : this.currency.splitBet * 2;

      // Returns the wagered coins, doubled, to the player
      this.currency.playerCoins += winAmount;
      this.currency.storeCoins();

      setTimeout(() => {
        this.crowdCheer.playSound();
        this.coinWinSound.playSound();
        this.menu.resTopText.textContent = 'you win!';

        if (this.splitHand === true) {
          this.currency.totalBet -= this.currency.splitBet;
          this.menu.resBottomText.textContent = `You won ${winAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        } else {
          this.menu.resBottomText.textContent = `You won ${winAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          this.currency.totalBet = 0;
        }
        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.currency.updateCoinCount();
      }, 550);

      return `You: ${this.playerHandValue}, CPU: ${this.dealerHandValue}`;
    }

    if (this.dealerHandValue === 21 && this.dealer.dealerHand.length === 2 && this.insuranceHand === true) {
      // If the dealer gets blackjack and the player has insurance
      const winAmount = this.currency.insureBet * 2;

      // Returns the wagered insurance coins, doubled, to the player
      this.currency.playerCoins += winAmount;
      this.currency.totalBet = 0;
      this.currency.insureBet = 0;
      this.currency.storeCoins();

      setTimeout(() => {
        this.menu.resTopText.textContent = 'insured';
        this.menu.resBottomText.textContent = '';
        this.menu.toggleDisplay(this.menu.resultOverlay);
        this.currency.updateCoinCount();
      }, 550);
    }
  }


  getDealerHandValue() {
    let handValue = 0;

    this.dealerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    this.dealer.dealerHand.forEach((hand) => {
      if (hand.hidden === false) {
        if (hand.value === 'K' || hand.value === 'Q' || hand.value === 'J') {
          handValue += 10;
          return handValue;
        }

        if (hand.value === 'A') {
          handValue += 11;
          return handValue;
        }

        handValue += parseInt(hand.value, 10);
        return handValue;
      }
    });

    // Loops through the array again, but checks for aces. If the hand value exceeds 21, ten-
    // is subtracted from this value. (Since Aces can also equal 1).
    this.dealer.dealerHand.forEach((hand) => {
      if (hand.hidden === false) {
        if (hand.value === 'A' && handValue > 21) {
          handValue -= 10;
          return handValue;
        }
      }
    });

    this.dealerHandValue += handValue;
    document.getElementById('cpu').textContent = `${this.dealerHandValue.toString()}`;
  }

  getPlayerHandValue() {
    let handValue = 0;

    this.playerHandValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    this.player.playerHand.forEach((hand) => {
      if (hand.value === 'K' || hand.value === 'Q' || hand.value === 'J') {
        handValue += 10;
        return handValue;
      }

      if (hand.value === 'A') {
        handValue += 11;
        return handValue;
      }

      handValue += parseInt(hand.value, 10);
      return handValue;
    });

    // Looping to check for aces. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).

    this.player.playerHand.forEach((hand) => {
      if (hand.value === 'A' && handValue > 21) {
        handValue -= 10;
      }
    });

    // adds the total to the handValue
    this.playerHandValue += handValue;
    document.getElementById('p1').textContent = `${this.playerHandValue.toString()}`;

    // Ends the game if the player's hand exceeds 21
    if (this.playerHandValue >= 21 && !this.bjChecker) {
      this.menu.disableBtn(this.menu.hitButton);
      this.menu.disableBtn(this.menu.standButton);
      this.menu.toggleDisplay(this.menu.cmdMenu);
    }

    return this.playerHandValue;
  }

  dealerPlay(theDeck) {
    this.menu.disableBtn(this.menu.standButton);
    this.menu.disableBtn(this.menu.hitButton);

    const item = document.querySelectorAll('#cpu-space .card')[1];

    // Reveals the 2nd card in the dealer's hand
    this.dealer.dealerHand[this.dealer.dealerHand.length - 1].hidden = false;
    item.style.backgroundImage = `url('${this.dealer.dealerHand[this.dealer.dealerHand.length - 1].visual}')`;
    this.flipSound.playSound();


    if ((this.playerHandValue >= 22 && this.splitHand === false) || (this.playerHandValue === 21 && this.bjChecker === true)) {
      setTimeout(() => {
        this.getDealerHandValue();
        this.determineWinner();
      }, 750);
      return this.dealerHandValue;
      // .
    }

    if ((this.playerHandValue <= 21 && !this.bjChecker) || (this.playerHandValue === 21 && !this.bjChecker) || this.splitHand === true) {
      setTimeout(() => {
        this.getDealerHandValue();
      }, 750);

      // Check the hand value after each draw; draws each card-
      // in .75 second increments
      setTimeout(() => {
        const interval = setInterval(() => {
          if (this.dealerHandValue < 17) {
            setTimeout(() => {
              this.dealer.dealerHit(theDeck);
            }, 200);

            setTimeout(() => {
              this.getDealerHandValue();
            }, 900);
          } else {
            this.determineWinner();
            clearInterval(interval);
          }
        }, 1200);
      }, 500);

      return this.dealerHandValue;
    }
  }

  checkForBlackjack() {
    if (this.playerHandValue === 21) {
      this.bjChecker = true;
      this.crowdGasp.playSound();
      this.menu.toggleDisplay(this.menu.cmdMenu);
      setTimeout(() => {
        this.dealerPlay(this.deck.deckOfCards);
      }, 1200);
    } else {
      this.bjChecker = false;
    }
  }

  checkHand() {
    const doubleAmount = Math.floor(this.currency.totalBet * 1.8);

    this.menu.doubleContainer.style.display = 'none';
    this.menu.splitContainer.style.display = 'none';

    // Checks if the hand meets the requirements to double
    if (this.playerHandValue >= 9 && this.playerHandValue <= 18 && doubleAmount <= this.currency.playerCoins && this.currency.totalBet !== 1) {
      this.menu.doubleContainer.style.display = 'block';
    }

    // Checks if the hand meets the requirements to be splittable
    if (this.currency.totalBet < this.currency.playerCoins) {
      // If the player's wager is smaller than the coins they have remaining
      this.menu.splitContainer.style.display = 'block';
    }
  }

  nextRound() {
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.toggle('inactive'));
    this.cardRemoveSound.playSound();

    setTimeout(() => {
      // Deletes the card visual divs
      cards.forEach((card) => card.remove());

      // removes the card objects from the player and dealer's hands
      while (this.player.playerHand.length >= 1) {
        this.deck.discardPile.push(this.player.playerHand.pop());
      }
      while (this.dealer.dealerHand.length >= 1) {
        this.deck.discardPile.push(this.dealer.dealerHand.pop());
      }
      while (this.player.splitHand.length >= 1) {
        this.deck.discardPile.push(this.player.splitHand.pop());
      }

      // Resets the values for card values and hand modifiers
      this.playerHandValue = 0;
      this.dealerHandValue = 0;
      this.splitHandNum = 0;
      this.insuranceHand = false;

      // If the player split their hand, delete the extra hand
      if (this.splitHand === true) {
        document.querySelector('#split-space').remove();
        this.splitHand = false;
      }

      document.querySelector('#p1').textContent = `${this.playerHandValue.toString()}`;
      document.querySelector('#cpu').textContent = `${this.dealerHandValue.toString()}`;


      if (this.currency.playerCoins > 0) {
        // If the players still has coins remaining
        this.menu.enableBtn(this.menu.start);
        this.legitBetValue = false;
        this.menu.cmdMenu.classList.add('hidden');
        this.menu.insuranceMenu.classList.add('hidden');
        this.bjChecker = true;


        if (this.deck.deckOfCards.length <= 13) {
          // If there is less than 14 remaining cards in the deck
          this.deck.restartDeck();
          this.menu.shuffleNotice();
          this.dealer.shuffle(this.deck.deckOfCards);
        } else {
          this.menu.toggleBetMenu();
        }

        return this.currency.playerCoins;
      }

      // If the player has no coins left
      this.crowdAw.stopSound();
      document.querySelector('#p1').textContent = '💀';
      document.querySelector('p#dealer').style.display = 'none';
      this.menu.resTopText.textContent = 'game over!';
      this.menu.resBottomText.textContent = 'You blew all your coins!';
      this.menu.toggleDisplay(this.menu.resultOverlay);
      this.gameOver = true;
    }, 500);
  }

  swapSplitHands() {
    const hand1 = document.querySelector('#p1-space');
    const hand2 = document.querySelector('#split-space');
    const p1Cards = document.querySelectorAll('#p1-space .card');
    const splitNum = (this.splitHandNum === 1) ? 2 : 1;
    const transferArr = [];

    const transferDiv = document.createElement('div');
    transferDiv.setAttribute('id', 'transfer-space');
    transferDiv.style.display = 'none';
    document.body.appendChild(transferDiv);

    this.splitHandNum = splitNum;

    // Loops through all the cards in the playerHand div and adds the "inactive" class to them
    p1Cards.forEach((card) => card.classList.toggle('inactive'));
    this.cardRemoveSound.playSound();

    setTimeout(() => {
      while (this.player.playerHand.length > 0) {
        // Moves the cards from the playerHand array to the 'staging' array
        transferArr.push(this.player.playerHand.shift());
      }
      if (hand1.childNodes.length > 0) {
        // Moves the card divs from the main hand to the "transferDiv"
        while (hand1.childNodes.length > 0) {
          transferDiv.appendChild(hand1.childNodes[0]);
        }
      }

      while (this.player.splitHand.length > 0) {
        // Moves the cards from the player's 2nd hand to the original hand
        this.player.playerHand.push(this.player.splitHand.shift());
      }
      if (hand2.childNodes.length > 0) {
        // Moves the card divs from the 2nd hand to the main hand
        while (hand2.childNodes.length > 0) {
          hand1.appendChild(hand2.childNodes[0]);
        }
      }

      while (transferArr.length > 0) {
        // Moves the cards from the "staging" hand to the player's 2nd hand
        this.player.splitHand.push(transferArr.shift());
      }
      if (transferDiv.childNodes.length > 0) {
        // Moves the card divs from the 'transferDiv' hand to the main hand
        while (transferDiv.childNodes.length > 0) {
          hand2.appendChild(transferDiv.childNodes[0]);
        }
      }
    }, 650);

    setTimeout(() => {
      document.querySelectorAll('#p1-space .card').forEach((card) => card.classList.toggle('inactive'));
      this.dealSound.playSound();
      transferDiv.remove();
    }, 1150);

    setTimeout(() => {
      this.getPlayerHandValue();
    }, 1750);
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


// Click events for the theme choice buttons
menu.classicTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 0;
  menu.toggleThemes();
  menu.storeThemeId();
});


menu.rubyTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 1;
  menu.toggleThemes();
  menu.storeThemeId();
});


menu.aquaTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 2;
  menu.toggleThemes();
  menu.storeThemeId();
});

menu.charcoalTheme.addEventListener('click', () => {
  game.themeChange.playSound();
  menu.currentThemeId = 3;
  menu.toggleThemes();
  menu.storeThemeId();
});

// ---------------------------------------------------------------

currency.getStoredCoins();
menu.getStoredTheme();
menu.toggleThemes();
deck.createDeck();
dealer.shuffle(deck.deckOfCards);
menu.shuffleNotice();
currency.updateCoinCount();


// Adds the "onClick" functions to the hit, stand, double and split buttons
menu.doubleButton.addEventListener('click', () => {
  const doubleAmount = currency.totalBet;

  game.doubleSound.playSound();

  menu.betNotice.textContent = 'Double down bet accepted.';
  menu.toggleDisplay(menu.betNotice);

  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  // Adds the coins to the wager
  currency.playerCoins -= currency.totalBet;
  currency.totalBet += doubleAmount;
  currency.updateCoinCount();

  setTimeout(() => {
    // Waits 0.4 seconds before the card gets received from the deck
    player.playerHit(deck.deckOfCards);
  }, 400);

  setTimeout(() => {
    game.getPlayerHandValue();
    menu.toggleDisplay(menu.cmdMenu);
  }, 1199);

  setTimeout(() => {
    game.dealerPlay(deck.deckOfCards);
  }, 1699);
});


menu.hitButton.addEventListener('click', () => {
  game.cardHitSound.playSound();
  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  setTimeout(() => {
    player.playerHit(deck.deckOfCards);
  }, 400);

  setTimeout(() => {
    game.getPlayerHandValue();

    if (game.playerHandValue === 21) {
      menu.disableBtn(menu.hitButton);
      menu.disableBtn(menu.standButton);

      setTimeout(() => {
        if (game.splitHandNum % 2 === 0) {
          // If the player didn't split their hand or they're on their 2nd hand (if they did split)
          game.dealerPlay(deck.deckOfCards);
        } else {
          game.swapSplitHands();

          setTimeout(() => {
            // Displays the hand number on-screen for 2 seconds
            menu.betNotice.textContent = `Hand #${game.splitHandNum}`;
            menu.toggleDisplay(menu.betNotice, 2000);

            // Receive a card from the deck (since each split hand now only has 1 card)
            player.playerHit(deck.deckOfCards, player.playerHand);
          }, 2000);

          setTimeout(() => {
            game.getPlayerHandValue();
            if (game.playerHandValue === 21 && player.playerHand.length === 2 && game.splitHandNum === 2) {
              // If the player's 1st 2 cards equal 21 (not a blackjack this time)
              game.dealerPlay(deck.deckOfCards);
            } else {
              menu.enableBtn(menu.hitButton);
              menu.enableBtn(menu.standButton);
              menu.toggleDisplay(menu.cmdMenu);
            }
          }, 2700);
        }
      }, 560);
      // .
    } else if (game.playerHandValue >= 22) {
      setTimeout(() => {
        if (game.splitHandNum % 2 === 0) {
          // If the player didn't split their hand or they're on their 2nd hand (if they did split)
          game.dealerPlay(deck.deckOfCards);
        } else {
          game.swapSplitHands();

          setTimeout(() => {
            menu.betNotice.textContent = `Hand #${game.splitHandNum}`;
            menu.toggleDisplay(menu.betNotice, 2000);
            player.playerHit(deck.deckOfCards, player.playerHand);
          }, 2000);

          setTimeout(() => {
            game.getPlayerHandValue();
            menu.enableBtn(menu.hitButton);
            menu.enableBtn(menu.standButton);
            menu.toggleDisplay(menu.cmdMenu);
          }, 2700);
        }
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
    if (game.splitHandNum % 2 === 0) {
      game.dealerPlay(deck.deckOfCards);
    } else {
      game.swapSplitHands();

      setTimeout(() => {
        menu.betNotice.textContent = `Hand #${game.splitHandNum}`;
        menu.toggleDisplay(menu.betNotice, 2000);
        player.playerHit(deck.deckOfCards, player.playerHand);
      }, 2000);

      setTimeout(() => {
        game.getPlayerHandValue();
        if (game.playerHandValue === 21 && player.playerHand.length === 2 && game.splitHandNum === 2) {
          game.dealerPlay(deck.deckOfCards);
        } else {
          menu.enableBtn(menu.hitButton);
          menu.enableBtn(menu.standButton);
          menu.toggleDisplay(menu.cmdMenu);
        }
      }, 2700);
    }
  }, 560);
});

menu.splitButton.addEventListener('click', () => {
  const splitAmount = currency.totalBet;
  game.splitHand = true;

  game.doubleSound.playSound();
  game.splitHandNum = 1;
  menu.betNotice.textContent = 'Split bet accepted.';
  menu.toggleDisplay(menu.betNotice, 3300);

  currency.splitBet = splitAmount;
  currency.playerCoins -= splitAmount;
  currency.totalBet += splitAmount;
  currency.updateCoinCount();

  menu.toggleDisplay(menu.cmdMenu);
  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  setTimeout(() => {
    game.dealSound.playSound();
    player.playerSplit();
  }, 400);

  setTimeout(() => {
    menu.betNotice.textContent = `Hand #${game.splitHandNum}`;

    // menu.toggleDisplay(menu.betNotice, 1900);
    player.playerHit(deck.deckOfCards);

    setTimeout(() => {
      game.getPlayerHandValue();
      menu.splitContainer.style.display = 'none';
      menu.doubleContainer.style.display = 'none';
      menu.toggleDisplay(menu.cmdMenu);
      menu.enableBtn(menu.hitButton);
      menu.enableBtn(menu.standButton);
    }, 750);
  }, 1400);
});

/* -------------------------------------------------------------------------------------*/

// Start the game!
menu.start.addEventListener('click', () => {
  game.checkBetValue(menu.betValueInput);

  if (game.legitBetValue === true) {
    game.startSound.playSound();
    menu.enableBtn(menu.hitButton);
    menu.enableBtn(menu.standButton);
    menu.enableBtn(menu.doubleButton);
    menu.enableBtn(menu.splitButton);
    menu.disableBtn(menu.start);
    menu.toggleBetMenu(); // Hides the bet menu

    // Gives 2 cards to both the player and dealer
    localStorage.setItem('playerCoins', '2500');
    dealer.initDeal2Hand(player.playerHand, dealer.dealerHand, deck.deckOfCards);

    setTimeout(() => {
      game.getPlayerHandValue(); // Check hand value
      game.checkHand(); // Checks if the player can double down or split
      game.getDealerHandValue();
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
      if (game.splitHandNum === 1 || game.splitHandNum === 0) {
        game.nextRound();
        menu.toggleTotalBetMenu();
      } else {
        game.swapSplitHands();
        setTimeout(() => {
          game.determineWinner();
        }, 2000);
      }
    }, 300);
  // .
  } else {
    location.reload();
  }
});

menu.insureYes.addEventListener('click', () => {
  const insureAmount = (currency.totalBet !== 1) ? Math.floor(currency.totalBet * 0.5) : 1;
  currency.insureBet += insureAmount;
  currency.playerCoins -= insureAmount;
  currency.updateCoinCount();

  menu.betNotice.textContent = 'Insurance bet accepted.';
  menu.toggleDisplay(menu.betNotice);

  menu.disableBtn(menu.insureYes);
  menu.disableBtn(menu.insureNo);
  menu.toggleDisplay(menu.insuranceMenu);

  game.insuranceHand = true;
  this.menu.splitContainer.style.display = 'none';

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

menu.betContainer.addEventListener('submit', (form) => {
  form.preventDefault();
});

console.dir(game);
