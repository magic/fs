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
  'getFileType',
  'getDirectories',
  'getFiles',
  'getContentType',
  'getFilePath',
]

export default [
  ...fns.map(fn => ({ fn: typeof fs[fn] === 'function', info: `${fn} is a function` })),
]
