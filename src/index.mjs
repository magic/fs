import { fs as fso } from './fs.mjs'

import { mkdirp } from './mkdirp.mjs'
import { rmrf } from './rmrf.mjs'

export const fs = {
  ...fso,
  mkdirp,
  rmrf,
}

export default fs
