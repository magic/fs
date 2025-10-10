import { is } from '@magic/test'
import mimes from '@magic/mime-types'

import { getFileType } from '../src/getFileType.js'

export default [
  {
    fn: Object.entries(mimes).filter(([ext, type]) => ext !== getFileType(`file.${ext}`)),
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
