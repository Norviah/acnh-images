import { join } from 'path';
import ora from 'ora';

import { proper } from './proper';
import { request } from './request';
import { urls } from './urls';

/**
 * Downloads images from the given item.
 * @param dir     The base directory to save images to.
 * @param item    The item to download images from.
 * @param spinner The Ora instance.
 */
export async function download(dir: string, item: obj, spinner: ora.Ora): Promise<void> {
  // Get a list of keys from the item that are URLs.
  const keys: string[] = urls(item);

  // Represents the root directory that images from the item will be saved to,
  // all images are saved into a sub-directory that represents the spreadsheet
  // that the item had originated from.
  const root: string = join(dir, item.sourceSheet);

  for (const key of keys) {
    spinner.start(`downloading: [${item.sourceSheet}] ${item.name}`);

    // Determine the sub-directory that images from the item will be saved to,
    // as some items have variations, we must save variations to separate
    // directories to prevent overriding other variations. If the item has no
    // variations, it's saved into a sub-directory representing the item's name.
    const sub: string = item.variation ? join(item.name, item.variation.toString()) : item.name;

    // Download the image into the directory. We initialize a new URL instance
    // for the URL as some items have unescaped characters in their name, an
    // example being the villager Renée. When initializing a new URL, it
    // automatically escapes any special characters from the input.
    await request(new URL(item[key]).href, join(root, sub), `${proper(key)}.png`, spinner);
  }
}
