# @magic/fs

exports all fs.promises + exists + mkdirp + rmrf + getFiles + getDirs functions.

[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

[html-docs](https://magic.github.io/fs)

### installation
be in a nodejs project
```bash
npm install @magic/fs
```

### import
```javascript
import fs from '@magic/fs'

const run = async () => {
  await fs.mkdirp('./test_235235/dir/to/create')
  console.log('dir created')
  await fs.rmrf('./test_235235')
  console.log('dir deleted, even though it had contents.')
}
run()
```

### promises
promises from fs:
```
access
copyFile
open
opendir
rename
truncate
rmdir
mkdir
readdir
readlink
symlink
lstat
stat
link
unlink
chmod
lchmod
lchown
chown
utimes
realpath
mkdtemp
writeFile
appendFile
readFile
exists
readDir
readfile
rmDir
```

### export overloads:
```javascript
rmdir, rmDir
readfile, readFile
readdir, readDir
```

### Additional functions:

#### mkdirp
same as mkdir -p on unix

```javascript
await fs.mkdirp('./path/to/dir')
```

#### rmrf
same as rm -rf on unix.

**will not work outside process.cwd()**
```javascript
await fs.rmrf('./path/to/dir')
```

#### exists
same as fs.exists, but promisified and ready for esmodules.

#### getDirectories
get a list of directories in a directory,
recursively.

```javascript
import fs from '@magic/fs'

const run = async () => {
  // first level directories
  const directories = await fs.getDirectories(process.cwd())
  console.log(directories)

  // recursive run
  const deepDirectories = await fs.getDirectories(process.cwd(), true)
  console.log(deepDirectories)

  // recursive run with specified depth, 
  // just pass a number as second argument
  const deepDirectoriesDepth2 = await fs.getDirectories(process.cwd(), 2)
  console.log(deepDirectoriesDepth2)
}
run()
```

#### getFiles
get a list of files in a directory,
recursively.

```javascript
import fs from '@magic/fs'

const run = async () => {
  // first level directories
  const files = await fs.getFiles(process.cwd())
  console.log(files)

  // recursive run
  const deepFiles = await fs.getFiles(process.cwd(), true)
  console.log(deepFiles)

  // recursive run with specified depth, 
  // just pass a number as second argument
  const deepDirectoriesDepth2 = await fs.getFiles(process.cwd(), 2)
  console.log(deepDirectoriesDepth2)
}
run()
```

#### getFileType
get the file type of a file,
based on extension,
and defaulting to "txt"

```javascript
import fs from '@magic/fs'

const fileType = fs.getFileType('html.html')
console.log(fileType, fileType === 'html')

const nonFileType = fs.getFileType()
console.log(nonFileType, nonFileType === 'txt')

```

### changelog

#### 0.0.1
first release

#### 0.0.2
* bump required node version
* update dependencies

#### 0.0.3
better error messages

#### 0.0.4
rmrf returns true if directory does not exist.

#### 0.0.5
use @magic/mime-types to export contentTypes

#### 0.0.6
bump required node version to 14.2.0

#### 0.0.7
rmrf: add dryRun option

#### 0.0.8 
update dependencies

#### 0.0.9 - unreleased
* remove unused imports from getDirectories
* getDirectories and getFiles now accept a number as second argument.

```
// if a number is given instead of true/false, then this is the depth of recursion.
getFiles(directory, 2) // two levels down
```

#### 0.0.10
* bump required node version to 14.15.4
* update dependencies

##### 0.0.11
update dependencies (@magic/mime-types)

##### 0.0.12 - unreleased
...


[npm-image]: https://img.shields.io/npm/v/@magic/fs.svg
[npm-url]: https://www.npmjs.com/package/@magic/fs
[travis-image]: https://img.shields.io/travis/com/magic/fs.svg?branch=master
[travis-url]: https://travis-ci.com/magic/fs
[appveyor-image]: https://img.shields.io/appveyor/ci/magic/fs/master.svg
[appveyor-url]: https://ci.appveyor.com/project/magic/fs/branch/master
[coveralls-image]: https://coveralls.io/repos/github/magic/fs/badge.svg
[coveralls-url]: https://coveralls.io/github/magic/fs
[greenkeeper-image]: https://badges.greenkeeper.io/magic/fs.svg
[greenkeeper-url]: https://badges.greenkeeper.io/magic/fs.svg
[snyk-image]: https://snyk.io/test/github/magic/fs/badge.svg
[snyk-url]: https://snyk.io/test/github/magic/fs
