import path from 'path'
import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

const url = new URL(import.meta.url)
const dirName = path.join(path.dirname(url.pathname), '.__test__')

const testDirRoot = path.join(dirName, 'rmrf')
const testDir = path.join(testDirRoot, 'deep', 'deeper')

const before = async () => {
  await fs.mkdirp(testDir)
  const touchFile = path.join(testDir, 'touched.js')
  await fs.writeFile(touchFile, 'true')

  return async () => {
    await fs.rmrf(dirName)
  }
}

export default [
  { fn: tryCatch(fs.rmrf), expect: is.error, info: 'rmrf expects an argument' },
  {
    fn: async () => {
      await fs.rmrf(testDirRoot)
      return await fs.exists(testDirRoot)
    },
    before,
    expect: false,
    info: 'rmrf deeply deletes directory structures',
  },
  {
    fn: async () => await fs.rmrf(path.join(dirName, 'non', 'existent', 'dir')),
    expect: undefined,
    info: 'rmrf returns undefined if the directory/file does not exist',
  },
]
