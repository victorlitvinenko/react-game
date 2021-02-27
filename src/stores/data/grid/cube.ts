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
const initialConnections = {
  [Sides.Top]: 0,
  [Sides.Right]: 0,
  [Sides.Bottom]: 0,
  [Sides.Left]: 0,
};

export class CubeType {
  id: number;

  scaling = 0;

  kind: Kinds;

  turns = 0;

  connections: ConnectionsType;

  constructor(kind: Kinds, turns = 0, connections = initialConnections) {
    this.id = runningId;
    runningId += 1;
    this.kind = kind;
    this.turns = turns;
    this.connections = connections;
    makeAutoObservable(this);
  }

  get currentConnections(): ConnectionsType {
    return {
      [(Sides.Top + this.turns) % 4]: this.connections[Sides.Top],
      [(Sides.Right + this.turns) % 4]: this.connections[Sides.Right],
      [(Sides.Bottom + this.turns) % 4]: this.connections[Sides.Bottom],
      [(Sides.Left + this.turns) % 4]: this.connections[Sides.Left],
    } as ConnectionsType;
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

  changeScaling(scaling: number): void {
    this.scaling = scaling;
  }
}
