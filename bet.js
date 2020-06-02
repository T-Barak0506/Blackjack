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
    this.coinAmount.textContent = this.playerCoins.toString();
    this.remainingCoins.textContent = this.playerCoins.toString();
    this.wageredCoins.textContent = this.totalBet.toString();
  }
}
