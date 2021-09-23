import path from 'path'

import is from '@magic/types'
import error from '@magic/error'
import log from '@magic/log'

import { fs } from './fs.mjs'

const libName = '@magic/fs.getFilePath'

export const getFilePath = async (fn, dir, file, depth = true, root = 'deprecated') => {
  if (root !== 'deprecated') {
    log.warn('E_DEPRECATED', 'you have used fs.getFilePath with a fifth argument.')
    log.info('Please use the new syntax instead:')
    log.info("fs.getFilePath(fn, dir, file, { depth: true || 22, root: false || '/some/dir/' })")
  } else {
    root = false
  }

  if (!is.empty(depth) && is.objectNative(depth)) {
    root = depth.root
    depth = depth.depth
  }

  if (is.empty(fn)) {
    throw error(`${libName}: fn: first argument can not be empty`, 'E_ARG_1_EMPTY')
  }
  if (!is.function(fn)) {
    throw error(`${libName}: fn: first argument must be a function`, 'E_ARG_1_TYPE')
  }

  if (is.empty(dir)) {
    throw error(`${libName}: dir: second argument can not be empty`, 'E_ARG_2_EMPTY')
  }
  if (!is.string(dir)) {
    throw error(`${libName}: dir: second argument must be a string`, 'E_ARG_2_TYPE')
  }

  if (is.empty(file)) {
    throw error(`${libName}: file: third argument can not be empty`, 'E_ARG_3_EMPTY')
  }
  if (!is.string(file)) {
    throw error(`${libName}: file: third argument must be a string`, 'E_ARG_3_TYPE')
  }

  const filePath = path.join(dir, file)

  const stat = await fs.stat(filePath)
  if (stat.isDirectory(filePath)) {
    const currentDepth = filePath
      .replace(root, '')
      .split(path.sep)
      .filter(a => a).length

    if (depth || currentDepth === 1) {
      return await fn(filePath, { depth, root })
    }
  } else if (stat.isFile()) {
    return filePath
  }
}
