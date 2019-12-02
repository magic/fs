import { is } from '@magic/test'

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
]
