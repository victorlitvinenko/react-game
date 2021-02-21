/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import { CubeType, Kinds } from '../stores/data/grid/cube';

import './cube.scss';

type Props = {
  value: CubeType;
  index: number;
};

const Cube: React.FC<Props> = ({ value, index }) => {
  const [rotation, setRotation] = useState(value.turns);

  useEffect(() => {
    value.changeTurns(rotation % 4);
  }, [rotation, value]);

  const onClick = () => {
    switch (value.kind) {
      case Kinds.Rotatable:
      case Kinds.DragRotatable:
        setRotation(rotation + 1);
        break;

      default:
        break;
    }
  };

  return (
    <Draggable
      draggableId={value.id.toString()}
      index={index}
      isDragDisabled={
        ![Kinds.DragRotatable, Kinds.Draggable].includes(value.kind)
      }
    >
      {(provided) => (
        <div
          className={cn('cube', `cube--${value.kind}`)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <div
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
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default observer(Cube);
