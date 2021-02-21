/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { Draggable } from 'react-beautiful-dnd';

import { CubeType, Sides, Kinds } from '../stores/data/grid/cube';

import './cube.scss';

type ConnectionProps = {
  type: string;
  count: number;
};

const Connection: React.FC<ConnectionProps> = ({ type, count }) => {
  return (
    <div className={cn('cube__icon', `cube__icon--${type}`)}>
      {[...Array(count).keys()].map((index) => (
        <div key={index} />
      ))}
    </div>
  );
};

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
    console.log(value);

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
            <Connection type="right" count={value.connections?.[Sides.Right]} />
            <Connection type="left" count={value.connections?.[Sides.Left]} />
            <Connection type="top" count={value.connections?.[Sides.Top]} />
            <Connection
              type="bottom"
              count={value.connections?.[Sides.Bottom]}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default observer(Cube);
