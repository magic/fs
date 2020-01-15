import path from 'path'

import { error } from '@magic/error'
import { is } from '@magic/types'

import { fs } from './fs.mjs'

const cwd = process.cwd()

const libName = '@magic/fs.rmrf'

export const rmrf = async dir => {
  if (is.empty(dir)) {
    throw error(`${libName}: expecting a string argument.`, 'E_ARG_EMPTY')
  }
  if (!is.string(dir)) {
    throw error(`${libName}: expecting a string argument.`, 'E_ARG_TYPE')
  }

  if (!dir.startsWith(cwd)) {
    if (path.isAbsolute(dir)) {
      throw error(`${libName}: will not work outside the cwd.`, 'E_OUTSIDE_CWD')
    } else {
      dir = path.join(cwd, dir)
    }
  }

  try {
    const stat = await fs.stat(dir)

    if (stat.isFile()) {
      await fs.unlink(dir)
      return true
    } else if (stat.isDirectory()) {
      const files = await fs.readdir(dir)
      await Promise.all(files.map(async file => await rmrf(path.join(dir, file))))

      await fs.rmdir(dir)
      return true
    }
  } catch (e) {
    throw error(e.message, e.code)
  }
}
