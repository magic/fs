import path from 'path'

import error from '@magic/error'

import { fs } from './fs.mjs'

export const mkdirp = async p => {
  if (!p) {
    throw error('mkdirp needs an argument', 'E_ARG_EMPTY')
  }

  p = path.resolve(p)

  try {
    const dir = path.dirname(p)
    let exists = false
    try {
      await fs.stat(dir)
      exists = true
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e
      }
    }

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
