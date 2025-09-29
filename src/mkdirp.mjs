import path from 'path'

import error from '@magic/error'
import is from '@magic/types'

import { fs } from './fs.mjs'

const libName = '@magic/fs.mkdirp'

/**
 *
 * @param {string} p
 * @returns {Promise<boolean | void>}
 */
export const mkdirp = async p => {
  if (is.empty(p)) {
    throw error(`${libName} expects a non-empty path string as argument.`, 'E_ARG_EMPTY')
  }

  if (!is.string(p)) {
    throw error(`${libName} expects a path string as argument, got: ${typeof p}`, 'E_ARG_TYPE')
  }

  p = path.resolve(p)

  try {
    const dir = path.dirname(p)
    let exists = await fs.exists(dir)

    if (!exists) {
      await mkdirp(dir)
    }

    await fs.mkdir(p)
    return true
  } catch (e) {
    const err = /** @type {Error & { code?: string}} */ (e)
    if (err.code === 'EEXIST') {
      return true
    }

    throw error(err)
  }
}
