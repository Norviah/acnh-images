/**
 * Returns a new object containing the values of the given object minus the
 * properties represented from the array.
 * @param  object The object to omit properties from.
 * @param  remove The properties to omit.
 * @return        A copy of the given object with the properties omitted.
 */
export function omit(object: obj, remove: string[]): obj {
  const result: obj = {};

  // Initialize a new array referencing the keys of the given object, with the
  // given properties removed, to only reference the values to copy.
  const keys: string[] = Object.keys(object).filter((key: string) => !remove.includes(key));

  for (const key of keys) {
    result[key] = object[key];
  }

  return result;
}
