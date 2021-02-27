import moment from 'moment';
import { makeAutoObservable, autorun } from 'mobx';

type ItemType = {
  date: Date;
  moves: number;
  time: number;
};

class StatisticsStore {
  items: ItemType[];

  movesCount = 0;

  beginTime = moment();

  constructor() {
    makeAutoObservable(this);
    const statisticsStorage = localStorage.getItem('statistics');
    this.items = statisticsStorage ? JSON.parse(statisticsStorage) : [];
    autorun(() => {
      if (this.items.length > 10) {
        this.removeLastItem();
      }
      localStorage.setItem('statistics', JSON.stringify(this.items));
    });
  }

  reset() {
    this.movesCount = 0;
    this.beginTime = moment();
  }

  addNewItem() {
    if (this.movesCount === 0) return;
    const newItem = {
      date: moment().toDate(),
      moves: this.movesCount,
      time: moment().diff(this.beginTime),
    };
    this.items.unshift(newItem);
    this.reset();
  }

  removeLastItem() {
    this.items.pop();
  }

  move() {
    this.movesCount += 1;
  }
}

export default new StatisticsStore();
