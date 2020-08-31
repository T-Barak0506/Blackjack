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
      './media/cards/2Cl.png',
      './media/cards/3Cl.png',
      './media/cards/4Cl.png',
      './media/cards/5Cl.png',
      './media/cards/6Cl.png',
      './media/cards/7Cl.png',
      './media/cards/8Cl.png',
      './media/cards/9Cl.png',
      './media/cards/10Cl.png',
      './media/cards/ACl.png',
      './media/cards/JCl.png',
      './media/cards/KCl.png',
      './media/cards/QCl.png',
      './media/cards/2Di.png',
      './media/cards/3Di.png',
      './media/cards/4Di.png',
      './media/cards/5Di.png',
      './media/cards/6Di.png',
      './media/cards/7Di.png',
      './media/cards/8Di.png',
      './media/cards/9Di.png',
      './media/cards/10Di.png',
      './media/cards/ADi.png',
      './media/cards/JDi.png',
      './media/cards/KDi.png',
      './media/cards/QDi.png',
      './media/cards/2He.png',
      './media/cards/3He.png',
      './media/cards/4He.png',
      './media/cards/5He.png',
      './media/cards/6He.png',
      './media/cards/7He.png',
      './media/cards/8He.png',
      './media/cards/9He.png',
      './media/cards/10He.png',
      './media/cards/AHe.png',
      './media/cards/JHe.png',
      './media/cards/KHe.png',
      './media/cards/QHe.png',
      './media/cards/2Sp.png',
      './media/cards/3Sp.png',
      './media/cards/4Sp.png',
      './media/cards/5Sp.png',
      './media/cards/6Sp.png',
      './media/cards/7Sp.png',
      './media/cards/8Sp.png',
      './media/cards/9Sp.png',
      './media/cards/10Sp.png',
      './media/cards/ASp.png',
      './media/cards/JSp.png',
      './media/cards/KSp.png',
      './media/cards/QSp.png'];
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
    /* FOR DEBUGGING PURPOSES ONLY */
    // this.deckOfCards = [...this.deckOfCards,
    //   new Card('Sp', 'J', '/src/media/cards/JSp.png'),
    //   new Card('Cl', '5', '/src/media/cards/5Cl.png'),
    //   new Card('Di', 'A', '/src/media/cards/ADi.png'),
    //   new Card('He', '5', '/src/media/cards/5He.png'),
    // ];
  }

  restartDeck() {
    while (this.discardPile.length > 0) {
      this.deckOfCards.push(this.discardPile.pop());
    }
  }
}
