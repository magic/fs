import path from 'path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'

import { fs } from './fs.mjs'
import { exists } from './exists.mjs'
import { getFilePath } from './getFilePath.mjs'

const libName = '@magic/fs.get'

export const getDirectories = async (directories, recurse = true, root = false) => {
  if (!is.array(directories) && !is.string(directories)) {
    throw error(`${libName}Directories: need an array or a string as first argument`, 'E_ARG_TYPE')
  }

  if (is.empty(directories)) {
    throw error(`${libName}Directories: first argument can not be empty`, 'E_ARG_EMPTY')
  }

  try {
    if (is.array(directories)) {
      const dirs = await Promise.all(
        directories.map(async f => await getDirectories(f, recurse, root)),
      )

      return deep.flatten(...dirs).filter(a => a)
    }

    if (!root) {
      root = directories
    }

    const dirContent = await fs.readdir(directories)

    const dirs = await Promise.all(
      dirContent
        // .filter(async f => await exists(f))
        .map(async file => {
          if (!is.string(file)) {
            throw error(`${libName}: path was not a string: ${file}`, 'E_ARG_TYPE')
          }

          let filePath = await getFilePath(getDirectories, directories, file, recurse, root)

          if (filePath) {
            if (!is.array(filePath)) {
              filePath = [filePath]
            }

            const files = await Promise.all(
              filePath.map(async file => {
                if (!is.string(file)) {
                  throw error(`${libName}: path was not a string: ${file}`, 'E_ARG_TYPE')
                }

                const stat = await fs.stat(file)
                if (stat.isDirectory()) {
                  return filePath
                }
              }),
            )

            return files
          }

          return
        }),
    )

    const finalized = deep.flatten(directories, dirs).filter(a => a)

    return Array.from(new Set(finalized))
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw e
  }
}
