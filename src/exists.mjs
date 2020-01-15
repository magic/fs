import { fs } from './fs.mjs'

import error from '@magic/error'
import is from '@magic/types'

const libName = '@magic/fs.exists'

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
    if (e.code === 'ENOENT') {
      return false
    }

    throw error(e.message, e.code || e.name)
  }
}
