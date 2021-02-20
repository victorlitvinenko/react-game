import { makeAutoObservable } from 'mobx';

import getNextPosition from '../../../libs/get-next-position';
import random from '../../../libs/random';
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

      const getRandomType = () => {
        const randomType = random(0, 3);
        switch (randomType) {
          case 0:
            return CubeTypes.Fixed;
          case 1:
            return CubeTypes.Draggable;
          case 2:
            return CubeTypes.Rotatable;
          case 3:
            return CubeTypes.DragRotatable;
          default:
            break;
        }
        return CubeTypes.Fixed;
      };

      this.grid[position] = new Cube(position, getRandomType());
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
