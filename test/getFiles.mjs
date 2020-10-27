import path from 'path'
// import URL from 'url'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

import { createTestDirs } from './.lib/createTestDirs.mjs'

const expectedFiles = [path.join(process.cwd(), '.__test__files_norecurse', 'test.js')]

const expectedFilesRecursive = [
  path.join(process.cwd(), '.__test__files_recursive', 'test', 'deep', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive', 'test2', 'deep', 'deeper', 'deep.js'),
  path.join(process.cwd(), '.__test__files_recursive', 'test2', 'deep', 'test2.js'),
]

export default [
  {
    fn: async () => await fs.getFiles(`${dirName}files_recursive`),
    before: createTestDirs('files_recursive'),
    expect: expectedFilesRecursive,
    info: 'finds all files in directory. recursively.',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}files_norecurse`, false),
    before: createTestDirs('files_norecurse'),
    expect: expectedFiles,
    info: 'finds all files in directory. without recursion.',
  },
  {
    fn: async () => await fs.getFiles('non_existing_path'),
    expect: is.array,
    info: 'returns empty array if given invalid path',
  },
  {
    fn: tryCatch(fs.getFiles),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws with E_ARG_EMPTY if argument is missing',
  },
  {
    fn: tryCatch(fs.getFiles, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws with E_ARG_EMPTY if argument is empty',
  },
  {
    fn: tryCatch(fs.getFiles, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'throws with E_ARG_TYPE if argument is wrong type',
  },
]
