export function mkdirp(
  p: import('node:fs').PathLike,
  opts?: import('node:fs').MakeDirectoryOptions,
): Promise<boolean>
