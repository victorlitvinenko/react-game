import React from 'react';

import Cube from './Cube';
import random from '../libs/random';

import './grid.scss';

interface IGridProps {
  matrixWidth?: number;
}

interface ICube {
  type: string;
  position: number;
}

const Grid: React.FC<IGridProps> = ({ matrixWidth = 4 }) => {
  const matrix = Array(matrixWidth * matrixWidth).fill(null);

  const allCubes: ICube[] = [];
  const cube = { type: 'default' };

  const getNextPosition = (prevPosition: number): number => {
    return prevPosition + 1;
  };

  const fillMatrix = (count: number) => {
    for (let i = 1; i <= count; i += 1) {
      const position =
        allCubes.length === 0
          ? random(0, matrixWidth * matrixWidth - 1)
          : getNextPosition(allCubes[allCubes.length - 1].position);
      matrix[position] = cube;
      allCubes.push({ ...cube, position });
    }
  };
  fillMatrix(3);

  return (
    <div className="grid">
      {matrix.map((cell) => (
        <div className="grid__cell">{cell ? <Cube rotationsCount={2} /> : <div />}</div>
      ))}
    </div>
  );
};

export default Grid;
