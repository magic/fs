import path from 'path'

import is from '@magic/types'
import deep from '@magic/deep'
import error from '@magic/error'
import log from '@magic/log'

import { fs } from './fs.mjs'

import { getFilePath } from './getFilePath.mjs'

const libName = '@magic/fs.getDirectories'

export const getDirectories = async (dir, depth = {}, root = 'deprecated') => {
  if (root !== 'deprecated') {
    log.warn('E_DEPRECATED', 'you have used fs.getDirectories with a third argument.')
    log.info('Please use the new syntax instead:')
    log.info('fs.getDirectories(dir, { root: true })')
  } else {
    root = false
  }

  let minDepth = 0
  let maxDepth = 200

  let noRoot = false
  if (depth === false) {
    maxDepth = 1
  } else if (is.number(depth)) {
    maxDepth = depth
  } else if (!is.empty(depth) && is.objectNative(depth)) {
    root = root || depth?.root
    noRoot = depth?.noRoot

    if (depth.hasOwnProperty('depth')) {
      maxDepth = depth.depth
    } else if (depth.hasOwnProperty('maxDepth')) {
      maxDepth = depth.maxDepth
    }

    if (depth.hasOwnProperty('minDepth')) {
      minDepth = depth.minDepth
    }
  }

  maxDepth = parseInt(maxDepth)

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

    const currentDepth = dir.replace(root, '').split(path.sep).length
    if (is.number(maxDepth) && currentDepth - 1 > maxDepth) {
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

    let finalDirs = dirs.filter(a => a)
    if (!noRoot) {
      finalDirs = [dir, ...finalDirs]
    }

    const finalized = deep.flatten(finalDirs).filter(dir => {
      if (!dir) {
        return false
      }

      if (is.number(minDepth)) {
        const currentDepth = dir.replace(root, '').split(path.sep).length

        return currentDepth > minDepth
      }

      return true
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
