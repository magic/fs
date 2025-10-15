export function getDirectories(
  dir: string | string[],
  options?:
    | number
    | false
    | {
        root?: string
        maxDepth?: number
        minDepth?: number
        depth?: boolean | number
        noRoot?: boolean
      },
): Promise<string[]>
