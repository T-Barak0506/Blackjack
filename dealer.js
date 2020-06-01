/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable one-var */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-const */
/* eslint-disable no-undef */

class Dealer {
  constructor() {
    this.dealerHand = [];
    this.cardSpaceCPU = document.querySelector('#cpu-space');
    this.wageredCoins = 0;
  }

  shuffle(deck) {
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
    // Creates the card
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player or dealer
    document.getElementById('p1-space').appendChild(card);

    setTimeout(() => {
      card.style.backgroundImage = `url('${hand[hand.length - 1].visual}')`;
      card.classList.toggle('inactive');
    }, 150);
  }

  getDealerCardVisual(hand) {
    // Creates the card
    let card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('inactive');

    // Generates the card image and sends it to the player or dealer
    this.cardSpaceCPU.appendChild(card);

    setTimeout(() => {
      if (hand.length === 2 && hand[hand.length - 1].hidden === true) {
        card.style.backgroundImage = "url('/media/Playing Cards/misc./cover.png')";
      } else {
        card.style.backgroundImage = `url('${hand[hand.length - 1].visual}')`;
      }
      card.classList.toggle('inactive');
    }, 150);
  }

  initDeal2Hand(playerHand, dealerHand, theDeck) {
    // adds 2 cards each to the player's and dealer's hands

    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      playerHand.push(theDeck.pop());
      this.getPlayerCardVisual(playerHand);
    }, 500);

    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      dealerHand.push(theDeck.pop());
      this.getDealerCardVisual(dealerHand);
    }, 1000);

    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      playerHand.push(theDeck.pop());
      this.getPlayerCardVisual(playerHand);
    }, 1500);
    setTimeout(() => {
      // Adds the card to the raw deck, and displays the accompanying visual
      dealerHand.push(theDeck.pop());
      dealerHand[dealerHand.length - 1].hidden = true;
      this.getDealerCardVisual(dealerHand);
    }, 2000);


    return `${playerHand} ${dealerHand}`;
  }

  discardCards(playerHand, dealerHand, discardPile) {
    while (playerHand.length > 0) {
      discardPile.push(playerHand.pop());
    }

    while (dealerHand.length > 0) {
      discardPile.push(dealerHand.pop());
    }
  }

  checkDeck(deck, discardPile) {
    if (deck.length <= 10) {
      while (discardPile.length > 1) {
        deck.push(discardPile.pop());
      }
    }
  }
}
/*--------------------------------*/
