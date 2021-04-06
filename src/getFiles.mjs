import path from 'path'

import deep from '@magic/deep'
import is from '@magic/types'
import error from '@magic/error'

import { getFilePath } from './getFilePath.mjs'
import { fs } from './fs.mjs'

const libName = '@magic/fs.getFiles'

export const getFiles = async (dir, recurse = true, root = false) => {
  if (recurse === false) {
    recurse = 1
  }

  if (is.empty(dir)) {
    throw error(`${libName}: dir: first argument can not be empty.`, 'E_ARG_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: dir: first argument must be a string.`, 'E_ARG_TYPE')
  }

  if (is.empty(root) && is.number(recurse)) {
    root = dir
  }

  if (is.number(recurse)) {
    const currentDepth = dir.replace(root, '').split(path.sep).length
    if (currentDepth - 1 > recurse) {
      return []
    }
  }

  try {
    const dirContent = await fs.readdir(dir)
    const files = await Promise.all(
      dirContent.map(file => getFilePath(getFiles, dir, file, recurse, root)),
    )

    return await Promise.all(
      deep
        .flatten(files)
        .filter(a => a)
        .filter(async f => {
          const stat = await fs.stat(f)
          return stat.isFile()
        }),
    )
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw error(e.message, e.code)
  }
}
