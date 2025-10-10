export function getFilePath(
  fn: GetFiles | GetDirectories,
  dir: string,
  file: string,
  args?: GetFilesOptions,
): Promise<string | string[] | undefined>
export type GetFiles = typeof import('./getFiles.js').getFiles
export type GetFilesOptions = import('./getFiles.js').Options
export type GetDirectories = typeof import('./getDirectories.js').getDirectories
