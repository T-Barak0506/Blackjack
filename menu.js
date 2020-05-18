/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
class Menu {
  constructor() {
    // bet menu
    this.betValueInput = document.querySelector('#bet-amount');
    this.start = document.querySelector('#deal-button');

    // coin amount placeholders
    this.coinAmount = document.querySelector('.coin-amount');
    this.remainingCoins = document.querySelector('.remaining-coins');
    this.wageredCoins = document.querySelector('.bet-number');


    // Table theme menu
    this.currentThemeId = 0;
    this.themeName = document.querySelector('.theme-name');
    this.classicTheme = document.querySelector('#choice1');
    this.rubyTheme = document.querySelector('#choice2');
    this.aquaTheme = document.querySelector('#choice3');
    this.charcoalTheme = document.querySelector('#choice4');

    // Table
    this.tableMain = document.querySelector('#container');
    this.p1Border = document.querySelector('#p1-space');
    this.cpuBorder = document.querySelector('#cpu-space');
    this.tableBackground = document.querySelector('body');

    // Command menu (hit, stand, etc.)
    this.cmdMenu = document.querySelector('.button-container');
    this.hitButton = document.getElementById('hit');
    this.standButton = document.getElementById('stand');
    this.doubleButton = document.getElementById('double-container');
    this.splitButton = document.getElementById('split-container');

    // Insurance menu
    this.insuranceMenu = undefined;
    this.insureYes = undefined;
    this.insureNo = undefined;

    // Misc.
    this.nextRoundButton = undefined;
  }

  disableBtn(btn) {
    // Disables and grays out a button
    btn.disabled = true;
    // btn.style.backgroundColor = 'gray';
  }

  enableBtn(btn) {
    btn.disabled = false;

    // if (btn === this.doubleButton) {
    //   btn.style.backgroundColor = '#ff9100';
    // } else if (btn === this.hitButton) {
    //   btn.style.backgroundColor = '#00ce00';
    // } else if (btn === this.standButton) {
    //   btn.style.backgroundColor = '#ff2400';
    // } else if (btn === this.splitButton) {
    //   btn.style.backgroundColor = '#0000cd';
    // }
  }

  toggleDisplay(item) {
    item.classList.toggle('hidden');
  }

  toggleBetMenu() {
    const mainContainer = document.querySelector('#container');
    const betContainer = document.querySelector('.bet-container');

    mainContainer.classList.toggle('blur');
    betContainer.classList.toggle('blur');
  }

  toggleTotalBetMenu() {
    const item = document.querySelector('.total-bet-container');
    item.classList.toggle('hidden2');
  }

  toggleThemes() {
    if (this.currentThemeId === 0) {
      // ..
      this.tableMain.style.setProperty('--table', 'radial-gradient( #004b00, #003000)');
      this.tableBackground.style.setProperty('--tableBG', '#003000');
      this.p1Border.style.setProperty('--table-border', '2px rgba(0, 119, 0, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(0, 119, 0, 0.277) solid');
      // ...
    } else if (this.currentThemeId === 1) {
      // ...
      this.tableMain.style.setProperty('--table', 'radial-gradient( #750202, #5d0000)');
      this.tableBackground.style.setProperty('--tableBG', '#5d0000');
      this.p1Border.style.setProperty('--table-border', '2px rgba(192, 0, 0, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(192, 0, 0, 0.277) solid');

      // ...
    } else if (this.currentThemeId === 2) {
      // ...
      this.tableMain.style.setProperty('--table', 'radial-gradient(#007e8e, #005d68)');
      this.tableBackground.style.setProperty('--tableBG', '#005d68');
      this.p1Border.style.setProperty('--table-border', '2px rgba(14,230,255, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(14,230,255, 0.277) solid');
      // ...
    } else if (this.currentThemeId === 3) {
      // ...
      this.tableMain.style.setProperty('--table', 'radial-gradient(#252525, #000000)');
      this.tableBackground.style.setProperty('--tableBG', '#000000');
      this.p1Border.style.setProperty('--table-border', '2px rgba(103, 103, 103, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(103, 103, 103, 0.277) solid');
      // ...
    }
  }
}

// else if ((!Number.isFinite(betValue.value))
//           || (isNaN(betValue.value) === true)) {
//       // If the value entered isn't a legitimate number
//       alert('You need to input an ACTUAL numerical value. Don\'t try to break the system.');
//       betValue.value = '';
//       // ...
//     } else if (betValue.value <= 0 || !Number.isInteger(betValue.value)) {
//       // If the value entered is a decimal or less than 1
//       betValue.value = '';
//       alert('Needs to be a whole number greater than 0 yeah?');
//       // ...
//     } else if (betValue.value > playerCoins) {
//       // If the user tries to bet an amount that's higher than the total coins they have
//       alert(`You only have ${playerCoins} coins. Don't lie to me yankee.`);
//       // ...
//     }


// else if (/* str <= 0 || */ Number.isInteger(str) === false) {
//   // If the value entered is a decimal or less than 1
//   console.log(parseInt(str, 10));
//   console.log(Number.isInteger(str));
//   str = '';
//   alert('Needs to be a whole number greater than 0 yeah?');
//   // ...
// }
