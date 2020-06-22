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
    this.legitBetValue = false;
    this.gameOver = false;


    // HAND MODIFIERS
    this.insuranceHand = false;
    this.splitHand = false;
    this.splitHandNum = 0;


    // SOUNDS:
    this.themeChange = new Sound('./media/sounds/themeChange.wav');
    this.dealSound = new Sound('./media/sounds/cardDeal.wav');
    this.flipSound = new Sound('./media/sounds/cardFlip.wav');
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

    const { currency } = this;
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

    if (parseInt(str, 10) > currency.playerCoins) {
      // If the user tries to bet more coins than they currently have
      alert(`You only have ${currency.playerCoins} coins, Don't try and lie to me cowboy.`);
      betValue.value = '';
      return betValue.value;
      // ...
    }

    this.legitBetValue = true;

    // Displays the total bet
    currency.totalBet = Math.floor(str);

    // Subtracts the bet value from the player's total coins
    currency.playerCoins -= Math.floor(parseInt(str, 10));

    // Display the changes
    currency.updateCoinCount();

    return currency.playerCoins;
  }


  determineWinner() {
    const {
      dealer, menu, player, currency,
    } = this;

    if (player.bjChecker === true && player.handValue === 21) {
      // If the player's first 2 cards equal 21 (blackjack)
      const bjWin = Math.floor(currency.totalBet * 1.5);

      if (dealer.handValue === 21 && dealer.dealerHand.length === 2) {
        // If the dealer also has blackjack
        menu.toggleDisplay(menu.cmdMenu);
        currency.playerCoins += currency.totalBet;
        currency.totalBet = 0;
        currency.storeCoins();


        setTimeout(() => {
          this.coinWinSound.stopSound();
          menu.resTopText.textContent = 'push';
          menu.resBottomText.textContent = 'Your wager was returned';
          menu.resultOverlay.classList.remove('hidden');
          currency.updateCoinCount();
        }, 700);

        return menu.resBottomText.textContent;
      }

      // If only the player has blackjack
      menu.toggleDisplay(menu.cmdMenu);

      currency.playerCoins += bjWin;
      currency.totalBet = 0;
      currency.storeCoins();

      setTimeout(() => {
        this.crowdClap.playSound();
        this.coinWinSound.playSound();
        menu.resTopText.textContent = 'blackjack!!';
        menu.resBottomText.textContent = `You won ${bjWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 700);

      return menu.resBottomText.textContent;
    }

    if (player.handValue > 21 || (dealer.handValue > player.handValue && dealer.handValue <= 21 && !this.insuranceHand) || (player.handValue === dealer.handValue && dealer.handValue === 21 && dealer.dealerHand.length === 2 && player.playerHand.length !== 2 && !this.insuranceHand)) {
      // If the player goes over 21 or the dealer has a higher hand value (not exceeding 21)

      // The player loses all wagered coins
      currency.storeCoins();

      setTimeout(() => {
        this.crowdAw.playSound();
        menu.resTopText.textContent = 'dealer wins!';

        if (this.splitHand === true) {
          menu.resBottomText.textContent = `You lost ${currency.splitBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          currency.totalBet -= currency.splitBet;
        } else {
          menu.resBottomText.textContent = `You lost ${currency.totalBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          currency.totalBet = 0;
        }

        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 500);

      return menu.resBottomText.textContent;
    }

    if (dealer.handValue === player.handValue && !player.bjChecker) {
      // If the dealer has the same hand value as the player

      // Returns the wagered coins to the player
      if (this.splitHand === true) {
        currency.playerCoins += currency.splitBet;
        currency.totalBet -= currency.splitBet;
      } else {
        currency.playerCoins += currency.totalBet;
        currency.totalBet = 0;
      }

      currency.storeCoins();

      setTimeout(() => {
        menu.resTopText.textContent = 'push';
        menu.resBottomText.textContent = 'Your wager was returned';
        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 300);

      return menu.resBottomText.textContent;
    }

    if ((player.handValue > dealer.handValue && player.handValue <= 21 && !player.bjChecker) || (dealer.handValue > 21 && !player.bjChecker)) {
      // If the player has a higher hand value than the dealer or if the dealer goes over 21
      const winAmount = (!currency.splitBet) ? currency.totalBet * 2 : currency.splitBet * 2;

      // Returns the wagered coins, doubled, to the player
      currency.playerCoins += winAmount;
      currency.storeCoins();

      setTimeout(() => {
        this.crowdCheer.playSound();
        this.coinWinSound.playSound();
        menu.resTopText.textContent = 'you win!';

        if (this.splitHand === true) {
          currency.totalBet -= currency.splitBet;
          menu.resBottomText.textContent = `You won ${winAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        } else {
          menu.resBottomText.textContent = `You won ${winAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          currency.totalBet = 0;
        }
        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 550);

      return menu.resBottomText.textContent;
    }

    if (dealer.handValue === 21 && dealer.dealerHand.length === 2 && this.insuranceHand === true) {
      // If the dealer gets blackjack and the player has insurance
      const winAmount = currency.insureBet * 2;

      // Returns the wagered insurance coins, doubled, to the player
      currency.playerCoins += winAmount;
      currency.totalBet = 0;
      currency.insureBet = 0;
      currency.storeCoins();

      setTimeout(() => {
        menu.resTopText.textContent = 'insured';
        menu.resBottomText.textContent = '';
        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 550);

      return menu.resBottomText.textContent;
    }
  }


  dealerPlay(theDeck) {
    const item = document.querySelectorAll('#cpu-space .card')[1];
    const { dealer, menu, player } = this;

    menu.disableBtn(menu.standButton);
    menu.disableBtn(menu.hitButton);

    // Reveals the 2nd card in the dealer's hand
    dealer.dealerHand[dealer.dealerHand.length - 1].hidden = false;
    item.style.backgroundImage = `url('${dealer.dealerHand[dealer.dealerHand.length - 1].visual}')`;
    this.flipSound.playSound();


    if ((player.handValue >= 22 && this.splitHand === false) || (player.handValue === 21 && player.bjChecker === true)) {
      // if the player goes over 21 or gets blackjack, the dealer doesn't draw any additional cards
      setTimeout(() => {
        dealer.getDealerHandValue();
        this.determineWinner();
      }, 750);
      return dealer.handValue;
      // .
    }

    if ((player.handValue <= 21 && !player.bjChecker) || (player.handValue === 21 && !player.bjChecker) || this.splitHand === true) {
      // If the player doesn't exceed 21 and doesn't have blackjack
      setTimeout(() => {
        dealer.getDealerHandValue();
      }, 750);


      setTimeout(() => {
        const interval = setInterval(() => {
          if (dealer.handValue < 17) {
            setTimeout(() => {
              dealer.dealerHit(theDeck);
            }, 200);
            // .
          } else {
            this.determineWinner();
            clearInterval(interval);
          }
        }, 1200);
      }, 500);

      return dealer.handValue;
    }
  }

  checkForBlackjack2() {
    if (this.player.handValue === 21 && this.player.bjChecker === true) {
      this.menu.toggleDisplay(this.menu.cmdMenu);
      setTimeout(() => {
        this.dealerPlay(this.deck.deckOfCards);
      }, 1200);
    }
  }

  checkHand() {
    const { menu, player, currency } = this;
    const doubleAmount = currency.totalBet;
    const faceCards = player.playerHand.filter((card) => card.value === 'K' || card.value === 'Q' || card.value === 'J' || card.value === '10');

    menu.doubleContainer.style.display = 'none';
    menu.splitContainer.style.display = 'none';

    // Checks if the hand meets the requirements to double
    if (player.handValue >= 9 && player.handValue <= 18 && doubleAmount <= currency.playerCoins && currency.totalBet !== 1) {
      menu.doubleContainer.style.display = 'block';
    }

    // Checks if the hand meets the requirements to be splitable
    if ((currency.totalBet <= currency.playerCoins && player.playerHand[0].value === player.playerHand[1].value)
    || (currency.totalBet <= currency.playerCoins && faceCards.length === 2)) {
      // If the player's wager is smaller than the coins they have remaining
      menu.splitContainer.style.display = 'block';
    }
  }

  nextRound() {
    const {
      menu, player, currency, deck, dealer,
    } = this;
    const cards = document.querySelectorAll('.card');

    cards.forEach((card) => card.classList.toggle('inactive'));
    this.cardRemoveSound.playSound();

    setTimeout(() => {
      // Deletes the card visual divs
      cards.forEach((card) => card.remove());

      // removes the card objects from the player and dealer's hands
      while (player.playerHand.length >= 1) {
        deck.discardPile.push(player.playerHand.pop());
      }
      while (dealer.dealerHand.length >= 1) {
        deck.discardPile.push(dealer.dealerHand.pop());
      }
      while (player.splitHand.length >= 1) {
        deck.discardPile.push(player.splitHand.pop());
      }

      // Resets the values for card values and hand modifiers
      player.handValue = 0;
      dealer.handValue = 0;
      this.splitHandNum = 0;
      currency.splitBet = 0;
      this.insuranceHand = false;

      // If the player split their hand, delete the extra hand
      if (this.splitHand === true) {
        document.querySelector('#split-space').remove();
        this.splitHand = false;
      }

      document.querySelector('#p1').textContent = `${player.handValue.toString()}`;
      document.querySelector('#cpu').textContent = `${dealer.handValue.toString()}`;


      if (currency.playerCoins > 0) {
        // If the players still has coins remaining
        menu.enableBtn(menu.start);
        this.legitBetValue = false;
        menu.cmdMenu.classList.add('hidden');
        menu.insuranceMenu.classList.add('hidden');
        player.bjChecker = true;


        if (deck.deckOfCards.length <= 13) {
          // If there is less than 14 remaining cards in the deck
          deck.restartDeck();
          menu.shuffleNotice();
          dealer.shuffle(deck.deckOfCards);
        } else {
          menu.toggleBetMenu();
        }

        return currency.playerCoins;
      }

      // If the player has no coins left
      this.crowdAw.stopSound();
      document.querySelector('#p1').textContent = '💀';
      document.querySelector('p#dealer').style.display = 'none';
      menu.resTopText.textContent = 'game over!';
      menu.resBottomText.textContent = 'You blew all your coins!';
      menu.toggleDisplay(menu.resultOverlay);
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
      document.querySelectorAll('#p1-space .card').forEach((card) => card.classList.toggle('inactive')); // Displays the cards
      this.dealSound.playSound();
      transferDiv.remove();
    }, 1150);

    setTimeout(() => {
      this.player.getPlayerHandValue();
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
    if (player.handValue >= 21) {
      menu.toggleDisplay(menu.cmdMenu);
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
            if (player.handValue === 21 && player.playerHand.length === 2 && game.splitHandNum === 2) {
              // If the player's 1st 2 cards equal 21 (not a blackjack this time)
              game.dealerPlay(deck.deckOfCards);
            } else {
              menu.enableBtn(menu.hitButton);
              menu.enableBtn(menu.standButton);
              menu.toggleDisplay(menu.cmdMenu);
            }
          }, 2705);
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
        if (player.handValue === 21 && player.playerHand.length === 2 && game.splitHandNum === 2) {
          game.dealerPlay(deck.deckOfCards);
        } else {
          menu.enableBtn(menu.hitButton);
          menu.enableBtn(menu.standButton);
          menu.toggleDisplay(menu.cmdMenu);
        }
      }, 2705);
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

    player.playerHit(deck.deckOfCards);

    setTimeout(() => {
      menu.splitContainer.style.display = 'none';
      menu.doubleContainer.style.display = 'none';
      menu.toggleDisplay(menu.cmdMenu);
      menu.enableBtn(menu.hitButton);
      menu.enableBtn(menu.standButton);
    }, 700);
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
      player.getPlayerHandValue(); // Check hand value
      game.checkHand(); // Checks if the player can double down or split
      dealer.getDealerHandValue();
      menu.toggleTotalBetMenu();
      player.checkForBlackjack();
      game.checkForBlackjack2();

      if (player.handValue === 21) {
        menu.disableBtn(menu.hitButton);
        menu.disableBtn(menu.standButton);
        menu.disableBtn(menu.doubleButton);
        menu.disableBtn(menu.splitButton);
        return;
      }

      if ((currency.totalBet * 0.5) < currency.playerCoins && dealer.dealerHand[0].value === 'A' && player.handValue <= 20) {
        // If the user has enough coins, doesn't have an hand of 21, and the dealer's face up card is an ace
        menu.enableBtn(menu.insureYes);
        menu.enableBtn(menu.insureNo);
        menu.toggleDisplay(menu.insuranceMenu);
        return;
      }

      menu.toggleDisplay(menu.cmdMenu);
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
