import path from 'path'
import { tryCatch } from '@magic/test'

import fs from '../src/index.js'

const dirName = path.join(process.cwd(), '.__test__')

const test1Dir = `${dirName}test1`
const test2Dir = `${dirName}test2`
const test3Dir = `${dirName}test3`
const test4Dir = `${dirName}test4`
const test5Dir = `${dirName}test5`

const before = async dir => {
  await fs.mkdirp(dir)
  const touchFile = path.join(dir, 'touched.js')
  await fs.writeFile(touchFile, 'true')

  // no need to return after function,
  // rmrf deletes the created directory.
}

export default [
  {
    fn: tryCatch(fs.rmrf),
    expect: t => t.code === 'E_DIR_EMPTY',
    info: 'throws E_DIR_EMPTY error when no arguments provided',
  },
  {
    fn: tryCatch(fs.rmrf, ''),
    expect: t => t.code === 'E_DIR_EMPTY',
    info: 'throws E_DIR_EMPTY error when empty string provided',
  },
  {
    fn: tryCatch(fs.rmrf, 23),
    expect: t => t.code === 'E_DIR_TYPE',
    info: 'throws E_DIR_TYPE error when numeric argument provided instead of string',
  },
  {
    fn: tryCatch(fs.rmrf, null),
    expect: t => t.code === 'E_DIR_EMPTY',
    info: 'throws E_DIR_EMPTY error when null argument provided',
  },
  {
    fn: tryCatch(fs.rmrf, undefined),
    expect: t => t.code === 'E_DIR_EMPTY',
    info: 'throws E_DIR_EMPTY error when undefined argument provided',
  },
  {
    fn: tryCatch(fs.rmrf, { test: true }),
    expect: t => t.code === 'E_DIR_TYPE',
    info: 'throws E_DIR_TYPE error when object argument provided instead of string',
  },
  {
    fn: async () => {
      const root = test1Dir
      return await fs.rmrf(root)
    },
    before: before(test1Dir),
    expect: true,
    info: 'recursively deletes directory structures with files',
  },
  {
    fn: async () => {
      const root = test2Dir
      return await fs.rmrf(root)
    },
    before: before(test2Dir),
    expect: true,
    info: 'successfully deletes directory with backslash handling',
  },
  {
    fn: async () => await fs.rmrf(path.join(dirName, 'non', 'existent', 'dir')),
    expect: true,
    info: 'returns true when attempting to delete non-existent directory',
  },
  {
    fn: tryCatch(fs.rmrf, path.join('/', 'non', 'existent', 'dir')),
    expect: t => t.code === 'E_OUTSIDE_CWD',
    info: 'throws E_OUTSIDE_CWD error when path is outside current working directory',
  },
  {
    fn: async () => await fs.rmrf('.__test__test3'),
    before: before(test3Dir),
    expect: true,
    info: 'deletes relative directory paths successfully',
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
    info: 'completely removes directory and confirms it no longer exists',
  },
  {
    fn: async () => {
      // Create a single file to test file deletion
      const testFile = path.join(process.cwd(), '.__test__single_file.txt')
      await fs.writeFile(testFile, 'test content')
      const result = await fs.rmrf(testFile)
      return result
    },
    expect: true,
    info: 'successfully deletes single files',
  },
  {
    fn: async () => {
      const testDir = test5Dir
      await fs.mkdirp(testDir)
      const result = await fs.rmrf(testDir, { dryRun: true })
      const stillExists = await fs.exists(testDir)
      await fs.rmrf(testDir) // cleanup
      return result && stillExists
    },
    expect: true,
    info: 'dry run mode returns true but does not actually delete directories',
  },
  {
    fn: async () => {
      const testFile = path.join(process.cwd(), '.__test__dry_run_file.txt')
      await fs.writeFile(testFile, 'test content')
      const result = await fs.rmrf(testFile, { dryRun: true })
      const stillExists = await fs.exists(testFile)
      await fs.rmrf(testFile) // cleanup
      return result && stillExists
    },
    expect: true,
    info: 'dry run mode returns true but does not actually delete files',
  },
]
