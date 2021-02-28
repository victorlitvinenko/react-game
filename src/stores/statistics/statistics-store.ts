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

  beginTime = moment().toDate();

  constructor() {
    makeAutoObservable(this);
    const statisticsStorage = localStorage.getItem('statistics');
    this.items = statisticsStorage ? JSON.parse(statisticsStorage).items : [];
    this.movesCount = statisticsStorage
      ? JSON.parse(statisticsStorage).movesCount
      : 0;
    this.beginTime = statisticsStorage
      ? JSON.parse(statisticsStorage).beginTime
      : moment().toDate();
    autorun(() => {
      if (this.items.length > 10) {
        this.removeLastItem();
      }
      localStorage.setItem(
        'statistics',
        JSON.stringify({
          items: this.items,
          movesCount: this.movesCount,
          beginTime: this.beginTime,
        })
      );
    });
  }

  reset() {
    this.movesCount = 0;
    this.beginTime = moment().toDate();
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
