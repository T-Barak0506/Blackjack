/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
class Menu {
  constructor() {
    // Title menu
    this.mainMenu = undefined;
    this.start = undefined;
    this.credits = undefined;

    // Table theme menu
    this.tableMenu = undefined;
    this.classicTheme = undefined;
    this.rubyTheme = undefined;
    this.aquaTheme = undefined;
    this.charcoalTheme = undefined;

    // Command menu (hit, stand, etc.)
    this.cmdMenu = document.querySelector('.button-container');
    this.hitButton = document.getElementById('hit');
    this.standButton = document.getElementById('stand');
    this.doubleButton = document.getElementById('double');
    this.splitButton = document.getElementById('split');

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
    btn.style.backgroundColor = 'gray';
  }

  toggleDisplay(item) {
    item.classList.toggle('hidden');
  }
}
