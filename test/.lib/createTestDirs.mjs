import path from 'path'

import fs from '../../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

export const createTestDirs = id => async () => {
  let dir = id
  if (!path.isAbsolute(dir)) {
    dir = `${dirName}${id}`
  }

  const files = [
    path.join(dir, 'test', 'deep', 'test.js'),
    path.join(dir, 'test2', 'deep', 'test2.js'),
    path.join(dir, 'test.js'),
  ]

  await fs.mkdirp(path.join(dir, 'test', 'deep'))
  await fs.mkdirp(path.join(dir, 'test2', 'deep'))

  await Promise.all(files.map(async f => await fs.writeFile(f, 't')))

  return async () => {
    await fs.rmrf(dir)
  }
}
