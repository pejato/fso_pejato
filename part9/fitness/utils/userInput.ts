export const parseNumericArguments = (
  args: string[],
  minArgs: number = 2,
  maxArgs: number = Number.MAX_VALUE,
): number[] => {
  const userPassedArgCount = args.length - 2;
  if (userPassedArgCount < minArgs)
    throw new Error(`Not enough arguments, need at least ${minArgs}`);
  if (userPassedArgCount > maxArgs)
    throw new Error(`Too many arguments, can use at most ${maxArgs}`);

  const numericArguments: number[] = [];
  for (const arg of args.slice(2)) {
    if (isNaN(Number(arg))) {
      throw new Error(`Provided value was not a number. Got ${arg}`);
    }
    numericArguments.push(Number(arg));
  }
  return numericArguments;
};
