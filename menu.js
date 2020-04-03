/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
class Menu {
  constructor() {
    this.hitButton = document.getElementById('hitMe');
    this.standButton = document.getElementById('stand');
    this.doubleButton = undefined;
    this.splitButton = undefined;
    this.nextRoundButton = undefined;
  }

  disableBtn(btn) {
    // Disables a button and also grays it out
    btn.disabled = true;
    btn.style.backgroundColor = 'gray';
  }
}
