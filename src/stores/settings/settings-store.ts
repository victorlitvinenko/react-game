import { makeAutoObservable, autorun } from 'mobx';

class SettingsStore {
  isSoundsOn = true;

  isMusicOn = true;

  soundsVolume = 1;

  musicVolume = 0.2;

  gridSize = 4;

  cubesCount = 6;

  boardColor = '#6291c9';

  constructor() {
    makeAutoObservable(this);
    const settingsStorage = localStorage.getItem('settings');
    if (settingsStorage) {
      const settings = JSON.parse(settingsStorage);
      this.isSoundsOn = settings.isSoundsOn;
      this.isMusicOn = settings.isMusicOn;
      this.soundsVolume = settings.soundsVolume;
      this.musicVolume = settings.musicVolume;
      this.gridSize = settings.gridSize;
      this.cubesCount = settings.cubesCount;
      this.boardColor = settings.boardColor;
    }
    autorun(() => {
      if (this.gridSize > 6) {
        this.changeGridSize(6);
      }
      if (this.gridSize < 3) {
        this.changeGridSize(3);
      }
      if (this.cubesCount < 2) {
        this.changeCubesCount(2);
      }
      if (this.cubesCount > this.gridSize ** 2 - 1) {
        this.changeCubesCount(this.gridSize ** 2 - 1);
      }
      autorun(() => {
        localStorage.setItem(
          'settings',
          JSON.stringify({
            isSoundsOn: this.isSoundsOn,
            isMusicOn: this.isMusicOn,
            soundsVolume: this.soundsVolume,
            musicVolume: this.musicVolume,
            gridSize: this.gridSize,
            cubesCount: this.cubesCount,
            boardColor: this.boardColor,
          })
        );
      });
    });
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

  changeGridSize(size: number) {
    this.gridSize = size;
  }

  changeCubesCount(count: number) {
    this.cubesCount = count;
  }

  changeColor(color: string) {
    this.boardColor = color;
  }
}

export default new SettingsStore();
