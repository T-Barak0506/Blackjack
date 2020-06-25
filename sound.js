class Sound {
  constructor(src) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.setAttribute('preload', 'auto');
    this.sound.setAttribute('controls', 'none');
    this.sound.style.display = 'none';
    document.body.appendChild(this.sound);
  }

  playSound(removeAfter = false) {
    this.sound.play();

    if (removeAfter) {
      setTimeout(() => {
        // Removes the audio element after the sound is finished playing
        this.sound.remove();
      }, removeAfter + 50);
    }
  }

  stopSound() {
    this.sound.pause();
    this.sound.currentTime = 0;
  }
}
