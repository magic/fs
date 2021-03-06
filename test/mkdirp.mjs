import { tryCatch, is } from '@magic/test'

import path from 'path'

import fs from '../src/index.mjs'

const tmpRootDir = path.join(process.cwd(), 'deep')
const tmpDir = path.join(tmpRootDir, 'dir', 'structure')

const before = () => {
  return async () => {
    await fs.rmrf(tmpRootDir)
  }
}

export default [
  {
    fn: tryCatch(fs.mkdirp),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'no arguments errors with E_ARG_EMPTY',
  },
  {
    fn: tryCatch(fs.mkdirp, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'empty argument errors with E_ARG_EMPTY',
  },
  {
    fn: tryCatch(fs.mkdirp, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'invalid argument type errors with E_ARG_TYPE',
  },
  {
    fn: async () => {
      await fs.mkdirp(tmpDir)
      return await fs.exists(tmpDir)
    },
    before,
    expect: true,
    info: 'fs.mkdirp can create deep directories',
  },
  {
    fn: async () => await fs.mkdirp(process.cwd()),
    expect: true,
    info: 'fs.mkdirp returns true if directory exists',
  },
]
