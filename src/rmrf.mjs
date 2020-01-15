import path from 'path'

import { fs } from './fs.mjs'

const cwd = process.cwd()

export const rmrf = async dir => {
  if (!dir) {
    throw error('rmrf: expecting a string argument.', 'E_ARG_TYPE')
  }

  if (dir.startsWith('\\')) {
    dir = dir.substr(1)
  }

  if (!dir.startsWith(cwd)) {
    if (path.isabsolute(dir)) {
      throw error('rmrf will not work outside the cwd.', 'E_OUTSIDE_CWD')
    } else {
      dir = path.join(cwd, dir)
    }
  }

  try {
    await fs.stat(dir)
  } catch (e) {
    if (e.code === 'ENOENT') {
      return
    }

    throw e
  }

  const stat = await fs.stat(dir)
  if (stat.isFile()) {
    await fs.unlink(dir)
  } else if (stat.isDirectory()) {
    const files = await fs.readdir(dir)
    await Promise.all(files.map(async file => await rmrf(path.join(dir, file))))

    await fs.rmdir(dir)
  }
}
