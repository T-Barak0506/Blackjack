/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
class Player {
  constructor() {
    this.playerHand = [];
    this.splitHand = [];
    this.cardSpaceP1 = document.querySelector('#p1-space');
    this.dealSound = new Sound('./media/sounds/cardDeal.wav');
  }

  getPlayerCardVisual() {
    // Creates the card div
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player
    this.cardSpaceP1.appendChild(card);

    setTimeout(() => {
      card.style.backgroundImage = `url('${this.playerHand[this.playerHand.length - 1].visual}')`;
      card.classList.toggle('inactive');
    }, 175);
  }

  playerHit(theDeck) {
    this.dealSound.stopSound();
    this.playerHand.push(theDeck.pop());

    setTimeout(() => {
      this.dealSound.playSound();
    }, 100);

    this.getPlayerCardVisual();
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
