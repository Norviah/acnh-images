/**
 * Returns the given string with only the first letter capitalized.
 * @param  string The string to capitalize.
 * @return        The string with the first letter capitalized.
 */
function capitalize(string: string): string {
  return string.toLowerCase().replace(/(^\w)/g, (letter: string) => letter.toUpperCase());
}

/**
 * Returns the given camelCased string in proper case, with each word
 * capitalized and separated by a space.
 * @param  string The string, in camelCase, to change into proper case.
 * @return        The string in proper case.
 * @examples
 *
 *   proper('iconImage'); // => 'Icon Image'
 *   proper('someReallyLongName'); // => 'Some Really Long Name'
 */
export function proper(string: string): string {
  // Initialize an array containing the words from the given string.
  const matches: RegExpMatchArray = string.match(/[A-Z]?[a-z]+/g) as RegExpMatchArray;

  // Using a bit of regex magic, change the first letter of each word into a
  // capital letter, then, join the resulting array into a string.
  const name: string = matches.map((word: string) => capitalize(word)).join(' ');

  return name;
}
