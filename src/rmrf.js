import path from 'node:path'

import is from '@magic/types'
import error from '@magic/error'

import { fs } from './fs.js'

const cwd = process.cwd()

const libName = '@magic/fs.rmrf'

/**
 * Recursively removes a file or directory.
 *
 * @throws {Error} If the argument is invalid, outside cwd, or fs operations fail.
 * @param {string} dir
 * @param {object} [opts]
 * @param {boolean} [opts.dryRun]
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
    if (!opts.dryRun) {
      await fs.rm(dir, { recursive: true, force: true })
    }
    return true
  } catch (e) {
    const err = /** @type {Error & { code?: string}} */ (e)

    if (err.code === 'ENOENT') {
      return true
    }

    throw error(err)
  }
}
