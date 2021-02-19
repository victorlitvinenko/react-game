import random from './random';

const getNextPosition = (
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

export default getNextPosition;
