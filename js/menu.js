/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
class Menu {
  constructor() {
    // bet menu
    this.betContainer = document.querySelector('.bet-container');
    this.betValueInput = document.querySelector('#bet-amount');
    this.start = document.querySelector('#deal-button');

    // Table theme menu
    this.currentThemeId = 0;
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
    this.resTapNotice = document.querySelector('#tap-notice');

    // Misc.
    this.betNotice = document.querySelector('.bet-notice');
    this.totalBetMenu = document.querySelector('.total-bet-container');
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
    }

    if (btn === this.standButton || btn === this.insureNo) {
      btn.style.backgroundColor = '#ff2400';
    }

    if (btn === this.doubleButton) {
      btn.style.backgroundColor = '#ff9100';
    }

    if (btn === this.splitButton) {
      btn.style.backgroundColor = '#0000cd';
    }
  }

  toggleDisplay(item, duration = 1900) {
    // returns true if the first parameter equals one of the items below
    const specialItem = !!((item === this.resultOverlay || item === this.betNotice));

    // if the item is not the result overlay or bet reminder
    if (!item.classList.contains('hidden') && !specialItem) {
      // hides the item
      item.classList.add('hidden');

      setTimeout(() => {
        item.style.display = 'none';
      }, 500);
      return;
    }

    if (item.classList.contains('hidden') && !specialItem) {
      // Displays the item
      item.style.display = 'block';
      item.classList.remove('hidden');
      return;
    }

    // if the item is the bet reminder
    if (specialItem && item === this.betNotice) {
      // Displays the item, then automatically hides it after a set amount of time.
      item.style.display = 'block';

      setTimeout(() => {
        item.classList.remove('hidden');
      }, 100);

      setTimeout(() => {
        item.classList.add('hidden');
      }, duration);

      setTimeout(() => {
        this.betNotice.textContent = '';
        this.betNotice.style.display = 'none';
      }, duration + 500);

      return;
    }

    // If the selected item is the result overlay
    item.classList.toggle('hidden');
  }

  toggleBetMenu() {
    const mainContainer = document.querySelector('#container');
    const betContainer = document.querySelector('.bet-container');

    // If the bet form is already on-screen
    if (this.betContainer.classList.contains('blur')) {
      this.tableMain.classList.toggle('blur');
      this.betContainer.classList.toggle('blur');

      setTimeout(() => {
        this.betContainer.style.display = 'none';
      }, 500);
      return;
    }

    // If the bet form is not on-screen
    this.betContainer.style.display = 'block';
    setTimeout(() => {
      this.tableMain.classList.toggle('blur');
      this.betContainer.classList.toggle('blur');
    }, 100);
  }

  toggleTotalBetMenu() {
    const item = document.querySelector('.total-bet-container');
    item.classList.toggle('hidden2');
  }

  toggleThemes() {
    if (this.currentThemeId === 0) {
      this.tableMain.style.setProperty('--table', 'radial-gradient( #004b00, #003000)');
      this.tableBackground.style.setProperty('--tableBG', '#003000');
      this.p1Border.style.setProperty('--table-border', '2px rgba(0, 119, 0, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(0, 119, 0, 0.277) solid');
      return;
    }

    if (this.currentThemeId === 1) {
      this.tableMain.style.setProperty('--table', 'radial-gradient( #750202, #5d0000)');
      this.tableBackground.style.setProperty('--tableBG', '#5d0000');
      this.p1Border.style.setProperty('--table-border', '2px rgba(192, 0, 0, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(192, 0, 0, 0.277) solid');
      return;
    }

    if (this.currentThemeId === 2) {
      this.tableMain.style.setProperty('--table', 'radial-gradient(#006772, #005d68)');
      this.tableBackground.style.setProperty('--tableBG', '#005d68');
      this.p1Border.style.setProperty('--table-border', '2px rgba(14,230,255, 0.277) solid');
      this.cpuBorder.style.setProperty('--table-border', '2px rgba(14,230,255, 0.277) solid');
      return;
    }

    // If the theme ID equals 3
    this.tableMain.style.setProperty('--table', 'radial-gradient(#252525, #000000)');
    this.tableBackground.style.setProperty('--tableBG', '#000000');
    this.p1Border.style.setProperty('--table-border', '2px rgba(103, 103, 103, 0.277) solid');
    this.cpuBorder.style.setProperty('--table-border', '2px rgba(103, 103, 103, 0.277) solid');
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
    }, 1050);

    setTimeout(() => {
      document.querySelector('#container').scrollTop = 0;
    }, 3900);

    setTimeout(() => {
      this.toggleBetMenu();
    }, 4000);
  }

  storeThemeId() {
    localStorage.setItem('themeId', this.currentThemeId.toString());
  }

  getStoredTheme() {
    const storedTheme = (localStorage.getItem('themeId') !== null) ? localStorage.getItem('themeId') : 1;
    this.currentThemeId = parseInt(storedTheme, 10);
  }
}
