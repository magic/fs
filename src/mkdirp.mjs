import path from 'path'

import error from '@magic/error'
import is from '@magic/types'

import { fs } from './fs.mjs'

export const mkdirp = async p => {
  if (!is.string) {
    throw error('mkdirp needs a path string as argument', 'E_ARG_TYPE')
  }

  if (is.empty(p)) {
    throw error('mkdirp needs a non-empty path string as argument', 'E_ARG_EMPTY')
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
    if (e.code !== 'EEXIST') {
      throw e
    }
    return true
  }
}
