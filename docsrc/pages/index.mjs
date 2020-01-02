export const View = state => [
  h1(state.title),
  p(state.description),

  GitBadges('magic/fs'),

  h3({ id: 'install' }, 'install'),
  p('be in a nodejs project'),
  Pre('npm i --save-dev @magic/fs'),

  h3({ id: 'import' }),

  Pre(`
import fs from '@magic/fs'

const run = async () => {
  await fs.mkdirp('./test_235235/dir/to/create')
  console.log('dir created')
  await fs.rmrf('./test_235235')
  console.log('dir deleted, even though it had contents.')
}
run()
`),

  h3({ id: 'usage' }, 'usage'),

  h4({ id: 'usage-promises' }, 'promises'),
  p('promises from fs'),
  ul([
    li('access'),
    li('copyFile'),
    li('open'),
    li('opendir'),
    li('rename'),
    li('truncate'),
    li('rmdir'),
    li('mkdir'),
    li('readdir'),
    li('readlink'),
    li('symlink'),
    li('lstat'),
    li('stat'),
    li('link'),
    li('unlink'),
    li('chmod'),
    li('lchmod'),
    li('lchown'),
    li('chown'),
    li('utimes'),
    li('realpath'),
    li('mkdtemp'),
    li('writeFile'),
    li('appendFile'),
    li('readFile'),
    li('exists'),
    li('readDir'),
    li('readfile'),
    li('rmDir'),
  ]),
  h4({ id: 'usage-overloads' }, 'export overloads'),
  ul([li('rmdir, rmDir'), li('readfile, readFile'), li('readdir, readDir')]),

  h4({ id: 'usage-additional' }, 'additional functions'),

  h5({ id: 'usage-mkdirp' }, 'mkdirp'),
  p('same as mkdir -p on unix'),
  Pre(`
await fs.mkdirp('./path/to/dir')
`),
  h5({ id: 'usage-rmrf' }, 'rmrf'),
  p('same as rm -rf on unix.'),

  p(strong('will not work outside process.cwd()')),
  Pre(`
await fs.rmrf('./path/to/dir')
`),

  h5({ id: 'usage-exists' }, 'exists'),
  p('same as fs.exists, but promisified.'),

  h5({ id: 'usage-getDirectories' }, 'getDirectories'),
  p('get a list of directories in a directory, recursively.'),

  Pre(`
import fs from '@magic/fs'

const run = async () => {
  // first level directories
  const directories = await fs.getDirectories(process.cwd())
  console.log(directories)

  // recursive run
  const deepDirectories = await fs.getDirectories(process.cwd(), true)
  console.log(deepDirectories)
}
run()
`),

  h4({ id: 'usage-getFiles' }, 'getFiles'),
  p('get a list of files in a directory, recursively.'),

  Pre(`
import fs from '@magic/fs'

const run = async () => {
  // first level files
  const files = await fs.getFiles(process.cwd())
  console.log(files)

  // recursive run
  const deepFiles = await fs.getFiles(process.cwd(), true)
  console.log(deepFiles)
}
run()
`),

  h5({ id: 'usage-getFileType' }, 'getFileType'),
  p(['get the file type of a file,', 'based on extension,', 'and defaulting to "txt"']),

  Pre(`
import fs from '@magic/fs'

const fileType = fs.getFileType('html.html')
console.log(fileType, fileType === 'html')

const nonFileType = fs.getFileType()
console.log(nonFileType, nonFileType === 'txt')
`),

  h2({ id: 'source' }, 'source'),
  p([
    'the source for this page is in the ',
    Link({ to: 'https://github.com/magic/fs/tree/master/example' }, 'example directory'),
    ' and gets built and published to github using ',
    Link({ to: 'https://github.com/magic/core' }, '@magic/core'),
  ]),

  LightSwitch(state),
]
