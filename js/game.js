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
  }

  checkBetValue() {
    // If the start button is clicked, checks the value entered to make sure it's legit

    const { currency, menu } = this;
    const betAmount = Math.floor(parseInt(menu.betValueInput.value.trim(), 10)); // Round the value down if it's a decimal

    const betFormAlert = document.createElement('div');
    betFormAlert.classList.add('bet-form-alert');
    document.querySelector('.bet-container').appendChild(betFormAlert);

    if (betAmount <= 0) {
      // If the number submitted is less than 1
      menu.betValueInput.blur();
      betFormAlert.style.display = 'flex';
      betFormAlert.textContent = 'Needs to be a whole number greater than 0 yeah?';
      menu.betValueInput.value = '';

      setTimeout(() => {
        betFormAlert.remove();
        menu.betValueInput.focus();
      }, 3500);
      return;
      // ...
    }

    if (isNaN(betAmount)) {
      // if the input isn't a number
      menu.betValueInput.blur();
      betFormAlert.style.display = 'flex';
      betFormAlert.textContent = 'You need to provide an ACTUAL value. Don\'t try to break the game.';
      menu.betValueInput.value = '';

      setTimeout(() => {
        betFormAlert.remove();
        menu.betValueInput.focus();
      }, 5000);
      return;
      // ...
    }

    if (!betAmount) {
      // If the input value is submitted blank
      menu.betValueInput.blur();
      betFormAlert.style.display = 'flex';
      betFormAlert.textContent = 'You need to input an amount of coins to bet.';
      menu.betValueInput.value = '';

      setTimeout(() => {
        betFormAlert.remove();
        menu.betValueInput.focus();
      }, 3500);
      return;
      // ...
    }

    if (betAmount > currency.playerCoins) {
      // If the user tries to bet more coins than they currently have
      menu.betValueInput.blur();
      betFormAlert.style.display = 'flex';
      betFormAlert.textContent = `You only have ${currency.playerCoins} coins, Don't try to lie to me cowboy.`;
      menu.betValueInput.value = '';

      setTimeout(() => {
        betFormAlert.remove();
        menu.betValueInput.focus();
      }, 5000);
      return;
      // ...
    }

    this.legitBetValue = true;
    betFormAlert.remove();
    currency.totalBet = betAmount; // Displays the input value as the total bet
    currency.playerCoins -= betAmount; // Subtracts the bet value from the player's total coins
    currency.updateCoinCount(); // Display the changes
  }


  determineWinner() {
    const {
      dealer, menu, player, currency,
    } = this;

    if (player.bjChecker === true && player.handValue === 21) {
      // If the player's first 2 cards equal 21 (blackjack)
      const bjWin = Math.floor(currency.totalBet * 1.5);
      const crowdClap = new Sound('./media/sounds/crowdClap.wav');
      const coinWinSound = new Sound('./media/sounds/ka-ching.mp3');

      if (dealer.handValue === 21 && dealer.dealerHand.length === 2) {
        // If the dealer also has blackjack
        menu.toggleDisplay(menu.cmdMenu);
        currency.playerCoins += currency.totalBet;
        currency.totalBet = 0;
        currency.storeCoins();


        setTimeout(() => {
          coinWinSound.stopSound();
          menu.resTopText.textContent = 'push';
          menu.resBottomText.textContent = 'Your wager was returned';
          menu.resultOverlay.classList.remove('hidden');
          currency.updateCoinCount();
        }, 700);

        setTimeout(() => {
          menu.toggleDisplay(menu.resTapNotice);
        }, 700 + 6100);

        return;
      }

      // If only the player has blackjack
      menu.toggleDisplay(menu.cmdMenu);

      currency.playerCoins += bjWin;
      currency.totalBet = 0;
      currency.storeCoins();

      setTimeout(() => {
        crowdClap.playSound(5500);
        coinWinSound.playSound(1200);
        menu.resTopText.textContent = 'blackjack!!';
        menu.resBottomText.textContent = `You won ${bjWin.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 700);

      setTimeout(() => {
        menu.toggleDisplay(menu.resTapNotice);
      }, 700 + 6100);

      return;
    }

    if (player.handValue > 21 || (dealer.handValue > player.handValue && dealer.handValue <= 21 && !this.insuranceHand) || (player.handValue === dealer.handValue && dealer.handValue === 21 && dealer.dealerHand.length === 2 && player.playerHand.length !== 2 && !this.insuranceHand)) {
      // If the player goes over 21 or the dealer has a higher hand value (not exceeding 21)
      const crowdAw = new Sound('./media/sounds/crowdAw.mp3');

      // The player loses all wagered coins
      currency.storeCoins();

      setTimeout(() => {
        crowdAw.playSound(1700);
        menu.resTopText.textContent = 'dealer wins!';

        if (this.splitHand === true) { // If the player split their hand
          menu.resBottomText.textContent = `You lost ${currency.splitBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          currency.totalBet -= currency.splitBet;
        } else {
          menu.resBottomText.textContent = `You lost ${currency.totalBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} coins.`;
          currency.totalBet = 0;
        }

        menu.toggleDisplay(menu.resultOverlay);
        currency.updateCoinCount();
      }, 700);

      setTimeout(() => {
        menu.toggleDisplay(menu.resTapNotice);
      }, 700 + 6100);

      return;
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

      setTimeout(() => {
        menu.toggleDisplay(menu.resTapNotice);
      }, 300 + 6100);

      return;
    }

    if ((player.handValue > dealer.handValue && player.handValue <= 21 && !player.bjChecker) || (dealer.handValue > 21 && !player.bjChecker)) {
      // If the player has a higher hand value than the dealer or if the dealer goes over 21
      const winAmount = (!currency.splitBet) ? currency.totalBet * 2 : currency.splitBet * 2;
      const crowdCheer = new Sound('./media/sounds/applause.mp3');
      const coinWinSound = new Sound('./media/sounds/ka-ching.mp3');

      // Returns the wagered coins, doubled, to the player
      currency.playerCoins += winAmount;
      currency.storeCoins();

      setTimeout(() => {
        crowdCheer.playSound(1800);
        coinWinSound.playSound(1200);
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

      setTimeout(() => {
        menu.toggleDisplay(menu.resTapNotice);
      }, 550 + 6100);

      return;
    }

    if (dealer.handValue === 21 && dealer.dealerHand.length === 2 && this.insuranceHand) {
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

      setTimeout(() => {
        menu.toggleDisplay(menu.resTapNotice);
      }, 550 + 6100);
    }
  }


  dealerPlay(theDeck) {
    const flipSound = new Sound('./media/sounds/cardFlip.wav');
    const item = document.querySelectorAll('#cpu-space .card')[1];
    const { dealer, menu, player } = this;

    menu.disableBtn(menu.standButton);
    menu.disableBtn(menu.hitButton);

    // Reveals the 2nd card in the dealer's hand
    dealer.dealerHand[dealer.dealerHand.length - 1].hidden = false;
    item.style.backgroundImage = `url('${dealer.dealerHand[dealer.dealerHand.length - 1].visual}')`;
    flipSound.playSound(1100);


    if ((player.handValue >= 22 && this.splitHand === false) || (player.handValue === 21 && player.bjChecker === true)) {
      // if the player goes over 21 or gets blackjack, the dealer doesn't draw any additional cards
      setTimeout(() => {
        dealer.getDealerHandValue();
        this.determineWinner();
      }, 750);
      return;
      // .
    }

    if ((player.handValue <= 21 && !player.bjChecker) || (player.handValue === 21 && !player.bjChecker) || this.splitHand === true) {
      // If the player's hand doesn't exceed 21 and doesn't have blackjack
      setTimeout(() => {
        dealer.getDealerHandValue();
      }, 750);


      setTimeout(() => {
        const interval = setInterval(() => {
          if (dealer.handValue < 17) {
            setTimeout(() => {
              // keep drawing cards until the value is 17 or more
              dealer.dealerHit(theDeck, menu.totalBetMenu);
            }, 200);
            // .
          } else {
            this.determineWinner();
            clearInterval(interval);
          }
        }, 1200);
      }, 500);
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
    const faceCards = player.playerHand.filter((card) => card.value === 'K' || card.value === 'Q' || card.value === 'J' || card.value === '10');

    menu.doubleContainer.style.display = 'none';
    menu.splitContainer.style.display = 'none';

    // Checks if the hand meets the requirements to double
    if (currency.totalBet <= currency.playerCoins && currency.totalBet !== 1) {
      menu.doubleContainer.style.display = 'block';
    }

    // Checks if the hand meets the requirements to be splitable
    if ((currency.totalBet <= currency.playerCoins && player.playerHand[0].value === player.playerHand[1].value)
    || (currency.totalBet <= currency.playerCoins && faceCards.length === 2)) {
      // If the player's wager is smaller than the coins they have remaining
      // and the values shown on the cards are the same, allow the player to split
      menu.splitContainer.style.display = 'block';
    }
  }

  nextRound() {
    const cards = document.querySelectorAll('.card');
    const cardRemoveSound = new Sound('./media/sounds/removeCards.wav');

    const minPhoneWidth = window.matchMedia('(min-width: 615px)');
    const maxPhoneWidth = window.matchMedia('(max-width: 850px)');
    const landscapeMode = window.matchMedia('(orientation: landscape)');

    const {
      menu, player, currency, deck, dealer,
    } = this;

    cards.forEach((card) => card.classList.toggle('inactive'));
    cardRemoveSound.playSound(1200);


    setTimeout(() => {
      // Deletes the card visual divs
      cards.forEach((card) => card.remove());

      // removes the card objects from the player and dealer's hand arrays
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

      menu.toggleDisplay(menu.resTapNotice);


      // if the viewport is a phone
      if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches) {
        document.querySelector('#container').style.overflow = 'hidden';
        menu.cmdMenu.style.top = '97%';
        menu.insuranceMenu.style.bottom = '-30.5%';
      }

      // If the player split their hand, delete the extra hand div
      if (this.splitHand === true) {
        document.querySelector('#split-space').remove();
        this.splitHand = false;
      }

      document.querySelector('#p1').textContent = `${player.handValue.toString()}`;
      document.querySelector('#cpu').textContent = `${dealer.handValue.toString()}`;

      document.querySelector('#container').scrollTop = 0;
      document.querySelector('#container').style.overflow = 'hidden';

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

        return;
      }

      // If the player has no coins left
      document.querySelector('#p1').textContent = '💀';
      document.querySelector('p#dealer').style.display = 'none';
      menu.resTopText.textContent = 'game over!';
      menu.resBottomText.textContent = 'You blew all your coins!';
      menu.toggleDisplay(menu.resultOverlay);
      this.gameOver = true;
    }, 500);
  }

  swapSplitHands() {
    const dealSound = new Sound('./media/sounds/cardDeal.wav');
    const cardRemoveSound = new Sound('./media/sounds/removeCards.wav');
    const splitHand = document.querySelector('#split-space');
    const p1Cards = document.querySelectorAll('#p1-space .card');
    const splitNum = (this.splitHandNum === 1) ? 2 : 1;
    const transferArr = [];

    const minPhoneWidth = window.matchMedia('(min-width: 615px)');
    const maxPhoneWidth = window.matchMedia('(max-width: 850px)');
    const landscapeMode = window.matchMedia('(orientation: landscape)');

    const { menu, player } = this;

    const transferDiv = document.createElement('div');
    transferDiv.setAttribute('id', 'transfer-space');
    transferDiv.style.display = 'none';
    document.body.appendChild(transferDiv);

    this.splitHandNum = splitNum;

    // Loops through all the cards in the playerHand div and adds the "inactive" class to them
    p1Cards.forEach((card) => card.classList.toggle('inactive'));

    cardRemoveSound.playSound(1200);

    // If the viewport has a min-width of 610px or more, a max-width of 850px or less
    if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches && player.splitHand.length <= 3) {
      menu.cmdMenu.style.top = '67%';
      document.querySelector('#container').scrollTop = 0;
      document.querySelector('#container').style.overflow = 'hidden';
    }

    setTimeout(() => {
      while (player.playerHand.length > 0) {
        // Moves the cards from the playerHand array to the 'staging' array
        transferArr.push(player.playerHand.shift());
      }
      if (menu.p1Border.childNodes.length > 0) {
        // this will move the card divs from the playerHand div to the "transferDiv"
        while (menu.p1Border.childNodes.length > 0) {
          transferDiv.appendChild(menu.p1Border.childNodes[0]);
        }
      }

      while (player.splitHand.length > 0) {
        // Moves the cards from the player's 2nd hand to the original hand
        player.playerHand.push(player.splitHand.shift());
      }
      if (splitHand.childNodes.length > 0) {
        // Moves the card divs from the 2nd hand div to the playerHand div
        while (splitHand.childNodes.length > 0) {
          menu.p1Border.appendChild(splitHand.childNodes[0]);
        }
      }

      while (transferArr.length > 0) {
        // Moves the cards from the "staging" array to the player's 2nd hand
        player.splitHand.push(transferArr.shift());
      }
      if (transferDiv.childNodes.length > 0) {
        // Moves the card divs from the 'transferDiv' hand to the main playerHand div
        while (transferDiv.childNodes.length > 0) {
          splitHand.appendChild(transferDiv.childNodes[0]);
        }
      }
    }, 650);

    setTimeout(() => {
      document.querySelectorAll('#p1-space .card').forEach((card) => card.classList.toggle('inactive')); // Displays the cards
      dealSound.playSound(1200);
      transferDiv.remove();
    }, 1150);

    setTimeout(() => {
      player.getPlayerHandValue();
    }, 1750);
  }
}


/* -------------------------------------------*/

const game = new Game();

// Destructuring the game object to reduce clutter
const {
  menu, player, dealer, deck, currency,
} = game;

const minPhoneWidth = window.matchMedia('(min-width: 615px)');
const maxPhoneWidth = window.matchMedia('(max-width: 850px)');
const landscapeMode = window.matchMedia('(orientation: landscape)');

if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches) {
  document.querySelector('#container').style.overflow = 'hidden';
}

/* ------------------------------------------------------------------------------------------------------*/


// Click events for the theme choice buttons
menu.classicTheme.addEventListener('click', () => {
  const themeChange = new Sound('./media/sounds/themeChange.wav');

  themeChange.playSound(1200);
  menu.currentThemeId = 0;
  menu.toggleThemes();
  menu.storeThemeId();
});

menu.rubyTheme.addEventListener('click', () => {
  const themeChange = new Sound('./media/sounds/themeChange.wav');

  themeChange.playSound(1200);
  menu.currentThemeId = 1;
  menu.toggleThemes();
  menu.storeThemeId();
});

menu.aquaTheme.addEventListener('click', () => {
  const themeChange = new Sound('./media/sounds/themeChange.wav');

  themeChange.playSound(1200);
  menu.currentThemeId = 2;
  menu.toggleThemes();
  menu.storeThemeId();
});

menu.charcoalTheme.addEventListener('click', () => {
  const themeChange = new Sound('./media/sounds/themeChange.wav');

  themeChange.playSound(1200);
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
  const doubleSound = new Sound('./media/sounds/doubleDown.wav');
  const doubleAmount = currency.totalBet;

  doubleSound.playSound(1200);

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
  const cardHitSound = new Sound('./media/sounds/playerHit.wav');

  cardHitSound.playSound(1000);
  menu.disableBtn(menu.hitButton);
  menu.disableBtn(menu.standButton);
  menu.disableBtn(menu.doubleButton);
  menu.disableBtn(menu.splitButton);

  setTimeout(() => {
    player.playerHit(deck.deckOfCards, menu.cmdMenu);
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
            player.playerHit(deck.deckOfCards);
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
  const cardRemoveSound = new Sound('./media/sounds/removeCards.wav');
  cardRemoveSound.playSound(1500);

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
  const dealSound = new Sound('./media/sounds/cardDeal.wav');
  const splitSound = new Sound('./media/sounds/doubleDown.wav');
  const splitAmount = currency.totalBet;
  game.splitHand = true;

  splitSound.playSound(1200);
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
    dealSound.playSound(1500);
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
  game.checkBetValue();

  // If the viewport has a min-width of 610px or more, a max-width of 850px or less
  if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches && game.legitBetValue) {
    menu.cmdMenu.style.top = '67%';
    menu.insuranceMenu.style.bottom = '-1.5%';
    // document.querySelector('#container').style.overflow = 'hidden';
  }

  if (game.legitBetValue) {
    const startSound = new Sound('./media/sounds/start.wav');

    startSound.playSound(1200);
    menu.enableBtn(menu.hitButton);
    menu.enableBtn(menu.standButton);
    menu.enableBtn(menu.doubleButton);
    menu.enableBtn(menu.splitButton);
    menu.disableBtn(menu.start);
    menu.toggleBetMenu(); // Hides the bet menu

    // Gives 2 cards to both the player and dealer
    dealer.initDeal2Hand(player.playerHand, dealer.dealerHand, deck.deckOfCards);
    localStorage.setItem('playerCoins', '2500');

    setTimeout(() => {
      player.getPlayerHandValue(); // Check hand value
      game.checkHand(); // Checks if the player can double down or split
      dealer.getDealerHandValue();
      menu.toggleTotalBetMenu();
      player.checkForBlackjack();
      game.checkForBlackjack2();

      // if the player has blackjack
      if (player.handValue === 21) {
        menu.disableBtn(menu.hitButton);
        menu.disableBtn(menu.standButton);
        menu.disableBtn(menu.doubleButton);
        menu.disableBtn(menu.splitButton);
        return;
      }

      // Insurance
      if ((currency.totalBet * 0.5) < currency.playerCoins && dealer.dealerHand[0].value === 'A' && player.handValue <= 20 && currency.totalBet >= 2) {
        // If the user has enough coins, doesn't have an hand of 21, and the dealer's face up card is an ace
        menu.enableBtn(menu.insureYes);
        menu.enableBtn(menu.insureNo);
        menu.toggleDisplay(menu.insuranceMenu);
        return;
      }

      menu.toggleDisplay(menu.cmdMenu);
    }, 2800);

    setTimeout(() => {
      if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches) {
        document.querySelector('.total-bet-container').style.bottom = '18%';
      }
    }, 3000);
    // ...
  }
});

/* --------------------------------------- */

// After the round finishes and the overlay is displayed, click on it to go to the next round
menu.resultOverlay.addEventListener('click', () => {
  if (game.gameOver === true) return location.reload();

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
});

menu.insureYes.addEventListener('click', () => {
  const insureAmount = (currency.totalBet !== 1) ? Math.floor(currency.totalBet * 0.5) : 1;
  currency.insureBet += insureAmount;
  currency.playerCoins -= insureAmount;
  currency.updateCoinCount();

  menu.betNotice.textContent = `Insurance bet accepted. (${insureAmount.toString()} coins)`;
  menu.toggleDisplay(menu.betNotice, 3800);


  menu.disableBtn(menu.insureYes);
  menu.disableBtn(menu.insureNo);
  menu.toggleDisplay(menu.insuranceMenu);

  game.insuranceHand = true;
  menu.splitContainer.style.display = 'none';

  setTimeout(() => menu.toggleDisplay(menu.cmdMenu), 600);
});

menu.insureNo.addEventListener('click', () => {
  menu.disableBtn(menu.insureYes);
  menu.disableBtn(menu.insureNo);
  menu.toggleDisplay(menu.insuranceMenu);

  setTimeout(() => menu.toggleDisplay(menu.cmdMenu), 450);
});

menu.betContainer.addEventListener('submit', (form) => {
  // prevents the page from reloading if an invalid bet amount was provided
  form.preventDefault();
});

// TODO: add a rules section

// document.querySelector('.rules-link').remove();
