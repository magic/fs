import path from 'path'

import deep from '@magic/deep'
import is from '@magic/types'
import error from '@magic/error'

import { getFilePath } from './getFilePath.mjs'
import { fs } from './fs.mjs'

const libName = '@magic/fs.getFiles'

export const getFiles = async (dir, args = {}) => {
  if (is.number(args)) {
    args = {
      maxDepth: args,
    }
  }

  let { minDepth = 0, maxDepth = false, depth = false, extension = false, ext = false, root } = args

  if (ext && !extension) {
    extension = ext
  }

  if (is.number(depth) && !is.number(maxDepth)) {
    maxDepth = depth
  }

  if (!is.number(maxDepth)) {
    maxDepth = 200_000
  }
  if (!is.number(minDepth)) {
    minDepth = 0
  }

  if (is.empty(dir)) {
    throw error(`${libName}: dir: first argument can not be empty.`, 'E_ARG_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: dir: first argument must be a string.`, 'E_ARG_TYPE')
  }

  if (is.empty(root)) {
    root = dir
  }

  const currentDepth = dir
    .replace(root, '')
    .split(path.sep)
    .filter(a => a).length

  if (currentDepth > maxDepth) {
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
            const currentDepth =
              file
                .replace(root, '')
                .split(path.sep)
                .filter(a => a).length - 1

            return currentDepth >= minDepth
          }

          return true
        }),
    )
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw error(e.message, e.code)
  }
}
