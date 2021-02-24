import { makeAutoObservable } from 'mobx';

class SettingsStore {
  isSoundsOn = true;

  isMusicOn = true;

  soundsVolume = 1;

  musicVolume = 0.2;

  constructor() {
    makeAutoObservable(this);
  }

  changeSoundsVolume(newVolume: number) {
    this.soundsVolume = newVolume;
  }

  changeMusicVolume(newVolume: number) {
    this.musicVolume = newVolume;
  }

  switchSounds(isOn: boolean) {
    this.isSoundsOn = isOn;
  }

  switchMusic(isOn: boolean) {
    this.isMusicOn = isOn;
  }
}

export default new SettingsStore();
