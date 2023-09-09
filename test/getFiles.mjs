import path from 'path'
// import URL from 'url'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

import { createTestDirs } from './.lib/createTestDirs.mjs'

const expectedFiles = [
  path.join(process.cwd(), '.__test__files_norecurse', 'test.js'),
  path.join(process.cwd(), '.__test__files_norecurse', 'test.md'),
]

const expectedFilesRecursive = [
  path.join(process.cwd(), '.__test__files_recursive', 'test', 'deep', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive', 'test.md'),
  path.join(process.cwd(), '.__test__files_recursive', 'test2', 'deep', 'deeper', 'deep.js'),
  path.join(
    process.cwd(),
    '.__test__files_recursive',
    'test2',
    'deep',
    'deeper',
    'evendeeper',
    'deepest.js',
  ),
  path.join(process.cwd(), '.__test__files_recursive', 'test2', 'deep', 'test2.js'),
]

const expectedFilesRecursiveDepth1 = [
  path.join(process.cwd(), '.__test__files_recursive_depth_1', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_1', 'test.md'),
]

const expectedFilesRecursiveDepth2 = [
  path.join(process.cwd(), '.__test__files_recursive_depth_2', 'test', 'deep', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_2', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_2', 'test.md'),
  path.join(process.cwd(), '.__test__files_recursive_depth_2', 'test2', 'deep', 'test2.js'),
]

const expectedFilesRecursiveDepth3 = [
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test', 'deep', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test.md'),
  path.join(
    process.cwd(),
    '.__test__files_recursive_depth_3',
    'test2',
    'deep',
    'deeper',
    'deep.js',
  ),
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test2', 'deep', 'test2.js'),
]

const expectedFilesRecursiveDepthMax3Min2 = [
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test', 'deep', 'test.js'),
  path.join(
    process.cwd(),
    '.__test__files_recursive_depth_3',
    'test2',
    'deep',
    'deeper',
    'deep.js',
  ),
  path.join(process.cwd(), '.__test__files_recursive_depth_3', 'test2', 'deep', 'test2.js'),
]

const expectedFilesRecursiveDepth3OptionsObject = [
  path.join(
    process.cwd(),
    '.__test__files_recursive_depth_3_options_object',
    'test',
    'deep',
    'test.js',
  ),
  path.join(process.cwd(), '.__test__files_recursive_depth_3_options_object', 'test.js'),
  path.join(process.cwd(), '.__test__files_recursive_depth_3_options_object', 'test.md'),
  path.join(
    process.cwd(),
    '.__test__files_recursive_depth_3_options_object',
    'test2',
    'deep',
    'deeper',
    'deep.js',
  ),
  path.join(
    process.cwd(),
    '.__test__files_recursive_depth_3_options_object',
    'test2',
    'deep',
    'test2.js',
  ),
]

const expectedFilesWithExtensionMd = [
  path.join(process.cwd(), '.__test__files_extension_md', 'test.md'),
]

const expectedFilesWithExtensionJs = [
  path.join(process.cwd(), '.__test__files_extension_js', 'test', 'deep', 'test.js'),
  path.join(process.cwd(), '.__test__files_extension_js', 'test.js'),
  path.join(process.cwd(), '.__test__files_extension_js', 'test2', 'deep', 'deeper', 'deep.js'),
  path.join(process.cwd(), '.__test__files_extension_js', 'test2', 'deep', 'deeper', 'evendeeper', 'deepest.js'),
  path.join(process.cwd(), '.__test__files_extension_js', 'test2', 'deep', 'test2.js'),
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
    fn: async () => await fs.getFiles(`${dirName}files_recursive_depth_1`, 1),
    before: createTestDirs('files_recursive_depth_1'),
    expect: expectedFilesRecursiveDepth1,
    info: 'finds all files in directory. recursively, but for depth 1',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}files_recursive_depth_2`, 2),
    before: createTestDirs('files_recursive_depth_2'),
    expect: expectedFilesRecursiveDepth2,
    info: 'finds all files in directory. recursively, but for depth 2',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}files_recursive_depth_3`, 3),
    before: createTestDirs('files_recursive_depth_3'),
    expect: expectedFilesRecursiveDepth3,
    info: 'finds all files in directory. recursively, but for depth 3',
  },
  {
    fn: async () =>
      await fs.getFiles(`${dirName}files_recursive_depth_3`, { maxDepth: 3, minDepth: 2 }),
    before: createTestDirs('files_recursive_depth_3'),
    expect: expectedFilesRecursiveDepthMax3Min2,
    info: 'finds all files in directory. recursively, but for maxDepth 3 and minDepth 2',
  },
  {
    fn: async () =>
      await fs.getFiles(`${dirName}files_recursive_depth_3_options_object`, { depth: 3 }),
    before: createTestDirs('files_recursive_depth_3_options_object'),
    expect: expectedFilesRecursiveDepth3OptionsObject,
    info: 'finds all files in directory. recursively, but for { depth: 3 } options object',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}files_extension_md`, { extension: 'md' }),
    before: createTestDirs('files_extension_md'),
    expect: expectedFilesWithExtensionMd,
    info: 'finds all files in directory, if their extension matches md',
  },
  {
    fn: async () => await fs.getFiles(`${dirName}files_extension_js`, { extension: 'js' }),
    before: createTestDirs('files_extension_js'),
    expect: expectedFilesWithExtensionJs,
    info: 'finds all files in directory, if their extension matches js',
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

  {
    fn: async () => await fs.getFiles('non_existing_path', true, false),
    expect: is.array,
    info: 'test deprecation warning',
  },
]
