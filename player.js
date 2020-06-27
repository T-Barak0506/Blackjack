/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class Player {
  constructor() {
    this.playerHand = [];
    this.splitHand = [];
    this.handValue = 0;
    this.bjChecker = true;
  }

  checkForBlackjack() {
    if (this.handValue === 21) {
      const crowdGasp = new Sound('./media/sounds/crowdGasp.mp3');

      this.bjChecker = true;
      crowdGasp.playSound(1000);
      return;
    }

    this.bjChecker = false;
  }

  getCardVisual() {
    // Creates the card div
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player
    document.querySelector('#p1-space').appendChild(card);

    setTimeout(() => {
      card.style.backgroundImage = `url('${this.playerHand[this.playerHand.length - 1].visual}')`;
      card.classList.toggle('inactive');
    }, 175);
  }


  getPlayerHandValue() {
    let value = 0;
    this.handValue = 0;

    // loops through all the card values in the hand, adds these values, and displays the sum as a-
    // final hand value for the player's hand.
    this.playerHand.forEach((hand) => {
      // if the card is a king, queen, or jack
      if (hand.value === 'K' || hand.value === 'Q' || hand.value === 'J') {
        value += 10;
        return value;
      }

      // if the card is a ace
      if (hand.value === 'A') {
        value += 11;
        return value;
      }

      // If the card is a standard number card
      value += parseInt(hand.value, 10);
      return value;
    });

    // Looping again but to check for aces. If the hand value exceeds 21, ten-
    //  is subtracted from this value. (Since Aces can also equal 1).
    this.playerHand.forEach((hand) => {
      if (hand.value === 'A' && value > 21) {
        value -= 10;
      }
    });

    // adds the total to the handValue
    this.handValue += value;
    document.getElementById('p1').textContent = `${this.handValue.toString()}`;

    if (this.playerHandValue >= 21 && !this.bjChecker) {
      document.querySelector('.button-container').classList.toggle('hidden');
    }

    return this.handValue;
  }


  playerHit(theDeck, menu = null) {
    const dealSound = new Sound('./media/sounds/cardDeal.wav');
    const mainContainer = document.querySelector('#container');


    const minPhoneWidth = window.matchMedia('(min-width: 615px)');
    const maxPhoneWidth = window.matchMedia('(max-width: 850px)');
    const landscapeMode = window.matchMedia('(orientation: landscape)');


    dealSound.stopSound();
    this.playerHand.push(theDeck.pop());

    setTimeout(() => {
      dealSound.playSound(1000);
    }, 100);

    setTimeout(() => {
      const fourCardHand = !!((this.playerHand.length === 4));

      // If the viewport has a min-width of 610px or more, a max-width of 850px or less, and-
      // if the player has 4 cards and the cmd menu is specified with a 'top' value no less than 90%
      if (minPhoneWidth.matches && maxPhoneWidth.matches && landscapeMode.matches && fourCardHand && menu && menu.style.top === '67%') {
        menu.style.top = '89%';
        mainContainer.style.overflow = 'auto';
      }
    }, 300);

    setTimeout(() => {
      this.getPlayerHandValue();
    }, 700);

    this.getCardVisual();
  }


  playerSplit() {
    const cardToHide = document.querySelectorAll('#p1-space .card')[1]; // Fetches the 2nd card in the player's hand
    cardToHide.classList.toggle('inactive'); // Moves it off-screen


    const splitSpace = document.createElement('div'); // creates the space for the 2nd card to be used later
    splitSpace.setAttribute('id', 'split-space');
    document.body.appendChild(splitSpace);
    splitSpace.style.display = 'none';

    this.splitHand.push(this.playerHand.pop()); // Moves the card object from the deck

    setTimeout(() => {
      splitSpace.appendChild(cardToHide); // Moves the 2nd card to the side
    }, 583);
  }
}
