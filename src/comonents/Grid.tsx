import React from 'react';

import Cube from './Cube';
import random from '../libs/random';

import './grid.scss';

const Grid: React.FC = () => {
  const matrix = Array(4 * 4).fill(null);
  matrix[random(0, 15)] = 1;
  matrix[random(0, 15)] = 1;
  matrix[random(0, 15)] = 1;

  // const randomFill = (count: number) => {
  //   const result = [];
  //   for (let i = 1; i <= count; i += 1) {

  //   }
  // };

  return (
    <div className="grid">
      {matrix.flat().map((cell) => (
        <div className="grid__cell">{cell ? <Cube rotate={2} /> : <div />}</div>
      ))}
    </div>
  );
};

export default Grid;
