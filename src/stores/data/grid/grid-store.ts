import { makeAutoObservable } from 'mobx';

import random from '../../../libs/random';
import getNextPosition from '../../../libs/get-next-position';
import { Cube, CubeTypes } from './cube';

class GridStore {
  grid: (Cube | null)[] = [];

  size = 4;

  cubesCount = 6;

  constructor() {
    this.createNewMatrix(this.size, this.cubesCount);
    makeAutoObservable(this);
  }

  createNewMatrix(gridSize = this.size, cubesCount = this.cubesCount) {
    this.grid = Array(this.size ** 2).fill(null);

    let currentPosition = null;
    const allPositions = [];
    for (let i = 1; i <= cubesCount; i += 1) {
      const position: number =
        currentPosition !== null
          ? getNextPosition(allPositions, currentPosition, this.size)
          : random(0, gridSize ** 2 - 1);

      this.grid[position] = new Cube(position, CubeTypes.Fixed);
      allPositions.push(position);
      currentPosition = position;
    }
    // const allCubesPositions = this.grid.reduce(
    //   (acc: number[], el: Cube | null, idx: number) => {
    //     if (el) return [...acc, idx];
    //     return acc;
    //   },
    //   []
    // );
  }
}

export default new GridStore();
