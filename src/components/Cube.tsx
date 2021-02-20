import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

import { Cube, CubeTypes } from '../stores/data/grid/cube';

import './cube.scss';

type Props = {
  value: Cube;
};

const CubeComponent: React.FC<Props> = ({ value }) => {
  const [rotation, setRotation] = useState(value.turns);

  useEffect(() => {
    value.changeTurns(rotation % 4);
  }, [rotation, value]);

  const onClick = () => {
    switch (value.type) {
      case CubeTypes.Rotatable:
      case CubeTypes.DragRotatable:
        setRotation(rotation + 1);
        break;

      default:
        break;
    }
  };

  return (
    <div className={cn('cube', `cube--${value.type}`)}>
      <button
        type="button"
        onClick={onClick}
        style={{
          transform: `rotate(${rotation * 90}deg)`,
        }}
      >
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
