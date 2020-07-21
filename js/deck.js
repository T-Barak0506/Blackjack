/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
class Deck {
  constructor() {
    this.deckOfCards = [];
    this.discardPile = [];
    this.suits = ['Cl', 'Di', 'He', 'Sp']; // Clubs, Diamonds, Hearts, Spades
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'];
    this.cardVisuals = [
      '/src/media/cards/2Cl.png',
      '/src/media/cards/3Cl.png',
      '/src/media/cards/4Cl.png',
      '/src/media/cards/5Cl.png',
      '/src/media/cards/6Cl.png',
      '/src/media/cards/7Cl.png',
      '/src/media/cards/8Cl.png',
      '/src/media/cards/9Cl.png',
      '/src/media/cards/10Cl.png',
      '/src/media/cards/ACl.png',
      '/src/media/cards/JCl.png',
      '/src/media/cards/KCl.png',
      '/src/media/cards/QCl.png',
      '/src/media/cards/2Di.png',
      '/src/media/cards/3Di.png',
      '/src/media/cards/4Di.png',
      '/src/media/cards/5Di.png',
      '/src/media/cards/6Di.png',
      '/src/media/cards/7Di.png',
      '/src/media/cards/8Di.png',
      '/src/media/cards/9Di.png',
      '/src/media/cards/10Di.png',
      '/src/media/cards/ADi.png',
      '/src/media/cards/JDi.png',
      '/src/media/cards/KDi.png',
      '/src/media/cards/QDi.png',
      '/src/media/cards/2He.png',
      '/src/media/cards/3He.png',
      '/src/media/cards/4He.png',
      '/src/media/cards/5He.png',
      '/src/media/cards/6He.png',
      '/src/media/cards/7He.png',
      '/src/media/cards/8He.png',
      '/src/media/cards/9He.png',
      '/src/media/cards/10He.png',
      '/src/media/cards/AHe.png',
      '/src/media/cards/JHe.png',
      '/src/media/cards/KHe.png',
      '/src/media/cards/QHe.png',
      '/src/media/cards/2Sp.png',
      '/src/media/cards/3Sp.png',
      '/src/media/cards/4Sp.png',
      '/src/media/cards/5Sp.png',
      '/src/media/cards/6Sp.png',
      '/src/media/cards/7Sp.png',
      '/src/media/cards/8Sp.png',
      '/src/media/cards/9Sp.png',
      '/src/media/cards/10Sp.png',
      '/src/media/cards/ASp.png',
      '/src/media/cards/JSp.png',
      '/src/media/cards/KSp.png',
      '/src/media/cards/QSp.png'];
  }

  createDeck() {
    const protoDeck = [];
    let n = 0;

    // 13 values per suit
    this.suits.forEach((suit) => {
      this.values.forEach((value) => {
        this.deckOfCards.push(new Card(suit, value));
      });
    });

    // Adds the appropriate image file for each card
    for (let i = 0; i < this.deckOfCards.length; i++) {
      this.deckOfCards[i].visual += this.cardVisuals[i];
    }

    /* ---------------------------------------------------- */

    // Adds these cards to the protoDeck variable before pushing everything to the-
    // main deck (156-card deck)

    while (n < 2) {
      this.suits.forEach((suit) => {
        this.values.forEach((value) => {
          protoDeck.push(new Card(suit, value));
        });
      });

      // Adds the appropriate image file for each card
      for (let i = 0; i < protoDeck.length; i++) {
        protoDeck[i].visual += this.cardVisuals[i];
      }

      // Adds the extra cards to the main deck
      while (protoDeck.length > 0) {
        this.deckOfCards.push(protoDeck.pop());
      }

      n++;
    }

    // this.deckOfCards = [...this.deckOfCards,
    //   new Card('Sp', 'Q', '/src/media/cards/QSp.png'),
    //   new Card('Cl', 'K', '/src/media/cards/KCl.png'),
    //   new Card('Di', 'A', '/src/media/cards/ADi.png'),
    //   new Card('He', '3', '/src/media/cards/3He.png'),
    // ];
  }

  restartDeck() {
    while (this.discardPile.length > 0) {
      this.deckOfCards.push(this.discardPile.pop());
    }
  }
}
