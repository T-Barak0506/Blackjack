/* eslint-disable no-unused-vars */
class Currency {
  constructor() {
    // Raw coin data
    this.playerCoins = 2500;
    this.totalBet = 0;
    this.insureBet = 0;

    // CSS visual equivalents
    this.coinAmount = document.querySelector('.coin-amount'); // Amount shown at top of screen
    this.remainingCoins = document.querySelector('.remaining-coins'); // Remaining amount shown during bets
    this.wageredCoins = document.querySelector('.bet-number'); // Total bet amount shown at bottom
  }

  updateCoinCount() {
    // Regex used to insert commas in between appropriate digits
    this.coinAmount.textContent = this.playerCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.remainingCoins.textContent = this.playerCoins.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    this.wageredCoins.textContent = this.totalBet.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  insertMax() {
    const betAmount = document.querySelector('#bet-amount');
    betAmount.value = this.playerCoins;
  }

  storeCoins() {
    // Saves the total coins in local storage (if the total is greater than 2500)
    const storedCoins = (this.playerCoins > 2500) ? this.playerCoins : 2500;
    localStorage.setItem('playerCoins', storedCoins.toString());
  }

  getStoredCoins() {
    const storedCoins = (localStorage.getItem('playerCoins') !== null) ? localStorage.getItem('playerCoins') : 2500;
    this.playerCoins = parseInt(storedCoins, 10);
  }
}
