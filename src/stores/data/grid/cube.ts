import { makeAutoObservable } from 'mobx';

export enum CubeTypes {
  Fixed = 'fixed',
  Rotatable = 'rotatable',
  Draggable = 'draggable',
  DragRotatable = 'dragrotatable',
}

export type ConnectionsTypes = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

let runningId = 0;

export class Cube {
  id: number;

  winPosition: number;

  type: CubeTypes;

  turns = 0;

  connections: ConnectionsTypes;

  constructor(winPosition: number, type: CubeTypes) {
    this.id = runningId;
    runningId += 1;
    this.winPosition = winPosition;
    this.type = type;
    this.connections = { left: 0, top: 0, right: 0, bottom: 0 };
    // this.turns = random(0, 3);
    makeAutoObservable(this);
  }

  changeConnections(key: string, value: number): void {
    this.connections = { ...this.connections, [key]: value };
  }

  changeTurns(count: number): void {
    this.turns = count;
  }

  changeType(newType: CubeTypes): void {
    this.type = newType;
  }

  changePosition(position: number): void {
    this.winPosition = position;
  }
}
