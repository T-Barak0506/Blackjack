/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
class Menu {
  constructor() {
    // bet menu
    this.betContainer = document.querySelector('.bet-container');
    this.betValueInput = document.querySelector('#bet-amount');
    this.start = document.querySelector('#deal-button');

    // Table theme menu
    this.currentThemeId = 0;
    this.themeName = document.querySelector('.theme-name');
    this.classicTheme = document.querySelector('#choice1');
    this.rubyTheme = document.querySelector('#choice2');
    this.aquaTheme = document.querySelector('#choice3');
    this.charcoalTheme = document.querySelector('#choice4');

    // Table space
    this.tableMain = document.querySelector('#container');
    this.p1Border = document.querySelector('#p1-space');
    this.cpuBorder = document.querySelector('#cpu-space');
    this.tableBackground = document.querySelector('body');

    // Command menu (hit, stand, etc.)
    this.cmdMenu = document.querySelector('.button-container');
    this.hitButton = document.querySelector('#hit');
    this.standButton = document.querySelector('#stand');
    this.doubleButton = document.querySelector('#double');
    this.splitButton = document.querySelector('#split');
    this.doubleContainer = document.querySelector('#double-container');
    this.splitContainer = document.querySelector('#split-container');

    // Insurance menu
    this.insuranceMenu = document.querySelector('.insurance-container');
    this.insureYes = document.querySelector('#yes');
    this.insureNo = document.querySelector('#no');

    // Result screen overlay
    this.resultOverlay = document.querySelector('.result-overlay-container');
    this.resTopText = document.querySelector('#top-text');
    this.resBottomText = document.querySelector('#bottom-text');

    // Misc.
    this.ContinueButton = undefined;
  }

  disableBtn(btn) {
    // Disables and grays out a button
    btn.disabled = true;

    if (btn !== this.start) {
      btn.style.backgroundColor = 'gray';
    }
  }

  enableBtn(btn) {
    btn.disabled = false;


    if (btn === this.hitButton || btn === this.insureYes) {
      btn.style.backgroundColor = '#00ce00';
    } if (btn === this.standButton || btn === this.insureNo) {
      btn.style.backgroundColor = '#ff2400';
    } if (btn === this.doubleButton) {
      btn.style.backgroundColor = '#ff9100';
    } else if (btn === this.splitButton) {
      btn.style.backgroundColor = '#0000cd';
    }
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

  shuffleNotice() {
    const elementNode = document.querySelector('.loader-text');
    const nodeContainer = document.querySelector('.loader-container');

    elementNode.textContent = 'Shuffling Deck';
    nodeContainer.style.display = 'flex';

    let i = 0;

    const interval = setInterval(() => {
      if (i <= 2) {
        i += 1;
        elementNode.textContent += '.';
      } else {
        clearInterval(interval);
        nodeContainer.style.display = 'none';
      }
    }, 650);
  }

  toggleResultScreen() {
    this.resultOverlay.classList.toggle('hidden');
  }
}
