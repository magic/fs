import { tryCatch } from '@magic/test'

import fs from '../src/index.js'

export default [
  {
    fn: async () => await fs.exists(process.cwd()),
    expect: true,
    info: 'returns true for existing directory (process.cwd)',
  },
  {
    fn: async () => await fs.exists('/path/that/probably/doesnt/exist/'),
    expect: false,
    info: 'returns false for non-existent directory path',
  },
  {
    fn: async () => await fs.exists('package.json'),
    expect: true,
    info: 'returns true for existing file in current directory',
  },
  {
    fn: tryCatch(fs.exists),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when no arguments provided',
  },
  {
    fn: tryCatch(fs.exists, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when empty string provided',
  },
  {
    fn: tryCatch(fs.exists, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'throws E_ARG_TYPE error when numeric argument provided instead of string',
  },
  {
    fn: tryCatch(fs.exists, null),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when null argument provided',
  },
  {
    fn: tryCatch(fs.exists, undefined),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'throws E_ARG_EMPTY error when undefined argument provided',
  },
]
