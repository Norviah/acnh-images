import { omit } from './omit';

/**
 * When an item has variations, the item has an array containing information
 * about each variation. The base object has information that is static from
 * each variation and doesn't change, so an object is initialized, which holds
 * information about the base and each variation.
 * @param  item The item to get variations from.
 * @return      An array containing the information of the base item and
 *              variation, for each variation.
 */
export function variants(item: obj): obj[] {
  // Get the base information of the item, which the information of the item
  // that is static and doesn't change for each variation.
  const base: obj = omit(item, ['variations']);

  const variations: obj[] = [];

  // For every iteration, append an object combining it and the base.
  for (const variation of item.variations) {
    variations.push({ ...base, ...variation });
  }

  return variations;
}
