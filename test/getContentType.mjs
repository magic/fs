import { is, tryCatch } from '@magic/test'

import { getContentType } from '../src/getContentType.mjs'
import { contentTypes } from '../src/contentTypes.mjs'

export default [
  ...Object.entries(contentTypes).map(([ext, type]) => {
    return {
      fn: getContentType(`file.${ext}`),
      expect: type,
    }
  }),
  {
    fn: getContentType('file.unknown'),
    expect: 'text/plain',
    info: 'unknown content returns text/plain',
  },
  {
    fn: tryCatch(getContentType),
    expect: is.error,
    info: 'uri has to be set',
  },
  {
    fn: tryCatch(getContentType),
    expect: t => t.name === 'E_ARG_EMPTY',
    info: 'uri has to be non-empty',
  },
  {
    fn: tryCatch(getContentType, 23),
    expect: t => t.name === 'E_ARG_TYPE',
    info: 'uri has to be a string',
  },
]
