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
    log.info("fs.getFiles(dir, { maxDepth: 200, root: false, extension: 'md', minDepth: 0 })")
  } else {
    root = false
  }

  let minDepth = 0
  let maxDepth = 200

  let extension

  if (depth === false) {
    maxDepth = 1
  } else if (is.number(depth)) {
    maxDepth = depth
  }
  if (!is.empty(depth) && is.objectNative(depth)) {
    root = root || depth?.root
    extension = depth?.extension

    maxDepth = depth?.depth || depth?.maxDepth
    minDepth = depth.minDepth
  }

  if (maxDepth === false) {
    maxDepth = 1
  }

  maxDepth = parseInt(maxDepth)

  if (is.empty(dir)) {
    throw error(`${libName}: dir: first argument can not be empty.`, 'E_ARG_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: dir: first argument must be a string.`, 'E_ARG_TYPE')
  }

  if (is.empty(root) && is.number(maxDepth)) {
    root = dir
  }

  const currentDepth = dir.replace(root, '').split(path.sep).length

  if (is.number(maxDepth) && currentDepth - 1 > maxDepth) {
    return []
  }

  try {
    const dirContent = await fs.readdir(dir)
    const files = await Promise.all(
      dirContent.map(file => getFilePath(getFiles, dir, file, { maxDepth, minDepth, root })),
    )

    return await Promise.all(
      deep
        .flatten(files)
        .filter(a => a)
        /*
         * if an extension parameter has been passed,
         * remove the file if it does not end with extension
         */
        .filter(a => !extension || a.endsWith(extension))
        /*
         * filter nonfiles
         */
        .filter(async f => {
          const stat = await fs.stat(f)
          return stat.isFile()
        })
        /*
         * filter files if depth is smaller than minDepth
         */
        .filter(file => {
          if (!file) {
            return false
          }

          if (is.number(minDepth)) {
            const currentDepth = file.replace(root, '').split(path.sep).length

            return currentDepth > minDepth
          }

          return true
        })
    )
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw error(e.message, e.code)
  }
}
