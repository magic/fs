import path from 'path'

import { fs } from './fs.mjs'

const cwd = process.cwd()

const libName = '@magic/fs.rmrf'

export const rmrf = async dir => {
  if (!dir) {
    throw new Error(`${libName}: expecting a string argument.`)
  }

  if (dir.startsWith('\\')) {
    dir = dir.substr(1)
  }

  if (!path.isAbsolute(dir)) {
    dir = path.join(cwd, dir)
  }

  if (!dir.startsWith(cwd)) {
    throw new Error(`${libName} will not work outside the cwd.`)
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

    throw e
  }
}
