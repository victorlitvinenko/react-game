import { makeAutoObservable } from 'mobx';

import getNextPosition from '../../../libs/get-next-position';
import random from '../../../libs/random';
import { CubeType, Kinds } from './cube';

class GridStore {
  grid: (CubeType | null)[] = [];

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
            return Kinds.Fixed;
          case 1:
            return Kinds.Draggable;
          case 2:
            return Kinds.Rotatable;
          case 3:
            return Kinds.DragRotatable;
          default:
            break;
        }
        return Kinds.Fixed;
      };

      this.grid[position] = new CubeType(getRandomType());
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

  moveCube(from: number, to: number) {
    this.grid[to] = this.grid[from];
    this.grid[from] = null;
  }
}

export default new GridStore();
