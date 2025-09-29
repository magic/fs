import path from 'path'

/**
 *
 * @param {string} name
 * @returns {string}
 */
export const getFileType = name =>
  !name || !name.includes('.') ? 'txt' : path.extname(name).substring(1)
