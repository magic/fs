import { is } from '@magic/test'

import { contentTypes } from '../src/contentTypes.mjs'
import { getFileType } from '../src/getFileType.mjs'

export default [
  {
    fn: Object.entries(contentTypes).filter(([ext, type]) => ext !== getFileType(`file.${ext}`)),
    expect: is.empty,
    info: 'getFileType handles all defined contentTypes correctly',
  },
  {
    fn: getFileType('file.unknown'),
    expect: 'unknown',
    info: 'unknown content returns extension',
  },
  {
    fn: getFileType('file'),
    expect: 'txt',
    info: 'file without extension are txt files',
  },
]
