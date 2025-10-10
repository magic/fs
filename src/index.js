import { fs as fso } from './fs.js'

import { mkdirp } from './mkdirp.js'
import { rmrf } from './rmrf.js'
import { getFileType } from './getFileType.js'
import { getDirectories } from './getDirectories.js'
import { getFiles } from './getFiles.js'
import { exists } from './exists.js'
import { getContentType } from './getContentType.js'
import { getFilePath } from './getFilePath.js'

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
