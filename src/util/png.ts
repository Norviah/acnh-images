/**
 * Returns the given path as .png, if it doesn't already end with .png.
 * @param  path The path to convert as a .png file.
 * @return      The the path as as .png file.
 */
export function png(path: string): string {
  return path.endsWith('.png') ? path : `${path}.png`;
}
