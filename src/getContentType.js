import mimes from '@magic/mime-types'
import is from '@magic/types'
import error from '@magic/error'

import { getFileType } from './getFileType.js'

const libName = '@magic/fs.getContentType'

/**
 *
 * @param {string} uri
 * @returns {string}
 */
export const getContentType = uri => {
  if (is.empty(uri)) {
    throw error(`${libName}: need uri to be a non-empty string`, 'E_ARG_EMPTY')
  }

  if (!is.string(uri)) {
    throw error(`${libName}: need uri to be a string`, 'E_ARG_TYPE')
  }

  const fileType = getFileType(uri)
  let contentType = 'text/plain'

  const mimeTypes = /** @type {Record<string, string>} */ (mimes)

  if (fileType in mimeTypes) {
    contentType = mimeTypes[fileType]
  }

  return contentType
}
