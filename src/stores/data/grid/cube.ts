export enum CubeTypes {
  Fixed = 'fixed',
  Rotatable = 'rotatable',
  Draggable = 'draggable',
  DragRotatable = 'dragrotatable',
}

export type Cube = {
  type: CubeTypes;
};
