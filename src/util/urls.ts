import isUrl from 'is-url';

/**
 * Returns an array containing the keys from the object that are URLs.
 * @param  object The object to get the keys from.
 * @return        An array of keys that are URLs from the object.
 */
export function urls(object: obj): string[] {
  return Object.keys(object).filter((key: string) => isUrl(object[key]));
}
