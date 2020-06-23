import { proper } from './proper';

/**
 * This container will hold references to special terms and the list of keys
 * keys from the item to replace the term as. If the value is a tuple, the first
 * element represents the key to return from the item, or, if that key doesn't
 * exist, use the second element as a key, and if that doesn't exist, return an
 * empty string.
 *
 * If the value is 'filename', it represents the image's filename.
 *
 * If the value is 'undefined', it's special as it represents to use the matched
 * phrase as the item's key. The regex for this matches any phrase in double
 * brackets, and uses that phrase as a key to get from the item. If the key
 * doesn't exist, then an empty string is returned.
 */
const values: Map<RegExp, 'filename' | [string, string | undefined] | undefined> = new Map();

// %s: represents the item's source sheet,
// %n: represents the item's name,
// %v: represents the item's variation,
// %id: represents the item's internal ID,
// %id: represents the item's unique entry ID, and
// %f: represents the file name of the image.

values.set(/%s/g, ['sourceSheet', undefined]);
values.set(/%n/g, ['name', undefined]);
values.set(/%v/g, ['variation', undefined]);
values.set(/%id/g, ['internalId', 'filename']);
values.set(/%uid/g, ['uniqueEntryId', undefined]);
values.set(/%f/g, 'filename');

// [[key]]: this regex is unique as it's up to the user of what to return. 'key'
// is used as an access property and returns whatever the key is from the item,
// if the key doesn't exist in the item, an empty string is returned.

values.set(/\[\[(\w+?)\]\]/g, undefined);

/**
 * Replaces the special keys in the format with the appropriate values.
 * @param  item   The item.
 * @param  key    The filename of the image.
 * @param  format The format to base off of.
 * @return        The given format replaced with the special values.
 */
export function convert(item: obj, key: string, format: string): string {
  for (const [regex, keys] of values) {
    // Get all possible matches for the current regular expression.
    const matches: RegExpMatchArray | null = format.match(regex);

    // If the regular expression has no matches, simply skip to the next regex.
    if (!matches) continue;

    // If the value for the regular expression is an array, we know that the
    // array represents the keys to get from the item.
    if (Array.isArray(keys)) {
      // Map each key into the value it represents from the item.
      const values = keys.map((key) => item[key ?? '']);

      // Next, replace all instances of the matched term with the value
      // it represents. If the first key doesn't exist, fall back to the second
      // key, and if the second key doesn't exist, we'll use an empty string.
      format = format.replace(regex, values[0] ?? values[1] ?? '');
    }

    // If the keys is simply 'filename', we'll replace all instanced of
    // the matched term with the image's full proper name.
    else if (keys === 'filename') {
      format = format.replace(regex, proper(key));
    }

    // Last is the special case, for any phrase in double brackets, we'll use
    // that phrase as an access property and return the property the phrase
    // represents on the item.
    else {
      for (const match of matches) {
        // Each key is surrounded by double brackets, so we'll use the same
        // regular expression and groups to get the specific key.
        const key: string = match.replace(regex, '$1');

        // If the key actually exists on the item, we'll grab it's value,
        // otherwise, we'll use an empty string.
        const value: any = item.hasOwnProperty(key) ? item[key] : '';

        // Replace all instances of the term with the value.
        format = format.replace(match, value);
      }
    }
  }

  return format;
}
