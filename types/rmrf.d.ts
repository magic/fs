export function rmrf(
  dir: string,
  opts?: {
    dryRun?: boolean | undefined
  },
): Promise<boolean | undefined>
