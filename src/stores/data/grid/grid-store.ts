import { makeAutoObservable } from 'mobx';

import random from '../../../libs/random';
import getNextPosition from '../../../libs/get-next-position';
import { Cube, CubeTypes } from './cube';

const defaultCube: Cube = { type: CubeTypes.Fixed };

class GridStore {
  grid: (Cube | null)[] = [];

  size = 4;

  constructor() {
    this.createNewMatrix(this.size, 6);
    makeAutoObservable(this);
  }

  createNewMatrix(gridWidth = 4, cubesCount: number) {
    this.grid = Array(this.size ** 2).fill(null);

    let lastPosition = null;
    const allPositions = [];
    for (let i = 1; i <= cubesCount; i += 1) {
      const position: number =
        lastPosition !== null ? getNextPosition(allPositions, lastPosition, this.size) : random(0, gridWidth ** 2 - 1);

      this.grid[position] = defaultCube;
      allPositions.push(position);
      lastPosition = position;
    }
    // const allCubesPositions = this.matrix.reduce((acc: number[], el: CubeType | null, idx: number) => {
    //   if (el) return [...acc, idx];
    //   return acc;
    // }, []);
  }
}

export default new GridStore();
