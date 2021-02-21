/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import cn from 'classnames';

import Cube from './Cube';
import RootStore from '../stores/root-store';

import './grid.scss';

interface Props {
  matrixWidth?: number;
}

const Grid: React.FC<Props> = () => {
  const {
    DataStore: { GridStore },
  } = RootStore;

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (
      !source ||
      !destination ||
      source.droppableId === destination.droppableId
    )
      return;
    GridStore.moveCube(+source.droppableId, +destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
            key={`${index * 2}`}
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
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default observer(Grid);
