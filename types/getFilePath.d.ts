export function getFilePath(
  fn:
    | ((
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
      ) => Promise<string[]>)
    | ((
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
      ) => Promise<string[]>),
  dir: string,
  file: string,
  args?:
    | number
    | {
        minDepth?: number
        maxDepth?: number
        depth?: number | false
        extension?: string
        ext?: string
        root?: string
      },
): Promise<string | string[] | undefined>
