import { makeAutoObservable } from 'mobx';

import DataStore from './data/data-store';
import SettingsStore from './settings/settings-store';

class RootStore {
  DataStore = DataStore;

  SettingsStore = SettingsStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RootStore();
