import { makeAutoObservable } from 'mobx';

export enum Sides {
  Top = 0,
  Right = 1,
  Bottom = 2,
  Left = 3,
}

export enum Kinds {
  Fixed = 'fixed',
  Rotatable = 'rotatable',
  Draggable = 'draggable',
  DragRotatable = 'dragrotatable',
}

export type ConnectionsType = {
  [Sides.Top]: number;
  [Sides.Right]: number;
  [Sides.Bottom]: number;
  [Sides.Left]: number;
};

let runningId = 0;

export class CubeType {
  id: number;

  kind: Kinds;

  turns = 0;

  connections: ConnectionsType;

  constructor(kind: Kinds) {
    this.id = runningId;
    runningId += 1;
    this.kind = kind;
    this.connections = {
      [Sides.Top]: 0,
      [Sides.Right]: 0,
      [Sides.Bottom]: 0,
      [Sides.Left]: 0,
    };
    // this.turns = random(0, 3);
    makeAutoObservable(this);
  }

  changeConnections(key: Sides, value: number): void {
    this.connections = { ...this.connections, [key]: value };
  }

  changeTurns(count: number): void {
    this.turns = count;
  }

  changeType(kind: Kinds): void {
    this.kind = kind;
  }
}
