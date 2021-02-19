import { makeAutoObservable } from 'mobx';

import DataStore from './data/data-store';

class RootStore {
  DataStore = DataStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new RootStore();
