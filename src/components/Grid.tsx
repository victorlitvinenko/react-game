import React from 'react';
import { observer } from 'mobx-react-lite';

import Cube from './Cube';
import RootStore from '../stores/root-store';

import './grid.scss';

interface PropsType {
  matrixWidth?: number;
}

const Grid: React.FC<PropsType> = () => {
  const {
    DataStore: { GridStore },
  } = RootStore;
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${GridStore.size}, 1fr)`,
        gridTemplateColumns: `repeat(${GridStore.size}, 1fr)`,
      }}
    >
      {GridStore.grid.map((cell, index) => (
        <div className="grid__cell" key={`${index * 2}`}>
          {cell && <Cube rotationsCount={2} />}
        </div>
      ))}
    </div>
  );
};

export default observer(Grid);
