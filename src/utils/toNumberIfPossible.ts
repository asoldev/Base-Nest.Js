export const toNumberIfPossible = (value: string) => {
  const numberValue = Number(value);
  return isNaN(numberValue) ? value : numberValue;
};
