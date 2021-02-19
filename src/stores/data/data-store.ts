import { makeAutoObservable } from 'mobx';

import GridStore from './grid/grid-store';

class DataStore {
  GridStore = GridStore;

  constructor() {
    makeAutoObservable(this);
  }
}

export default new DataStore();
