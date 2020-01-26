import path from 'path'

import is from '@magic/types'
import error from '@magic/error'

import { fs } from './fs.mjs'

const cwd = process.cwd()

const libName = '@magic/fs.rmrf'

export const rmrf = async dir => {
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
      await fs.unlink(dir)
      return true
    } else if (stat.isDirectory()) {
      const files = await fs.readdir(dir)
      await Promise.all(files.map(async file => await rmrf(path.join(dir, file))))

      await fs.rmdir(dir)
      return true
    }
  } catch (e) {
    if (e.code === 'ENOENT') {
      return true
    }

    throw error(e)
  }
}
