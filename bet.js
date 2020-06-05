/* eslint-disable no-unused-vars */
class Currency {
  constructor() {
    // Raw coin data
    this.playerCoins = 2500;
    this.totalBet = 0;

    // CSS visual equivalents
    this.coinAmount = document.querySelector('.coin-amount'); // Amount shown at top of screen
    this.remainingCoins = document.querySelector('.remaining-coins'); // Remaining amount shown during bets
    this.wageredCoins = document.querySelector('.bet-number'); // Total bet amount shown at bottom
  }

  updateCoinCount() {
    this.coinAmount.textContent = this.playerCoins;
    this.remainingCoins.textContent = this.playerCoins;
    this.wageredCoins.textContent = this.totalBet;
  }

  insertMax() {
    const betAmount = document.querySelector('#bet-amount');
    betAmount.value = this.playerCoins;
  }
}
