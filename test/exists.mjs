import { tryCatch } from '@magic/test'

import fs from '../src/index.mjs'

export default [
  { fn: async () => await fs.exists(process.cwd()), info: 'fs.exists returns true for cwd' },
  {
    fn: async () => await fs.exists('/path/that/probably/doesnt/exist/'),
    expect: false,
    info: 'fs.exists returns false for bogus dir',
  },
  {
    fn: tryCatch(fs.exists),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'no arguments errors with E_ARG_EMPTY',
  },
  {
    fn: tryCatch(fs.exists, ''),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'empty argument errors with E_ARG_EMPTY',
  },
  {
    fn: tryCatch(fs.exists, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'wrong argument type errors with E_ARG_EMPTY',
  },
]
