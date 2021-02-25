/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import useSound from 'use-sound';

import { CubeType, Sides, Kinds } from '../../stores/data/grid/cube';
import random from '../../libs/random';
import RootStore from '../../stores/root-store';
import rotateSfx from '../../sounds/rotate.mp3';

import './cube.scss';

type ConnectionProps = {
  type: string;
  count: number;
};

const getStyle = (
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) =>
  !snapshot.isDropAnimating
    ? style
    : {
        ...style,
        transitionDuration: `0.05s`,
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
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;
  const [rotation, setRotation] = useState(value.turns);
  const [scale, setScale] = useState(value.scaling);
  const [playRotate] = useSound(rotateSfx, {
    volume: SettingsStore.isSoundsOn ? SettingsStore.soundsVolume : 0,
  });

  useEffect(() => {
    value.changeTurns(rotation % 4);
  }, [rotation, value]);

  useEffect(() => {
    setTimeout(() => {
      setScale(1);
      value.changeScaling(1);
    }, random(100, 300));
  }, [value]);

  const onClick = () => {
    if (GridStore.hasWon) return;
    switch (value.kind) {
      case Kinds.Rotatable:
      case Kinds.DragRotatable:
        playRotate();
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
        ![Kinds.DragRotatable, Kinds.Draggable].includes(value.kind) ||
        GridStore.hasWon
      }
    >
      {(provided, snapshot) => (
        <div
          className={cn('cube', `cube--${value.kind}`)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style, snapshot)}
          ref={provided.innerRef}
          onClick={onClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        >
          <div
            style={{
              transform: `rotate(${rotation * 90}deg) scale(${scale})`,
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
