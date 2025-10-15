export function getFiles(
  dir: string,
  options?:
    | number
    | {
        minDepth?: number
        maxDepth?: number
        depth?: number | false
        extension?: string
        ext?: string
        root?: string
      },
): Promise<string[]>
