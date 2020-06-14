import * as database from 'animal-crossing';
import ora from 'ora';

import { download } from './util/download';
import { variants } from './util/variants';

/**
 * The main entry point for this program.
 * @param  dir   Represents the directory to save images to.
 */
export async function main(dir: string): Promise<void> {
  // Initialize an array containing all values from the database, when joining
  // each value, as all values are an array, it will result in an array that's
  // 2 levels. So we use the flat method so every item is on the first level.
  const items: obj[] = Object.values(database).flat();

  // We initialize a new array to reference every item, as in the database, some
  // items maay have variations, which is a property that's an array containing
  // objects about each variation of an item. The problem being that the info we
  // want, aka the URLs, are in these objects, rather than item itself.
  const container: obj[] = [];

  for (const item of items) {
    // if the item has any variations, we initialize an array referencing each
    // variation of the item along with the information of the base item.
    if (Array.isArray(item.variations)) {
      for (const variation of variants(item)) container.push(variation);
    }

    // If the item doesn't have any variations, then the information we want is
    // on the item itself, so we can push it to the container.
    else container.push(item);
  }

  const spinner: ora.Ora = ora();

  // Iterate through each item and download any possible images.
  for (const item of container) await download(dir, item, spinner);

  // 🎉
  spinner.succeed('done');
}
