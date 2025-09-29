import path from 'path'

import is from '@magic/types'
import error from '@magic/error'

import { fs } from './fs.mjs'

const libName = '@magic/fs.getFilePath'

/**
 * @typedef {typeof import('./getFiles.mjs').getFiles} GetFiles
 * @typedef {import('./getFiles.mjs').Options} GetFilesOptions
 * @typedef {typeof import('./getDirectories.mjs').getDirectories} GetDirectories
 * @typedef {import('./getDirectories.mjs').Options} GetDirectoriesOptions
 *
 */

/**
 *
 * @param {GetFiles | GetDirectories} fn
 * @param {string} dir
 * @param {string} file
 * @param {GetFilesOptions | GetDirectoriesOptions} args
 * @returns {Promise<string | string[] | undefined>}
 */
export const getFilePath = async (fn, dir, file, args = {}) => {
  if (is.empty(fn)) {
    throw error(`${libName}: fn: first argument can not be empty`, 'E_ARG_1_EMPTY')
  }
  if (!is.function(fn)) {
    throw error(`${libName}: fn: first argument must be a function`, 'E_ARG_1_TYPE')
  }

  if (is.empty(dir)) {
    throw error(`${libName}: dir: second argument can not be empty`, 'E_ARG_2_EMPTY')
  }
  if (!is.string(dir)) {
    throw error(`${libName}: dir: second argument must be a string`, 'E_ARG_2_TYPE')
  }

  if (is.empty(file)) {
    throw error(`${libName}: file: third argument can not be empty`, 'E_ARG_3_EMPTY')
  }
  if (!is.string(file)) {
    throw error(`${libName}: file: third argument must be a string`, 'E_ARG_3_TYPE')
  }

  const filePath = path.join(dir, file)

  const stat = await fs.stat(filePath)
  if (stat.isDirectory()) {
    return await fn(filePath, args)
  } else if (stat.isFile()) {
    return filePath
  }
}
