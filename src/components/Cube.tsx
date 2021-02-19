import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import './cube.scss';

type PropsType = {
  rotationsCount: number;
};

const Cube: React.FC<PropsType> = ({ rotationsCount }) => {
  const [rotation, setRotation] = useState(rotationsCount);

  return (
    <div className="cube">
      <button
        type="button"
        onClick={() => setRotation(rotation + 1)}
        style={{
          transform: `rotate(${rotation * 90}deg)`,
        }}
      >
        <h4>{rotation % 4}</h4>
        <div className="cube__icon">
          <div />
          <div />
          <div />
        </div>
      </button>
    </div>
  );
};

export default observer(Cube);
