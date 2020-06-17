/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */

class Dealer {
  constructor() {
    this.dealerHand = [];
    // this.handValue = 0;
    this.cardSpaceCPU = document.querySelector('#cpu-space');

    // Sounds
    this.dealSound = new Sound('./media/sounds/cardDeal.wav');
    this.dealSound2 = new Sound('./media/sounds/cardDeal.wav');
    this.shuffleSound = new Sound('./media/sounds/cardShuffle2.wav');
    this.shuffleSound2 = new Sound('./media/sounds/cardShuffle.wav');
  }

  shuffle(deck) {
    this.shuffleSound.playSound();

    setTimeout(() => {
      this.shuffleSound2.playSound();
    }, 2900);

    let counter = 0;

    // Shuffle the deck thrice because... why not :)
    while (counter < 3) {
      let counter2 = deck.length,
        temp,
        i;

      while (counter2) {
        i = Math.floor(Math.random() * counter2--);
        temp = deck[counter2];
        deck[counter2] = deck[i];
        deck[i] = temp;
      }

      counter++;
    }

    return deck;
  }

  getPlayerCardVisual(hand) {
    // Creates the card div
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player
    document.getElementById('p1-space').appendChild(card);

    setTimeout(() => {
      card.style.backgroundImage = `url('${hand[hand.length - 1].visual}')`;
      card.classList.toggle('inactive');
    }, 175);
  }

  getDealerCardVisual() {
    // Creates the card
    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player
    this.cardSpaceCPU.appendChild(card);

    setTimeout(() => {
      try {
        if (this.dealerHand.length === 2 && this.dealerHand[this.dealerHand.length - 1].hidden === true) {
          card.style.backgroundImage = "url('/misc./cover.png')";
        } else {
          card.style.backgroundImage = `url('${this.dealerHand[this.dealerHand.length - 1].visual}')`;
        }
        card.classList.toggle('inactive');
      } catch (err) {
        card.style.backgroundColor = '#555555';
        card.style.color = '#ffffff';
        card.textContent = `Couldn't display visual because: ${err}`;
        console.error(err);
      }
    }, 175);
  }

  dealerHit(theDeck) {
    this.dealSound.stopSound();
    this.dealerHand.push(theDeck.pop());

    setTimeout(() => {
      this.dealSound.playSound();
    }, 100);

    this.getDealerCardVisual();
  }

  initDeal2Hand(playerHand, dealerHand, theDeck) {
    // adds 2 cards each to the player's and dealer's hands
    const card1 = document.createElement('div');
    const card2 = document.createElement('div');

    card1.classList.add('card');
    card1.classList.add('inactive');
    card2.classList.add('card');
    card2.classList.add('inactive');

    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      playerHand.push(theDeck.pop());

      setTimeout(() => {
        this.dealSound.stopSound();
        // Generates the card image and sends it to the player
        document.getElementById('p1-space').appendChild(card1);

        setTimeout(() => {
          card1.style.backgroundImage = `url('${playerHand[playerHand.length - 1].visual}')`;
          card1.classList.toggle('inactive');
        }, 175);
        setTimeout(() => {
          this.dealSound2.playSound();
        }, 100);
      }, 100);
    }, 550);

    setTimeout(() => {
      // Adds a card to the dealer's hand
      this.dealerHit(theDeck);
    }, 1050);

    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      if (playerHand.length <= 1) {
        playerHand.push(theDeck.pop());
        setTimeout(() => {
          // Generates the card image and sends it to the player
          document.getElementById('p1-space').appendChild(card2);

          setTimeout(() => {
            card2.style.backgroundImage = `url('${playerHand[playerHand.length - 1].visual}')`;
            card2.classList.toggle('inactive');
          }, 175);
          setTimeout(() => {
            this.dealSound2.playSound();
          }, 100);
        }, 130);
      }
    }, 1550);

    setTimeout(() => {
      this.dealSound.stopSound();
      // Adds the card to the raw deck, and displays the accompanying visual

      if (dealerHand.length <= 1) {
        dealerHand.push(theDeck.pop());

        setTimeout(() => {
          dealerHand[dealerHand.length - 1].hidden = true;
          this.getDealerCardVisual(dealerHand);
          setTimeout(() => {
            this.dealSound.playSound();
          }, 100);
        }, 130);
      }
    }, 2050);
  }
}
/*--------------------------------*/
