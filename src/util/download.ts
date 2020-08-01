import downloadUrl from 'download';
import { backOff } from 'exponential-backoff';
import { existsSync } from 'fs';
import ora from 'ora';
import { basename, dirname } from 'path';

import { convert } from './convert';
import { png } from './png';

/**
 * Represents the maximum amount of attempts to retry downloading an image when
 * an error occurs.
 */
const maxAttempts: number = 5;

/**
 * Options for the backoff system.
 */
const options = {
  timeMultiple: 1,
  numOfAttempts: maxAttempts,
  startingDelay: 3000,
};

/**
 * This function is called when an error occurs when trying to download an
 * image. If the given attempt number is the maximum allowed attempt, an error
 * is thrown and the program ends.
 * @param  error   The error that was thrown.
 * @param  attempt The attempt number that resulted in an error.
 * @param  spinner The Ora instance.
 * @return         Determines if the program should try to continue downloading.
 */
function handler(error: any, attempt: number, spinner: ora.Ora): boolean {
  spinner.fail('error\n');

  // Throw an error if the attempt amount is the maximum allowed .
  if (attempt === maxAttempts) {
    throw new Error(`An error occurred ${maxAttempts} times\n${error}`);
  }

  // Inform the user of the error and the next attempt number.
  console.warn(`An error occurred while downloading\n${error}\n\nRetrying attempt #${attempt + 1} in 3 seconds...\n`);

  return true;
}

/**
 * Downloads the given key from the item, as the given format. A backoff system
 * is used for downloading images, when trying to download an image and an error
 * occurs, the program tries to download that image again, up to the maximum
 * allowed amount of attempts. When that amount is met and an error still
 * occurs, an error is thrown.
 * @param  item    The item to download the image from.
 * @param  key     The image to download.
 * @param  format  The format representing how to download the image as.
 * @param  spinner The Ora instance.
 */
export async function download(item: obj, key: string, format: string, spinner: ora.Ora): Promise<void> {
  // We initialize a new URL instance for the link as some items have unescped
  // characters in their name, an example being the villager Renée. When
  // initializing a new URL, it escapes any special characters from the input.
  const link: string = new URL(item[key]).href;

  // Get the path for the item's location, replacing any special keys with the
  // values they represent, along with making sure it ends with '.png'.
  const path: string = png(convert(item, key, format));

  // Downloading every image takes a good amount of time, and usually, people
  // will call this program whenever a new update happens, so we check if the
  // path already exists. We check if the path doesn't exist before downloading
  // the image as we don't need to redownload an image that already exists.
  if (existsSync(path)) {
    return;
  }

  spinner.start(`downloading: [${item.sourceSheet}] ${item.name} as ${path}`);

  await backOff(() => downloadUrl(link, dirname(path), { filename: basename(path) }), {
    ...options,
    retry: (error: any, attempt: number) => handler(error, attempt, spinner),
  }).catch(() =>
    console.log(`Skipped attempting to download ${item.name} from ${link}, as an error occurred 5 times.`)
  );
}
