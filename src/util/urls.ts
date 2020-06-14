import isURL from 'is-url';

/**
 * Returns an array of keys from the object that are URLs.
 * @param  object The object to get the keys from.
 * @return        An array of keys that are URLs from the object.
 */
export function urls(object: any): string[] {
  return Object.keys(object).filter((key: string) => isURL(object[key]));
}
