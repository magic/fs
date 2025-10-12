import path from 'node:path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'

import { fs } from './fs.js'

import { getFilePath } from './getFilePath.js'

const libName = '@magic/fs.getDirectories'

/**
 * @typedef {object} Options
 * @property {string} [root]
 * @property {number} [maxDepth]
 * @property {number} [minDepth]
 * @property {boolean | number} [depth]
 * @property {boolean} [noRoot]
 */

/**
 * @param {string | string[]} dir
 * @param {number | false | Options} [options]
 * if options is a number, its the max depth of recursion.
 * if it is false, maxDepth is set to 1
 * @returns {Promise<string[]>}
 */
export const getDirectories = async (dir, options = {}) => {
  if (is.number(options)) {
    options = {
      maxDepth: options,
    }
  } else if (options === false) {
    options = {
      maxDepth: 1,
    }
  }

  let { minDepth, maxDepth = false, depth = false, root, noRoot = false } = options

  if (is.number(depth) && !is.number(maxDepth)) {
    maxDepth = depth
  }

  if (!is.number(maxDepth)) {
    maxDepth = 200_000
  }
  if (!is.number(minDepth)) {
    minDepth = 0
  }

  if (!is.array(dir) && !is.string(dir)) {
    throw error(`${libName}: need an array or a string as first argument`, 'E_ARG_TYPE')
  }

  if (is.empty(dir)) {
    throw error(`${libName}: first argument can not be empty`, 'E_ARG_EMPTY')
  }

  if (is.empty(root) && is.string(dir)) {
    root = dir
  }

  try {
    if (is.array(dir)) {
      const dirs = await Promise.all(dir.map(async f => await getDirectories(f, options)))

      return deep.flatten(...dirs).filter(a => a)
    }

    const currentDepth = dir
      .replace(root || process.cwd(), '')
      .split(path.sep)
      .filter(a => a).length

    if (currentDepth > maxDepth) {
      return []
    }

    const dirContent = await fs.readdir(dir)

    /** @type {string[]} */
    const dirs = []

    await Promise.all(
      dirContent.map(async file => {
        if (!is.string(file)) {
          throw error(`${libName}: path was not a string: ${file}`, 'E_ARG_TYPE')
        }

        let filePath = await getFilePath(getDirectories, dir, file, { maxDepth, minDepth, root })

        if (filePath) {
          if (!is.array(filePath)) {
            filePath = [filePath]
          }

          await Promise.all(
            filePath.map(async file => {
              if (!is.string(file)) {
                throw error(`${libName}: path was not a string: ${file}`, 'E_ARG_TYPE')
              }

              try {
                const stat = await fs.stat(file)
                if (stat.isDirectory()) {
                  if (is.array(filePath)) {
                    dirs.push(...filePath)
                  } else if (is.string(filePath)) {
                    dirs.push(filePath)
                  }
                }
              } catch (statErr) {
                // File might have been deleted between readdir and stat
                // Just skip it
              }
            }),
          )
        }
      }),
    )

    let finalDirs = deep.flatten(dirs).filter(a => a)
    if (!noRoot) {
      finalDirs = [dir, ...finalDirs]
    }

    const finalized = finalDirs
      .filter(a => a)
      .filter(dir => {
        if (is.number(minDepth) && is.string(dir)) {
          const currentDepth = dir
            .replace(root || process.cwd(), '')
            .split(path.sep)
            .filter(a => a).length

          return currentDepth >= minDepth
        }

        return false
      })

    const unique = Array.from(new Set(finalized))

    return unique
  } catch (e) {
    const err = /** @type {import('@magic/error').CustomError} */ (e)
    if (err.code === 'ENOENT') {
      return []
    }

    throw e
  }
}
