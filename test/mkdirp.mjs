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
    info: 'throws E_ARG_EMPTY error when no arguments provided',
  },
  {
    fn: tryCatch(fs.mkdirp, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when empty string provided',
  },
  {
    fn: tryCatch(fs.mkdirp, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'throws E_ARG_TYPE error when numeric argument provided instead of string',
  },
  {
    fn: tryCatch(fs.mkdirp, null),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when null argument provided',
  },
  {
    fn: tryCatch(fs.mkdirp, undefined),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when undefined argument provided',
  },
  {
    fn: tryCatch(fs.mkdirp, { test: true }),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'throws E_ARG_TYPE error when object argument provided instead of string',
  },
  {
    fn: tryCatch(fs.mkdirp, []),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_TYPE error when array argument provided instead of string',
  },
  {
    fn: async () => {
      await fs.mkdirp(tmpDir)
      return await fs.exists(tmpDir)
    },
    before,
    expect: true,
    info: 'creates deep directory structure successfully',
  },
  {
    fn: async () => await fs.mkdirp(process.cwd()),
    expect: true,
    info: 'returns true when directory already exists',
  },
  {
    fn: async () => {
      const testDir = path.join(process.cwd(), 'test_single_dir')
      await fs.rmrf(testDir)
      const result = await fs.mkdirp(testDir)
      const exists = await fs.exists(testDir)
      await fs.rmrf(testDir)
      return result && exists
    },
    expect: true,
    info: 'creates single level directory successfully',
  },
  {
    fn: async () => {
      const relativePath = './relative/deep/path'
      const absolutePath = path.resolve(relativePath)
      await fs.rmrf(absolutePath)
      const result = await fs.mkdirp(relativePath)
      const exists = await fs.exists(absolutePath)
      await fs.rmrf(path.resolve('./relative'))
      return result && exists
    },
    expect: true,
    info: 'handles relative paths correctly by resolving to absolute paths',
  },
]
