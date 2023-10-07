import path from 'path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'
import log from '@magic/log'

import { fs } from './fs.mjs'

import { getFilePath } from './getFilePath.mjs'

const libName = '@magic/fs.getDirectories'

export const getDirectories = async (dir, args = {}) => {
  if (is.number(args)) {
    args = {
      maxDepth: args,
    }
  } else if (args === false) {
    args = {
      maxDepth: 1,
    }
  }

  let { minDepth, maxDepth = false, depth = false, root, noRoot = false } = args

  if (is.number(depth) && !is.number(maxDepth)) {
    maxDepth = depth
  }

  if (!is.number(maxDepth)) {
    maxDepth = 200_000
  }
  if (!is.number(minDepth)) {
    minDepth = 0
  }

  if (!is.array(dir) && !is.string(dir)) {
    throw error(`${libName}: need an array or a string as first argument`, 'E_ARG_TYPE')
  }

  if (is.empty(dir)) {
    throw error(`${libName}: first argument can not be empty`, 'E_ARG_EMPTY')
  }

  if (is.empty(root)) {
    if (is.string(dir)) {
      root = dir
    } else {
      root = process.cwd()
    }
  }

  try {
    if (is.array(dir)) {
      const dirs = await Promise.all(
        dir.map(async f => await getDirectories(f, { maxDepth, minDepth, root, noRoot })),
      )

      return deep.flatten(...dirs).filter(a => a)
    }

    const currentDepth = dir
      .replace(root, '')
      .split(path.sep)
      .filter(a => a).length

    if (currentDepth > maxDepth) {
      return []
    }

    const dirContent = await fs.readdir(dir)

    const dirs = await Promise.all(
      dirContent.map(async file => {
        if (!is.string(file)) {
          throw error(`${libName}: path was not a string: ${file}`, 'E_ARG_TYPE')
        }

        let filePath = await getFilePath(getDirectories, dir, file, { maxDepth, minDepth, root })

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

    let finalDirs = deep.flatten(dirs).filter(a => a)
    if (!noRoot) {
      finalDirs = [dir, ...finalDirs]
    }

    const finalized = finalDirs
      .filter(a => a)
      .filter(dir => {
        if (is.number(minDepth)) {
          const currentDepth = dir
            .replace(root, '')
            .split(path.sep)
            .filter(a => a).length

          return currentDepth >= minDepth
        }

        return false
      })

    const unique = Array.from(new Set(finalized))

    return unique
  } catch (e) {
    if (e.code === 'ENOENT') {
      return []
    }

    throw e
  }
}
