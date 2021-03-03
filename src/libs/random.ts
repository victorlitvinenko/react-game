export default (min: number, max: number, randomFn = Math.random): number => {
  return Math.floor(randomFn() * (max - min + 1)) + min;
};
