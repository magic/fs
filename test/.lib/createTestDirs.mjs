import path from 'path'

import fs from '../../src/index.mjs'

const dirName = path.join(process.cwd(), '.__test__')

export const createTestDirs = dir => async () => {
  if (!path.isAbsolute(dir)) {
    dir = `${dirName}${dir}`
  }

  const files = [
    path.join(dir, 'test', 'deep', 'test.js'),
    path.join(dir, 'test2', 'deep', 'test2.js'),
    path.join(dir, 'test2', 'deep', 'deeper', 'deep.js'),
    path.join(dir, 'test2', 'deep', 'deeper', 'evendeeper', 'deepest.js'),
    path.join(dir, 'test.js'),
    path.join(dir, 'test.md'),
  ]

  await fs.mkdirp(path.join(dir, 'test', 'deep'))
  await fs.mkdirp(path.join(dir, 'test2', 'deep'))
  await fs.mkdirp(path.join(dir, 'test2', 'deep', 'deeper'))
  await fs.mkdirp(path.join(dir, 'test2', 'deep', 'deeper', 'evendeeper'))

  await Promise.all(files.map(async f => await fs.writeFile(f, 't')))

  // delete files after test has run
  return async () => {
    await fs.rmrf(dir)
  }
}
