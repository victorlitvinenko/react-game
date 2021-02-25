import { makeAutoObservable, autorun } from 'mobx';

class SettingsStore {
  status = 'default';

  isSoundsOn = true;

  isMusicOn = true;

  soundsVolume = 1;

  musicVolume = 0.2;

  gridSize = 4;

  cubesCount = 6;

  boardColor = '#6291c9';

  constructor() {
    makeAutoObservable(this);
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

  changeStatus(status: string) {
    this.status = status;
  }

  changeColor(color: string) {
    this.boardColor = color;
  }
}

export default new SettingsStore();
