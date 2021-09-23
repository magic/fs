import path from 'path'

import deep from '@magic/deep'
import is from '@magic/types'
import error from '@magic/error'
import log from '@magic/log'

import { getFilePath } from './getFilePath.mjs'
import { fs } from './fs.mjs'

const libName = '@magic/fs.getFiles'

export const getFiles = async (dir, depth = true, root = 'deprecated') => {
  if (root !== 'deprecated') {
    log.warn('E_DEPRECATED', 'you have used fs.getFiles with a third argument.')
    log.info('Please use the new syntax instead:')
    log.info('fs.getFiles(dir, { depth: true, root: false })')
  } else {
    root = false
  }

  if (!is.empty(depth) && is.objectNative(depth)) {
    root = root || depth?.root
    depth = depth?.depth
  }

  if (depth === false) {
    depth = 1
  }

  if (is.empty(dir)) {
    throw error(`${libName}: dir: first argument can not be empty.`, 'E_ARG_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: dir: first argument must be a string.`, 'E_ARG_TYPE')
  }

  if (is.empty(root) && is.number(depth)) {
    root = dir
  }

  if (is.number(depth)) {
    const currentDepth = dir.replace(root, '').split(path.sep).length
    if (currentDepth - 1 > depth) {
      return []
    }
  }

  try {
    const dirContent = await fs.readdir(dir)
    const files = await Promise.all(
      dirContent.map(file => getFilePath(getFiles, dir, file, { depth, root })),
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
