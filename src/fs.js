import fso, { constants } from 'node:fs'
import { access } from 'node:fs/promises'

export const fs = /** @type {const} */ ({
  ...fso,
  ...fso.promises,
  exists: async (/** @type {import('node:fs').PathLike} */ f) => {
    try {
      await access(f, constants.F_OK)
      return true
    } catch {
      return false
    }
  },
  readdir: fso.promises.readdir,
  readDir: fso.promises.readdir,
  readFile: fso.promises.readFile,
  readfile: fso.promises.readFile,
  rmdir: fso.promises.rmdir,
  rmDir: fso.promises.rmdir,
  watch: fso.watch,
  access,
  constants,
})
