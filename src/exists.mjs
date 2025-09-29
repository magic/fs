import { fs } from './fs.mjs'

import error from '@magic/error'
import is from '@magic/types'

const libName = '@magic/fs.exists'

/** @type {(f: import('node:fs').PathLike) => Promise<boolean>} */
export const exists = async f => {
  if (is.empty(f)) {
    throw error(`${libName} expects argument to be non-empty`, 'E_ARG_EMPTY')
  }

  if (!is.string(f)) {
    throw error(`${libName} expects argument to be a string`, 'E_ARG_TYPE')
  }

  try {
    await fs.stat(f)
    return true
  } catch (e) {
    const err = /** @type {Error & { code: string }} */ (e)
    if (err.code === 'ENOENT') {
      return false
    }

    throw error(err.message, err.code || err.name)
  }
}
