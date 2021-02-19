import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { Cube } from '../stores/data/grid/cube';

import './cube.scss';

type Props = {
  value: Cube;
};

const CubeComponent: React.FC<Props> = ({ value }) => {
  const [rotation, setRotation] = useState(value.turns);

  useEffect(() => {
    value.changeTurns(rotation % 4);
  }, [rotation, value]);

  return (
    <div className="cube">
      <button
        type="button"
        onClick={() => setRotation(rotation + 1)}
        style={{
          transform: `rotate(${rotation * 90}deg)`,
        }}
      >
        <h1>{value.id}</h1>
        <div className="cube__icon">
          <div />
          <div />
          <div />
          <div />
        </div>
      </button>
    </div>
  );
};

export default observer(CubeComponent);
