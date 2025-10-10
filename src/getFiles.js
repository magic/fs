import path from 'node:path'

// import deep from '@magic/deep'
import is from '@magic/types'
import error from '@magic/error'

import { getFilePath } from './getFilePath.js'
import { fs } from './fs.js'

const libName = '@magic/fs.getFiles'

/**
 * @typedef {object} Options
 * @property {number} [minDepth]
 * @property {number} [maxDepth]
 * @property {number | false} [depth]
 * @property {string} [extension]
 * @property {string} [ext]
 * @property {string} [root]
 */

/**
 * @param {string} dir
 * First argument: directory to scan
 * @param {number | Options} [options]
 * If number, sets maxDepth directly.
 * @returns {Promise<string[]>}
 */

export const getFiles = async (dir, options = {}) => {
  if (is.number(options)) {
    options = {
      maxDepth: options,
    }
  }

  let {
    minDepth = 0,
    maxDepth = false,
    depth = false,
    extension = false,
    ext = false,
    root = process.cwd(),
  } = options

  if (ext && !extension) {
    extension = ext
  }

  if (!is.number(maxDepth)) {
    maxDepth = is.number(depth) ? depth : 1
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

  const currentDepth =
    dir
      .replace(root, '')
      .split(path.sep)
      .filter(a => a).length - 1

  if (currentDepth > maxDepth) {
    return []
  }

  try {
    const dirContent = await fs.readdir(dir)
    const files = await Promise.all(
      dirContent.map(file => getFilePath(getFiles, dir, file, { maxDepth, minDepth, root })),
    )

    return await Promise.all(
      files
        .flat(20000)
        .filter(a => !is.undef(a))
        /*
         * if an extension parameter has been passed,
         * remove the file if it does not end with extension
         */
        .filter(a => !extension || a.endsWith(extension))
        /*
         * filter nonfiles
         */
        .filter(f => {
          const stat = fs.statSync(f)
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
                .replace(root ?? '', '')
                .split(path.sep)
                .filter(a => a).length - 1

            return currentDepth >= minDepth
          }

          return true
        }),
    )
  } catch (e) {
    const err = /** @type {Error & { code?: string }} */ (e)
    if (err.code === 'ENOENT') {
      return []
    }

    throw error(err.message, err.code)
  }
}
