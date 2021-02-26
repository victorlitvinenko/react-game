import { makeAutoObservable } from 'mobx';

import DataStore from './data/data-store';
import SettingsStore from './settings/settings-store';
import StatisticsStore from './statistics/statistics-store';

class RootStore {
  DataStore = DataStore;

  SettingsStore = SettingsStore;

  StatisticsStore = StatisticsStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RootStore();
