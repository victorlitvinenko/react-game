/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import cn from 'classnames';
import useSound from 'use-sound';

import Cube from './Cube';
import RootStore from '../../stores/root-store';
import moveSfx from '../../sounds/step.mp3';
import successSfx from '../../sounds/success.mp3';
import StatisticsStore from '../../stores/statistics/statistics-store';

import './grid.scss';

interface Props {
  matrixWidth?: number;
}

const Grid: React.FC<Props> = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  const [playMove] = useSound(moveSfx, {
    volume: SettingsStore.isSoundsOn ? SettingsStore.soundsVolume : 0,
  });
  const [playSuccess] = useSound(successSfx, {
    volume: SettingsStore.isSoundsOn ? SettingsStore.soundsVolume : 0,
  });

  useEffect(() => {
    if (GridStore.hasWon) playSuccess();
  }, [GridStore.hasWon, playSuccess]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !source ||
      !destination ||
      source.droppableId === destination.droppableId
    )
      return;
    playMove();
    StatisticsStore.move();
    GridStore.moveCube(+source.droppableId, +destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="square">
        <div
          className={cn('grid', { 'grid--disabled': GridStore.hasWon })}
          style={{
            gridTemplateRows: `repeat(${SettingsStore.gridSize}, 1fr)`,
            gridTemplateColumns: `repeat(${SettingsStore.gridSize}, 1fr)`,
            background: SettingsStore.boardColor,
          }}
        >
          {GridStore.grid.map((cell, index) => (
            <Droppable
              droppableId={index.toString()}
              key={`${GridStore.startIndex + index}`}
              isDropDisabled={!!cell}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn('grid__cell', {
                    'grid__cell--dragging-over': snapshot.isDraggingOver,
                  })}
                >
                  {cell && <Cube value={cell} index={index} />}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default observer(Grid);
