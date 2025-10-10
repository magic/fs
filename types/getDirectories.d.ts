export function getDirectories(
  dir: string | string[],
  options?: number | false | Options,
): Promise<string[]>
export type Options = {
  root?: string | undefined
  maxDepth?: number | undefined
  minDepth?: number | undefined
  depth?: number | boolean | undefined
  noRoot?: boolean | undefined
}
