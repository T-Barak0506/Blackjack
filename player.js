/* eslint-disable no-unused-vars */
class Player {
  constructor() {
    this.playerHand = [];
    this.splitHand = [];
    this.cardSpaceP1 = document.querySelector('#p1-space');
  }

  playerHit(theDeck) {
    this.playerHand.push(theDeck.pop());
    return this.playerHand;
  }


  playerSplit() {
    const cardToHide = document.querySelectorAll('#p1-space .card')[1]; // Fetches the 2nd card in the player's hand
    cardToHide.classList.toggle('inactive');


    const splitSpace = document.createElement('div'); // creates the space for the 2nd card to be used later
    splitSpace.classList.add('split-space');
    document.body.appendChild(splitSpace);

    this.splitHand.push(this.playerHand.pop()); // Moves the card object from the deck

    setTimeout(() => {
      splitSpace.appendChild(cardToHide); // Moves the 2nd card to the side
      cardToHide.style.display = 'none';
    }, 583);

    // splits the pair into their own hands by moving the last card in the player's hand to-
    // the side (the split hand) and updates the hand value. The specified card visual is also-
    // removed from its parent div (though not deleted)
    // .
    // All bets are placed
    // .
    // The player then starts with the card that was on the left side of-
    // the original pair
  }
}
