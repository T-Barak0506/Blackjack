/* eslint-disable no-plusplus */
class Deck {
  constructor() {
    this.deckOfCards = [];
    this.discardPile = [];
    this.suits = ['Cl', 'Di', 'He', 'Sp']; // Clubs, Diamonds, Hearts, Spades
    this.values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'K', 'Q'];
    this.cardVisuals = [
      '/media/Playing Cards/cards/2Cl.png',
      '/media/Playing Cards/cards/3Cl.png',
      '/media/Playing Cards/cards/4Cl.png',
      '/media/Playing Cards/cards/5Cl.png',
      '/media/Playing Cards/cards/6Cl.png',
      '/media/Playing Cards/cards/7Cl.png',
      '/media/Playing Cards/cards/8Cl.png',
      '/media/Playing Cards/cards/9Cl.png',
      '/media/Playing Cards/cards/10Cl.png',
      '/media/Playing Cards/cards/ACl.png',
      '/media/Playing Cards/cards/JCl.png',
      '/media/Playing Cards/cards/KCl.png',
      '/media/Playing Cards/cards/QCl.png',
      '/media/Playing Cards/cards/2Di.png',
      '/media/Playing Cards/cards/3Di.png',
      '/media/Playing Cards/cards/4Di.png',
      '/media/Playing Cards/cards/5Di.png',
      '/media/Playing Cards/cards/6Di.png',
      '/media/Playing Cards/cards/7Di.png',
      '/media/Playing Cards/cards/8Di.png',
      '/media/Playing Cards/cards/9Di.png',
      '/media/Playing Cards/cards/10Di.png',
      '/media/Playing Cards/cards/ADi.png',
      '/media/Playing Cards/cards/JDi.png',
      '/media/Playing Cards/cards/KDi.png',
      '/media/Playing Cards/cards/QDi.png',
      '/media/Playing Cards/cards/2He.png',
      '/media/Playing Cards/cards/3He.png',
      '/media/Playing Cards/cards/4He.png',
      '/media/Playing Cards/cards/5He.png',
      '/media/Playing Cards/cards/6He.png',
      '/media/Playing Cards/cards/7He.png',
      '/media/Playing Cards/cards/8He.png',
      '/media/Playing Cards/cards/9He.png',
      '/media/Playing Cards/cards/10He.png',
      '/media/Playing Cards/cards/AHe.png',
      '/media/Playing Cards/cards/JHe.png',
      '/media/Playing Cards/cards/KHe.png',
      '/media/Playing Cards/cards/QHe.png',
      '/media/Playing Cards/cards/2Sp.png',
      '/media/Playing Cards/cards/3Sp.png',
      '/media/Playing Cards/cards/4Sp.png',
      '/media/Playing Cards/cards/5Sp.png',
      '/media/Playing Cards/cards/6Sp.png',
      '/media/Playing Cards/cards/7Sp.png',
      '/media/Playing Cards/cards/8Sp.png',
      '/media/Playing Cards/cards/9Sp.png',
      '/media/Playing Cards/cards/10Sp.png',
      '/media/Playing Cards/cards/ASp.png',
      '/media/Playing Cards/cards/JSp.png',
      '/media/Playing Cards/cards/KSp.png',
      '/media/Playing Cards/cards/QSp.png'];
  }

  createDeck() {
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

    return this.deckOfCards;
  }
}
