import random from './random';

export default (allPositions: number[], prevPosition: number, matrixWidth: number): number => {
  const leftBoundry = prevPosition - (prevPosition % matrixWidth);
  const rightBoundry = leftBoundry + matrixWidth - 1;

  const availablePositions = [
    prevPosition - 1,
    prevPosition + 1,
    prevPosition - matrixWidth,
    prevPosition + matrixWidth,
  ]
    .filter((pos) => !allPositions.includes(pos))
    .filter((pos) => pos >= 0 && pos < matrixWidth ** 2)
    .filter(
      (pos) =>
        (pos >= leftBoundry && pos <= rightBoundry) ||
        pos === prevPosition - matrixWidth ||
        pos === prevPosition + matrixWidth
    );

  const newPosition = availablePositions[random(0, availablePositions.length - 1)];
  return newPosition;
};
