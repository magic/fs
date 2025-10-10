export function getFiles(dir: string, options?: number | Options): Promise<string[]>
export type Options = {
  minDepth?: number | undefined
  maxDepth?: number | undefined
  depth?: number | false | undefined
  extension?: string | undefined
  ext?: string | undefined
  root?: string | undefined
}
