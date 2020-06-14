/**
 * Returns a new object containing the values from the given object minus the
 * keys represented from the given array.
 * @param  object The object to omit keys from.
 * @param  remove The keys to omit.
 * @return        An object representing the given object with the keys omitted.
 */
export function omit(object: obj, remove: string[]): obj {
  const result: obj = {};

  // Initialize a new array referencing the keys of the given object, with the
  // given keys removed, to only reference the values to copy.
  const keys: string[] = Object.keys(object).filter((key: string) => !remove.includes(key));

  for (const key of keys) {
    result[key] = object[key];
  }

  return result;
}
