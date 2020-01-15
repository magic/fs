import { getFileType } from './getFileType.mjs'
import { contentTypes } from './contentTypes.mjs'

import is from '@magic/types'
import error from  '@magic/error'

const libName = '@magic/fs.getContentType'

export const getContentType = uri => {
  if (is.empty(uri)) {
    throw error(`${libName}: need uri to be a non-empty string`, 'E_ARG_EMPTY')
  }
  if (!is.string(uri)) {
    throw error(`${libName}: need uri to be a string`, 'E_ARG_TYPE')
  }

  const fileType = getFileType(uri)
  let contentType = 'text/plain'
  if (contentTypes[fileType]) {
    contentType = contentTypes[fileType]
  }

  return contentType
}
