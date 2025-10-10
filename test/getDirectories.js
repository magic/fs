import path from 'path'
// import URL from 'url'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.js'

const dirName = path.join(process.cwd(), '.__test__')

import { createTestDirs } from './.lib/createTestDirs.js'

const expectedDirsRecursive = [
  path.join(process.cwd(), '.__test__dirs_recursive'),
  path.join(process.cwd(), '.__test__dirs_recursive', '[testing]'),
  path.join(process.cwd(), '.__test__dirs_recursive', '[testing_threedot_deep]'),
  path.join(process.cwd(), '.__test__dirs_recursive', '[testing_threedot_deep]/[...testing]'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2', 'deep', 'deeper'),
  path.join(process.cwd(), '.__test__dirs_recursive', 'test2', 'deep', 'deeper', 'evendeeper'),
]

const expectedDirs = [
  path.join(process.cwd(), '.__test__dirs_norecurse'),
  path.join(process.cwd(), '.__test__dirs_norecurse', '[testing]'),
  path.join(process.cwd(), '.__test__dirs_norecurse', '[testing_threedot_deep]'),
  path.join(process.cwd(), '.__test__dirs_norecurse', 'test'),
  path.join(process.cwd(), '.__test__dirs_norecurse', 'test2'),
]

const expectedDirsDepth1 = [
  path.join(process.cwd(), '.__test__dirs_recursive_depth'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth', '[testing]'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth', '[testing_threedot_deep]'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth', 'test'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth', 'test2'),
]

const expectedDirsDepth2 = [
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', '[testing]'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', '[testing_threedot_deep]'),
  path.join(
    process.cwd(),
    '.__test__dirs_recursive_depth_2',
    '[testing_threedot_deep]/[...testing]',
  ),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', 'test'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', 'test', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', 'test2'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_2', 'test2', 'deep'),
]

const expectedDirsDepth3 = [
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', '[testing]'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', '[testing_threedot_deep]'),
  path.join(
    process.cwd(),
    '.__test__dirs_recursive_depth_3',
    '[testing_threedot_deep]/[...testing]',
  ),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test2'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test2', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test2', 'deep', 'deeper'),
]

const expectedDirsDepthMax3Min2 = [
  path.join(
    process.cwd(),
    '.__test__dirs_recursive_depth_3',
    '[testing_threedot_deep]',
    '[...testing]',
  ),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test2', 'deep'),
  path.join(process.cwd(), '.__test__dirs_recursive_depth_3', 'test2', 'deep', 'deeper'),
]

export default [
  {
    fn: async () =>
      await fs.getDirectories(`${dirName}dirs_recursive`, { root: `${dirName}dirs_recursive` }),
    before: createTestDirs('dirs_recursive'),
    expect: expectedDirsRecursive,
    info: 'finds all directories in directory recursively',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_recursive_depth`, { maxDepth: 1 }),
    before: createTestDirs('dirs_recursive_depth'),
    expect: expectedDirsDepth1,
    info: 'finds all directories in directory recursively but with depth 1',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_recursive_depth_2`, 2),
    before: createTestDirs('dirs_recursive_depth_2'),
    expect: expectedDirsDepth2,
    info: 'finds all directories in directory recursively but with depth 2',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_recursive_depth_3`, 3),
    before: createTestDirs('dirs_recursive_depth_3'),
    expect: expectedDirsDepth3,
    info: 'finds all directories in directory recursively but with depth 3',
  },
  {
    fn: async () =>
      await fs.getDirectories(`${dirName}dirs_recursive_depth_3`, { maxDepth: 3, minDepth: 2 }),
    before: createTestDirs('dirs_recursive_depth_3'),
    expect: expectedDirsDepthMax3Min2,
    info: 'finds all directories in directory recursively but with maxDepth 3 and minDepth 2',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_norecurse`, { maxDepth: 1 }),
    before: createTestDirs('dirs_norecurse'),
    expect: expectedDirs,
    info: 'finds all directories in directory without recursion using maxDepth 1',
  },
  {
    fn: async () => await fs.getDirectories(`${dirName}dirs_norecurse_false`, false),
    before: createTestDirs('dirs_norecurse_false'),
    expect: is.array,
    info: 'handles false options parameter by setting maxDepth to 1',
  },
  {
    fn: async () => await fs.getDirectories('test', { noRoot: true }),
    expect: ['test/.lib'],
    info: 'excludes root directory when noRoot option is true',
  },
  {
    fn: async () => await fs.getDirectories('test', { root: process.cwd() }),
    expect: ['test', 'test/.lib'],
    info: 'uses provided root directory option',
  },
  {
    fn: async () => await fs.getDirectories(['test'], { root: '' }),
    expect: ['test', 'test/.lib'],
    info: 'defaults to process.cwd() when root is empty string',
  },
  {
    fn: async () => await fs.getDirectories('non_existing_path'),
    expect: is.array,
    info: 'returns empty array if given invalid path',
  },
  {
    fn: async () => await fs.getDirectories(['non_existing_path']),
    expect: is.length.equal(0),
    info: 'returns empty array if given invalid path in array',
  },
  {
    fn: tryCatch(fs.getDirectories, path.join(process.cwd(), 'package.json')),
    expect: t => t.name === 'Error' && t.code === 'ENOTDIR',
    info: 'returns ENOTDIR if given a file path',
  },
  {
    fn: tryCatch(fs.getDirectories, [0]),
    expect: is.error,
    info: 'returns error if given invalid path in array',
  },
  {
    fn: tryCatch(fs.getDirectories, 0),
    expect: is.error,
    info: 'returns error if given invalid numeric path',
  },
  {
    fn: tryCatch(fs.getDirectories, 0),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'returns error E_ARG_TYPE if given invalid numeric argument',
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
    // make sure we default the root dir to process.cwd()
    fn: async () => await fs.getDirectories(['test']),
    expect: ['test', 'test/.lib'],
    info: 'relative dirs work in arrays with default root directory',
  },
  {
    // make sure we default the root dir to process.cwd()
    fn: async () => await fs.getDirectories('test'),
    expect: ['test', 'test/.lib'],
    info: 'default root dir is process.cwd and relative paths work',
  },
]
