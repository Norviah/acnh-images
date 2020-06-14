import download from 'download';
import ora from 'ora';
import { backOff } from 'exponential-backoff';

/**
 * Represents the maximum amount of attempts to retry downloading an image when
 * an error occurs.
 */
const maxAttempts: number = 5;

/**
 * This function is called when an error occurs when trying to download an
 * image, if the given attempt number is the maximum allowed attempt, an error
 * is thrown and the program exists.
 * @param  error   The error that was thrown.
 * @param  attempt The number of the attempt that resulted in an error.
 * @param  spinner The Ora instance.
 * @return         Determines if the program should continue.
 */
function handler(error: any, attempt: number, spinner: ora.Ora): boolean {
  spinner.fail('error\n');

  // Throw an error if the number of attempts reaches the maximum allowed.
  if (attempt === maxAttempts) {
    throw new Error(`An error occurred ${maxAttempts} times\n${error}`);
  }

  // Inform the user of the error and the next attempt number.
  console.warn(`An error occurred while downloading\n${error}\n\nRetrying attempt #${attempt + 1} in 3 seconds...\n`);

  return true;
}

/**
 * Implements a backoff system for downloading images. When trying to download
 * an image and an error occurs, the program tries to download that image again,
 * up to the maximum allowed amount of attempts. Once that number is met, and an
 * error still occurs, an error is thrown.
 * @param  url     The URL of the image to download.
 * @param  dir     Represents the directory to save the image to.
 * @param  name    The name of the file to save the image to.
 * @param  spinner The Ora instance.
 */
export async function request(url: string, dir: string, name: string, spinner: ora.Ora): Promise<void> {
  await backOff(() => download(url, dir, { filename: name }), {
    timeMultiple: 1,
    numOfAttempts: maxAttempts,
    startingDelay: 3000,
    retry: (error: any, attempt: number) => handler(error, attempt, spinner),
  });
}
