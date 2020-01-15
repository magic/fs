import path from 'path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'

import { fs } from './fs.mjs'
import { exists } from './exists.mjs'

const libName = '@magic/fs.get'

// recursively find all directories in a directory.
// returns array of paths relative to dir

export const getFilePath = async (dir, file, recurse = true) => {
  if (is.empty(dir)) {
    throw error(`${libName}FilePath: dir can not be empty.`, 'E_ARG_EMPTY')
  }
  if (!is.string(dir)) {
    throw error(`${libName}FilePath: dir must be a string.`, 'E_ARG_TYPE')
  }

  if (is.empty(file)) {
    throw error(`${libName}FilePath: file can not be empty.`, 'E_ARG_EMPTY')
  }

  if (!is.string(file)) {
    throw error(`${libName}FilePath: file must be a string.`, 'E_ARG_TYPE')
  }

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
  if (!is.array(directories) && !is.string(directories)) {
    throw error(`${libName}Directories: need an array or a string as first argument`, 'E_ARG_TYPE')
  }

  if (is.empty(directories)) {
    throw error(`${libName}Directories: first argument can not be empty`, 'E_ARG_EMPTY')
  }

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
