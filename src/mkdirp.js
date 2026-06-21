import is from '@magic/types'
import { fs } from './fs.js'
import error from '@magic/error'

const libName = '@magic/fs.mkdirp'

/**
 *
 * @param {import('node:fs').PathLike} p
 * @param {import('node:fs').MakeDirectoryOptions} opts
 *
 * @returns {Promise<boolean>}
 */
export const mkdirp = async (p, opts = {}) => {
  if (is.empty(p)) {
    throw error(`${libName} expects a non-empty path string as argument.`, 'E_ARG_EMPTY')
  }

  if (!is.string(p)) {
    throw error(`${libName} expects a path string as argument, got: ${typeof p}`, 'E_ARG_TYPE')
  }

  try {
    await fs.mkdir(p, { ...opts, recursive: true })
    return true
  } catch (e) {
    const err = /** @type {Error & { code?: string}} */ (e)
    if (err.code === 'EEXIST') {
      return true
    }

    throw error(err)
  }
}
