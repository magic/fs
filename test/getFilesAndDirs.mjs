import path from 'path'
// import URL from 'url'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

import { getFilePath } from '../src/getDirectories.mjs'

const dirName = path.join(process.cwd(), '.__test__')

const before = id => async () => {
  const dir = `${dirName}${id}`

  const files = [
    path.join(dir, 'test', 'deep', 'test.js'),
    path.join(dir, 'test2', 'deep', 'test2.js'),
    path.join(dir, 'test.js'),
  ]

  await fs.mkdirp(path.join(dir, 'test', 'deep'))
  await fs.mkdirp(path.join(dir, 'test2', 'deep'))

  await Promise.all(files.map(async f => await fs.writeFile(f, 't')))

  return async () => {
    await fs.rmrf(dir)
  }
}

export default [
  {
    fn: async () => await fs.getFiles(`${dirName}1`),
    before: before(1),
    expect: is.length.equal(3),
    info: 'finds all files in directory. recursively.',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}2`),
    before: before(2),
    expect: is.length.equal(5),
    info: 'finds all directories in directory. recursively',
  },
  {
    fn: async () => await fs.getDirectories([`${dirName}3`]),
    before: before(3),
    expect: is.length.equal(5),
    info: 'finds all directories in directory. recursively',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}1`, false),
    before: before(4),
    expect: is.length.equal(1),
    info: 'finds all files in directory. recursively.',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}2`, false),
    before: before(5),
    expect: is.length.equal(3),
    info: 'finds all directories in directory. recursively',
  },
  {
    fn: async () => await fs.getDirectories([`${dirName}3`], false),
    before: before(6),
    expect: is.length.equal(3),
    info: 'finds all directories in directory. recursively',
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
  {
    fn: tryCatch(getFilePath),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'getFilePath without arguments errors',
  },
  {
    fn: tryCatch(getFilePath, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'getFilePath with empty first arg errors',
  },
  {
    fn: tryCatch(getFilePath, 2),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'getFilePath with wrong first arg errors',
  },
  {
    fn: tryCatch(getFilePath, 't'),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'getFilePath with empty second arg errors',
  },
  {
    fn: tryCatch(getFilePath, 't', 2),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'getFilePath with wrong second arg errors',
  },
]
