import { makeAutoObservable, reaction } from 'mobx';

import { getNextPosition } from '../../../libs/utils';
import random from '../../../libs/random';
import { CubeType, Kinds, Sides } from './cube';
import SettingsStore from '../../settings/settings-store';
import StatisticsStore from '../../statistics/statistics-store';

class GridStore {
  SettingsStore = SettingsStore;

  StatisticsStore = StatisticsStore;

  grid: (CubeType | null)[] = [];

  startIndex = 0;

  constructor() {
    this.init();
    makeAutoObservable(this);
    reaction(
      () => this.hasWon,
      () => {
        StatisticsStore.addNewItem();
      }
    );
  }

  init() {
    this.startIndex += SettingsStore.gridSize ** 2;
    this.createNewMatrix();
    this.createConnections();
    this.shuffleCubes();
    StatisticsStore.reset();
  }

  get hasWon() {
    return this.grid.every((cube, index) => {
      if (!cube) return true;

      const leftBoundry = index - (index % SettingsStore.gridSize);
      const rightBoundry = leftBoundry + SettingsStore.gridSize - 1;
      if (
        cube.currentConnections[Sides.Top] &&
        cube.currentConnections[Sides.Top] !==
          this.grid[index - SettingsStore.gridSize]?.currentConnections[
            Sides.Bottom
          ]
      ) {
        return false;
      }
      if (
        cube.currentConnections[Sides.Bottom] &&
        cube.currentConnections[Sides.Bottom] !==
          this.grid[index + SettingsStore.gridSize]?.currentConnections[
            Sides.Top
          ]
      ) {
        return false;
      }
      if (cube.currentConnections[Sides.Right] && index === rightBoundry) {
        return false;
      }
      if (
        cube.currentConnections[Sides.Right] &&
        cube.currentConnections[Sides.Right] !==
          this.grid[index + 1]?.currentConnections[Sides.Left]
      ) {
        return false;
      }
      if (cube.currentConnections[Sides.Left] && index === leftBoundry) {
        return false;
      }
      if (
        cube.currentConnections[Sides.Left] &&
        cube.currentConnections[Sides.Left] !==
          this.grid[index - 1]?.currentConnections[Sides.Right]
      ) {
        return false;
      }
      return true;
    });
  }

  createNewMatrix() {
    this.grid = Array(SettingsStore.gridSize ** 2).fill(null);

    let currentPosition = null;
    const allPositions = [];
    for (let i = 1; i <= SettingsStore.cubesCount; i += 1) {
      const position: number =
        currentPosition !== null
          ? getNextPosition(
              allPositions,
              currentPosition,
              SettingsStore.gridSize
            )
          : random(0, SettingsStore.gridSize ** 2 - 1);

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
            throw new Error('Unknown kind of cube!');
        }
      };

      this.grid[position] = new CubeType(getRandomType());
      allPositions.push(position);
      currentPosition = position;
    }
  }

  private createConnections() {
    this.grid.forEach((cube, index) => {
      if (cube) {
        const leftBoundry = index - (index % SettingsStore.gridSize);
        const rightBoundry = leftBoundry + SettingsStore.gridSize - 1;
        if (
          !cube.connections[Sides.Top] &&
          this.grid[index - SettingsStore.gridSize]
        ) {
          const connectionsCount = random(1, 4);
          cube.changeConnections(Sides.Top, connectionsCount);
          this.grid[index - SettingsStore.gridSize]?.changeConnections(
            Sides.Bottom,
            connectionsCount
          );
        }
        if (
          !cube.connections[Sides.Right] &&
          index < rightBoundry &&
          this.grid[index + 1]
        ) {
          const connectionsCount = random(1, 4);
          cube.changeConnections(Sides.Right, connectionsCount);
          this.grid[index + 1]?.changeConnections(Sides.Left, connectionsCount);
        }
        if (
          !cube.connections[Sides.Bottom] &&
          this.grid[index + SettingsStore.gridSize]
        ) {
          const connectionsCount = random(1, 4);
          cube.changeConnections(Sides.Bottom, connectionsCount);
          this.grid[index + SettingsStore.gridSize]?.changeConnections(
            Sides.Top,
            connectionsCount
          );
        }
        if (
          !cube.connections[Sides.Left] &&
          index > leftBoundry &&
          this.grid[index - 1]
        ) {
          const connectionsCount = random(1, 4);
          cube.changeConnections(Sides.Right, connectionsCount);
          this.grid[index + 1]?.changeConnections(Sides.Left, connectionsCount);
        }
      }
    });
  }

  shuffleCubes() {
    this.grid.forEach((cube, index) => {
      if (cube && cube.kind !== Kinds.Fixed) {
        const randomPositions = this.grid.reduce(
          (acc: number[], el: CubeType | null, idx: number) => {
            if (!el) return [...acc, idx];
            return acc;
          },
          []
        );
        const newRandomPosition =
          randomPositions[random(0, randomPositions.length - 1)];
        const newRandomRotation = random(0, 3);

        switch (cube.kind) {
          case Kinds.Draggable:
            this.moveCube(index, newRandomPosition);
            break;
          case Kinds.DragRotatable:
            this.moveCube(index, newRandomPosition);
            cube.changeTurns(newRandomRotation);
            break;
          case Kinds.Rotatable:
            cube.changeTurns(newRandomRotation);
            break;
          default:
            break;
        }
      }
    });
  }

  moveCube(from: number, to: number) {
    this.grid[to] = this.grid[from];
    this.grid[from] = null;
  }
}

export default new GridStore();
