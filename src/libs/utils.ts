import moment from 'moment';

import random from './random';

export const formatDuration = (ms: number): string => {
  const days = Math.floor(ms / 8.64e7);
  const msOnLastDay = ms - days * 8.64e7;
  return `${days < 10 ? `0${days}` : days}:${moment
    .utc(msOnLastDay)
    .format('HH:mm:ss')}`;
};

export const getNextPosition = (
  allPositions: number[],
  currentPosition: number,
  matrixWidth: number
): number => {
  const leftBoundry = currentPosition - (currentPosition % matrixWidth);
  const rightBoundry = leftBoundry + matrixWidth - 1;

  const availablePositions = [
    currentPosition - 1,
    currentPosition + 1,
    currentPosition - matrixWidth,
    currentPosition + matrixWidth,
  ]
    .filter((pos) => !allPositions.includes(pos))
    .filter((pos) => pos >= 0 && pos < matrixWidth ** 2)
    .filter(
      (pos) =>
        (pos >= leftBoundry && pos <= rightBoundry) ||
        pos === currentPosition - matrixWidth ||
        pos === currentPosition + matrixWidth
    );

  const newPosition =
    availablePositions.length === 0
      ? getNextPosition(
          allPositions,
          allPositions[random(0, allPositions.length - 1)],
          matrixWidth
        )
      : availablePositions[random(0, availablePositions.length - 1)];
  return newPosition;
};
