import path from 'node:path'

import is from '@magic/types'
import error from '@magic/error'

import { fs } from './fs.js'

const libName = '@magic/fs.getFiles'

/**
 * @param {string} dir
 * @param {number | {minDepth?: number, maxDepth?: number, depth?: number | false, extension?: string, ext?: string, root?: string}} [options]
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
    root,
  } = options

  if (ext && !extension) {
    extension = ext
  }

  if (!is.number(maxDepth)) {
    maxDepth = is.number(depth) ? depth : 200_000
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

  if (is.undefined(root)) {
    root = dir
  }

  try {
    // Use recursive readdir with file types - single syscall, no per-file stat needed
    const entries = await fs.readdir(dir, { recursive: true, withFileTypes: true })

    return (
      entries
        .filter(entry => {
          // Only files
          if (!entry.isFile()) {
            return false
          }

          // Calculate depth relative to root - based on parent directory, not file name
          const parentPath = path.join(entry.parentPath)
          const relativePath = path.relative(root, parentPath)
          const entryDepth = relativePath.split(path.sep).filter(Boolean).length

          // Filter by maxDepth
          if (entryDepth > maxDepth) {
            return false
          }

          // Filter by minDepth
          if (entryDepth < minDepth) {
            return false
          }

          // Filter by extension
          if (extension && !relativePath.endsWith(extension)) {
            return false
          }

          return true
        })
        // Use parentPath + name for correct full path with recursive readdir
        .map(entry => path.join(entry.parentPath, entry.name))
    )
  } catch (e) {
    const err = /** @type {Error & { code?: string }} */ (e)
    if (err.code === 'ENOENT') {
      return []
    }

    throw error(err.message, err.code)
  }
}
