import fso from 'fs'
import util from 'util'

const readDir = fso.promises.readdir
const readFile = fso.promises.readFile
const rmdir = fso.promises.rmdir

export const fs = {
  ...fso,
  ...fso.promises,
  exists: util.promisify(fso.exists),
  readdir: readDir,
  readDir,
  readFile,
  readfile: readFile,
  rmdir,
  rmDir: rmdir,
  watch: fso.watch,
}
