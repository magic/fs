import path from 'path'

import { is, tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

export default [
  {
    fn: tryCatch(fs.getFilePath),
    expect: t => t.name === 'E_ARG_1_EMPTY',
    info: 'no arguments errors',
  },
  {
    fn: tryCatch(fs.getFilePath, ''),
    expect: t => t.name === 'E_ARG_1_EMPTY',
    info: 'empty first arg errors',
  },
  {
    fn: tryCatch(fs.getFilePath, 2),
    expect: t => t.name === 'E_ARG_1_TYPE',
    info: 'wrong first arg type errors',
  },
  {
    fn: tryCatch(fs.getFilePath, () => {}),
    expect: t => t.name === 'E_ARG_2_EMPTY',
    info: 'empty second arg errors',
  },
  {
    fn: tryCatch(fs.getFilePath, () => {}, 2),
    expect: t => t.name === 'E_ARG_2_TYPE',
    info: 'wrong second arg type errors',
  },
  {
    fn: tryCatch(fs.getFilePath, () => {}, 'test'),
    expect: t => t.name === 'E_ARG_3_EMPTY',
    info: 'empty third arg errors',
  },
  {
    fn: tryCatch(fs.getFilePath, () => {}, 'test', 23),
    expect: t => t.name === 'E_ARG_3_TYPE',
    info: 'wrong third arg type errors',
  },
  {
    fn: async () => await fs.getFilePath(a => a, path.join(process.cwd(), 'test'), 'spec.mjs'),
    expect: path.join(process.cwd(), 'test', 'spec.mjs'),
    info: 'can concatenate paths correctly',
  },
]
