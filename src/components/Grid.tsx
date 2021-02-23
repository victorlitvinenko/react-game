/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import cn from 'classnames';
import useSound from 'use-sound';

import Cube from './Cube';
import RootStore from '../stores/root-store';
import moveSfx from '../sounds/step.mp3';
import successSfx from '../sounds/success.mp3';

import './grid.scss';

interface Props {
  matrixWidth?: number;
}

const Grid: React.FC<Props> = () => {
  const {
    DataStore: { GridStore },
    SettingsStore,
  } = RootStore;

  const [playMove] = useSound(moveSfx, { volume: SettingsStore.soundsVolume });
  const [playSuccess] = useSound(successSfx, {
    volume: SettingsStore.soundsVolume,
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
    GridStore.moveCube(+source.droppableId, +destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="square">
        <div
          className={cn('grid', { 'grid--disabled': GridStore.hasWon })}
          style={{
            gridTemplateRows: `repeat(${GridStore.size}, 1fr)`,
            gridTemplateColumns: `repeat(${GridStore.size}, 1fr)`,
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
