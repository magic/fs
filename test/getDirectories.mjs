import path from 'path'
// import URL from 'url'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

import { createTestDirs } from './.lib/createTestDirs.mjs'

const expectedDirsRecursive = [
  path.join(process.cwd(), '.__test__dirs_recursive'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2', 'deep'),
]

const expectedDirs = [
  path.join(process.cwd(), '.__test__dirs_norecurse'),
  path.join(process.cwd(), '.__test__dirs_norecurse', 'test'),
  path.join(process.cwd(), '.__test__dirs_norecurse', 'test2'),
]

export default [
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_recursive`),
    before: createTestDirs('dirs_recursive'),
    expect: expectedDirsRecursive,
    info: 'finds all directories in directory. recursively',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_norecurse`, false),
    before: createTestDirs('dirs_norecurse'),
    expect: expectedDirs,
    info: 'finds all directories in directory. without recursion',
  },
  {
    fn: async () => await fs.getDirectories('non_existing_path'),
    expect: is.array,
    info: 'returns empty array if given invalid path',
  },
  {
    fn: async () => await fs.getDirectories(['non_existing_path']),
    expect: is.length.equal(0),
    info: 'returns empty array if given invalid path',
  },
  {
    fn: tryCatch(fs.getDirectories, path.join(process.cwd(), 'package.json')),
    expect: t => t.name === 'Error' && t.code === 'ENOTDIR',
    info: 'returns ENOTDIR if given a file path',
  },
  {
    fn: tryCatch(fs.getDirectories, [0]),
    expect: is.error,
    info: 'returns error if given invalid path',
  },
  {
    fn: tryCatch(fs.getDirectories, 0),
    expect: is.error,
    info: 'returns error if given invalid path',
  },
  {
    fn: tryCatch(fs.getDirectories, 0),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'returns error E_ARG_TYPE if given invalid path',
  },
  {
    fn: tryCatch(fs.getDirectories, []),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'returns error E_ARG_EMPTY if given empty path array',
  },
  {
    fn: tryCatch(fs.getDirectories, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'returns error E_ARG_EMPTY if given empty path string',
  },
]
