import path from 'path'

import is from '@magic/types'
import deep from '@magic/deep'

import { fs } from './fs.mjs'
import { exists } from './exists.mjs'

// recursively find all directories in a directory.
// returns array of paths relative to dir

export const getFilePath = async (dir, file, recurse = true) => {
  const filePath = path.join(dir, file)

  const stat = await fs.stat(filePath)
  if (stat.isDirectory(filePath)) {
    if (recurse) {
      return await getDirectories(filePath, recurse)
    } else {
      return filePath
    }
  }
}

export const getDirectories = async (directories, recurse = true) => {
  try {
    if (is.array(directories)) {
      const dirs = await Promise.all(
        directories
          .filter(async f => await exists(f))
          .map(async f => await getDirectories(f, recurse))
          .filter(a => a),
      )

      return deep.flatten(...dirs)
    }

    const flattened = [directories]
    const dirContent = await fs.readdir(directories)
    const dirs = await Promise.all(
      dirContent.map(async file => await getFilePath(directories, file, recurse)),
    )

    return deep.flatten(flattened, dirs).filter(a => a)
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw e
  }
}
