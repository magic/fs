import { fs as fso } from './fs.mjs'

import { mkdirp } from './mkdirp.mjs'
import { rmrf } from './rmrf.mjs'
import { getFileType } from './getFileType.mjs'
import { getDirectories } from './getDirectories.mjs'
import { getFiles } from './getFiles.mjs'
import { exists } from './exists.mjs'
import { getContentType } from './getContentType.mjs'
import { getFilePath } from './getFilePath.mjs'

export const fs = /** @type {const} */ ({
  ...fso,
  mkdirp,
  rmrf,
  getFileType,
  getDirectories,
  getFiles,
  exists,
  getContentType,
  getFilePath,
})

export default fs
