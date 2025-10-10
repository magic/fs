export function rmrf(dir: string, opts?: Options): Promise<boolean | undefined>
export type Options = {
  dryRun?: boolean | undefined
}
