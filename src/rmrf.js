import path from 'path'

import is from '@magic/types'
import error from '@magic/error'

import { fs } from './fs.js'

const cwd = process.cwd()

const libName = '@magic/fs.rmrf'

/**
 * @typedef {object} Options
 * @property {boolean} [dryRun]
 */

/**
 * Recursively removes a file or directory.
 *
 * @throws {Error} If the argument is invalid, outside cwd, or fs operations fail.
 * @param {string} dir
 * @param {Options} [opts]
 * @returns {Promise<boolean | undefined>}
 */
export const rmrf = async (dir, opts = {}) => {
  if (is.empty(dir)) {
    throw error(`${libName}: expecting a non-empty argument.`, 'E_DIR_EMPTY')
  }

  if (!is.string(dir)) {
    throw error(`${libName}: expecting a string argument.`, 'E_DIR_TYPE')
  }

  if (!path.isAbsolute(dir)) {
    dir = path.join(cwd, dir)
  }

  if (!dir.startsWith(cwd)) {
    throw error(`${libName} will not work outside the cwd.`, 'E_OUTSIDE_CWD')
  }

  try {
    const stat = await fs.stat(dir)

    if (stat.isFile()) {
      if (!opts.dryRun) {
        await fs.unlink(dir)
      }
      return true
    } else if (stat.isDirectory()) {
      const files = await fs.readdir(dir)

      await Promise.all(files.map(async file => await rmrf(path.join(dir, file))))

      if (!opts.dryRun) {
        await fs.rmdir(dir)
      }
      return true
    }
  } catch (e) {
    const err = /** @type {Error & { code?: string}} */ (e)

    if (err.code === 'ENOENT') {
      return true
    }

    throw error(err)
  }
}
