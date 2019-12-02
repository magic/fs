import { is } from '@magic/test'

import fs from '../src/index.mjs'

const fns = [
  'access',
  'copyFile',
  'open',
  'opendir',
  'rename',
  'truncate',
  'rmdir',
  'mkdir',
  'readdir',
  'readlink',
  'symlink',
  'lstat',
  'stat',
  'link',
  'unlink',
  'chmod',
  'lchmod',
  'lchown',
  'chown',
  'utimes',
  'realpath',
  'mkdtemp',
  'writeFile',
  'appendFile',
  'readFile',
  'exists',
  'readDir',
  'readfile',
  'rmDir',
  'watch',
  'mkdirp',
  'rmrf',
]

export default [
  { fn: Object.keys(fs), expect: is.deep.equal(fns), info: 'test if all expected functions exist' },
]
