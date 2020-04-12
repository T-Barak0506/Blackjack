class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.style.display = 'none';
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    document.body.appendChild(this.sound);
  }

  playSound() {
    this.sound.play();
  }

  stopSound() {
    this.sound.pause();
  }
}
