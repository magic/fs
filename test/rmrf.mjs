import path from 'path'
import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

const test1Dir = `${dirName}test1`
const test2Dir = `${dirName}test2`
const test3Dir = `${dirName}test3`
const test4Dir = `${dirName}test4`

const before = async dir => {
  await fs.mkdirp(dir)
  const touchFile = path.join(dir, 'touched.js')
  await fs.writeFile(touchFile, 'true')

  // no need to return after function,
  // rmrf deletes the created directory.
}

export default [
  { fn: tryCatch(fs.rmrf), expect: is.error, info: 'rmrf errors without an argument' },
  {
    fn: tryCatch(fs.rmrf),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'rmrf without argument errors with E_ARG_EMPTY',
  },
  {
    fn: tryCatch(fs.rmrf, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'rmrf without argument errors with E_ARG_TYPE',
  },
  {
    fn: async () => {
      const root = test1Dir
      return await fs.rmrf(root)
    },
    before: before(test1Dir),
    expect: true,
    info: 'rmrf deeply deletes directory structures',
  },
  {
    fn: async () => {
      const root = `\\${dirName}test2`
      return await fs.rmrf(test2Dir)
    },
    before: before(test2Dir),
    expect: true,
    info: 'rmrf deeply deletes directory structures',
  },
  {
    fn: tryCatch(fs.rmrf, path.join(dirName, 'non', 'existent', 'dir')),
    expect: t => t.name === 'ENOENT',
    info: 'rmrf throws ENOENT if the directory/file does not exist',
  },
  {
    fn: tryCatch(fs.rmrf, path.join('/', 'non', 'existent', 'dir')),
    expect: t => t.name === 'E_OUTSIDE_CWD',
    info: 'rmrf returns ',
  },
  {
    fn: async () => await fs.rmrf('.__test__test3'),
    before: before(test3Dir),
    expect: true,
    info: 'rmrf deletes relative dirs relative to process.cwd()',
  },
  {
    fn: async () => {
      const root = test4Dir
      const removed = await fs.rmrf(root)
      const ex = await fs.exists(root)
      return !ex && removed
    },
    before: before(test4Dir),
    expect: true,
    info: 'rmrf deeply deletes directory structures and they do not exist afterwards',
  },
]
