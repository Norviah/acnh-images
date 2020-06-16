import * as database from 'animal-crossing';
import ora from 'ora';

import { download } from './util/download';
import { urls } from './util/urls';
import { variants } from './util/variants';

/**
 * The main entry point for the program.
 * @param  format The format representing how to download the image as.
 */
export async function main(format: string): Promise<void> {
  // Initialize an array containing every item from the database, as every entry
  // is an array, we'll have an array that's two levels deep. So we use the flat
  // method to ensure that every item is on the first level.
  const items: obj[] = Object.values(database).flat();

  // We initialize a new array to reference every item, as in the database, some
  // items has the property variations, which is an array containing objects
  // about each variation of the item. The problem being that the info we want,
  // the URLs of the images, are in these objects, rather than the item itself.
  const container: obj[] = [];

  for (const item of items) {
    // If the item has any variations, we'll initialize an array referencing
    // each variation of the item along with the base information of the item.
    if (Array.isArray(item.variations)) {
      for (const variation of variants(item)) container.push(variation);
    }

    // If the item doesn't have any variations, then it represents that the
    // info we want is on the item itself, so we can push the item.
    else container.push(item);
  }

  const spinner: ora.Ora = ora();

  for (const item of container) {
    // Get a list of keys from the item that are URLs.
    const keys: string[] = urls(item);

    // Save each image as the given format.
    for (const key of keys) {
      await download(item, key, format, spinner);
    }
  }

  // 🎉
  spinner.succeed('done');
}
