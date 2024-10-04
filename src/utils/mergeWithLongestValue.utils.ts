export const mergeWithLongestValue = <T extends Record<string, any>>(
  data: Array<T>,
  tests?: Array<(value: any) => boolean>
): Record<string, any> => {
  return data.reduce((acc: Record<string, any>, current: T) => {
    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const accValue = acc[key];

      // Allow null or undefined values to be merged if no other value exists
      if (
        accValue === undefined ||
        accValue === null ||
        isLongerValidValue(currentValue, accValue, tests)
      ) {
        acc[key] = currentValue;
      }
    });

    return acc;
  }, {});
};

/**
 * Determines if the current value is a valid candidate for merging based on length,
 * the special test functions, and if it's a boolean value.
 *
 * @param {*} currentValue - The current value being assessed.
 * @param {*} accValue - The accumulated value for the key.
 * @param {Array<Function>} tests - An array of functions to test special conditions for rejecting values.
 * @returns {boolean} - True if the current value should be accepted; otherwise, false.
 */
const isLongerValidValue = (
  currentValue: any,
  accValue: any,
  tests: Array<Function> = []
): boolean => {
  let shouldReject = false;
  if (tests.length > 0) shouldReject = tests.some((test) => test(currentValue));

  // Accept longer strings or arrays if they are valid
  return (
    ((typeof currentValue === "string" || Array.isArray(currentValue)) &&
      (!accValue ||
        (currentValue.length > accValue.length && !shouldReject))) ||
    (!accValue && shouldReject)
  );
};
