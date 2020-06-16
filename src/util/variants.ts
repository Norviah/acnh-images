import { omit } from './omit';

/**
 * When an item has variations, the item has the property 'variations'. which is
 * an array of objects containing information of each variation. The keys of the
 * item, minus 'variations', represents the base information of the item, which
 * is static and doesn't change for each variation. So an object is initialized
 * that holds the information of the base item and variation, for each variation
 * and is returned in an array.
 * @param  item The item to get variations from.
 * @return      An array containing the information of the base item and
 *              variation, for each variation.
 */
export function variants(item: obj): obj[] {
  // Get the base information of the item, which is the information of the item
  // that is static and doesn't change for each variation.
  const base: obj = omit(item, ['variations']);

  const variations: obj[] = [];

  // For each variation, append an object combining it and the base information.
  for (const variation of item.variations) {
    variations.push({ ...base, ...variation });
  }

  return variations;
}
