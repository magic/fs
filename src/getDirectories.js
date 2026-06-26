import path from 'node:path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'

import { fs } from './fs.js'

const libName = '@magic/fs.getDirectories'

/**
 * @param {string | string[]} dir
 * @param {number | false | { root?: string, maxDepth?: number, minDepth?: number, depth?: boolean | number, noRoot?: boolean }} [options]
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

  let { minDepth, maxDepth = false, depth, root, noRoot = false } = options

  // Only apply depth === false logic if explicitly passed, not if undefined
  const depthExplicitlyFalse = 'depth' in options && depth === false

  if (!is.number(maxDepth)) {
    if (depthExplicitlyFalse) {
      maxDepth = 1
    } else {
      maxDepth = is.number(depth) ? depth : 200_000
    }
  }

  if (!is.number(minDepth)) {
    minDepth = 0
  }

  if (noRoot && maxDepth === 1) {
    maxDepth += 1
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
      const dirs = await Promise.all(dir.map(f => getDirectories(f, options)))

      return deep.flatten(...dirs).filter(a => a)
    }

    // Use recursive readdir with file types - single syscall, no per-file stat needed
    const entries = await fs.readdir(dir, { recursive: true, withFileTypes: true })

    /** @type {string[]} */
    const dirs = []

    if (!noRoot) {
      // Root dir is depth 0
      if (0 >= minDepth && 0 <= maxDepth) {
        dirs.push(dir)
      }
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Use parentPath + name for correct full path with recursive readdir
        const fullPath = path.join(entry.parentPath, entry.name)

        // Calculate depth relative to root
        const relativePath = path.relative(root || dir, fullPath)
        const entryDepth = relativePath.split(path.sep).filter(Boolean).length

        // Filter by minDepth and maxDepth
        if (entryDepth >= minDepth && entryDepth <= maxDepth) {
          dirs.push(fullPath)
        }
      }
    }

    const finalized = dirs
      .filter(a => is.string(a))
      .filter(d => {
        const currentDepth = d
          .replace(root || process.cwd(), '')
          .split(path.sep)
          .filter(a => a).length

        return currentDepth >= minDepth
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
