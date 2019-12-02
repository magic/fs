# @magic/fs

exports all fs.promises + exists + mkdirp + rmrf functions.

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
*usage is discouraged*

same as fs.exists, but promisified.


[![NPM version][npm-image]][npm-url]
[![Linux Build Status][travis-image]][travis-url]
[![Windows Build Status][appveyor-image]][appveyor-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]

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
