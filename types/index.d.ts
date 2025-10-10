export const fs: {
  readonly mkdirp: (p: string) => Promise<boolean | void>
  readonly rmrf: (dir: string, opts?: Options) => Promise<boolean | undefined>
  readonly getFileType: (name: string) => string
  readonly getDirectories: (
    dir: string | string[],
    options?: number | false | Options,
  ) => Promise<string[]>
  readonly getFiles: (dir: string, options?: number | Options) => Promise<string[]>
  readonly exists: (f: import('fs').PathLike) => Promise<boolean>
  readonly getContentType: (uri: string) => string
  readonly getFilePath: (
    fn: GetFiles | GetDirectories,
    dir: string,
    file: string,
    args?: GetFilesOptions,
  ) => Promise<string | string[] | undefined>
  readonly readdir: typeof import('fs/promises').readdir
  readonly readDir: typeof import('fs/promises').readdir
  readonly readFile: typeof import('fs/promises').readFile
  readonly readfile: typeof import('fs/promises').readFile
  readonly rmdir: typeof import('fs/promises').rmdir
  readonly rmDir: typeof import('fs/promises').rmdir
  readonly watch: typeof import('fs').watch
  readonly access: typeof import('fs/promises').access
  readonly copyFile: typeof import('fs/promises').copyFile
  readonly open: typeof import('fs/promises').open
  readonly rename: typeof import('fs/promises').rename
  readonly truncate: typeof import('fs/promises').truncate
  readonly rm: typeof import('fs/promises').rm
  readonly mkdir: typeof import('fs/promises').mkdir
  readonly readlink: typeof import('fs/promises').readlink
  readonly symlink: typeof import('fs/promises').symlink
  readonly lstat: typeof import('fs/promises').lstat
  readonly stat: typeof import('fs/promises').stat
  readonly statfs: typeof import('fs/promises').statfs
  readonly link: typeof import('fs/promises').link
  readonly unlink: typeof import('fs/promises').unlink
  readonly chmod: typeof import('fs/promises').chmod
  readonly lchmod: typeof import('fs/promises').lchmod
  readonly lchown: typeof import('fs/promises').lchown
  readonly lutimes: typeof import('fs/promises').lutimes
  readonly chown: typeof import('fs/promises').chown
  readonly utimes: typeof import('fs/promises').utimes
  readonly realpath: typeof import('fs/promises').realpath
  readonly mkdtemp: typeof import('fs/promises').mkdtemp
  readonly mkdtempDisposable: typeof import('fs/promises').mkdtempDisposable
  readonly writeFile: typeof import('fs/promises').writeFile
  readonly appendFile: typeof import('fs/promises').appendFile
  readonly opendir: typeof import('fs/promises').opendir
  readonly cp: typeof import('fs/promises').cp
  readonly glob: typeof import('fs/promises').glob
  readonly constants: typeof import('fs').constants
  readonly renameSync: typeof import('fs').renameSync
  readonly truncateSync: typeof import('fs').truncateSync
  readonly ftruncate: typeof import('fs').ftruncate
  readonly ftruncateSync: typeof import('fs').ftruncateSync
  readonly chownSync: typeof import('fs').chownSync
  readonly fchown: typeof import('fs').fchown
  readonly fchownSync: typeof import('fs').fchownSync
  readonly lchownSync: typeof import('fs').lchownSync
  readonly lutimesSync: typeof import('fs').lutimesSync
  readonly chmodSync: typeof import('fs').chmodSync
  readonly fchmod: typeof import('fs').fchmod
  readonly fchmodSync: typeof import('fs').fchmodSync
  readonly lchmodSync: typeof import('fs').lchmodSync
  readonly fstat: typeof import('fs').fstat
  readonly fstatSync: typeof import('fs').fstatSync
  readonly statfsSync: typeof import('fs').statfsSync
  readonly linkSync: typeof import('fs').linkSync
  readonly symlinkSync: typeof import('fs').symlinkSync
  readonly readlinkSync: typeof import('fs').readlinkSync
  readonly realpathSync: typeof import('fs').realpathSync
  readonly unlinkSync: typeof import('fs').unlinkSync
  readonly rmdirSync: typeof import('fs').rmdirSync
  readonly rmSync: typeof import('fs').rmSync
  readonly mkdirSync: typeof import('fs').mkdirSync
  readonly mkdtempSync: typeof import('fs').mkdtempSync
  readonly mkdtempDisposableSync: typeof import('fs').mkdtempDisposableSync
  readonly readdirSync: typeof import('fs').readdirSync
  readonly close: typeof import('fs').close
  readonly closeSync: typeof import('fs').closeSync
  readonly openSync: typeof import('fs').openSync
  readonly utimesSync: typeof import('fs').utimesSync
  readonly futimes: typeof import('fs').futimes
  readonly futimesSync: typeof import('fs').futimesSync
  readonly fsync: typeof import('fs').fsync
  readonly fsyncSync: typeof import('fs').fsyncSync
  readonly write: typeof import('fs').write
  readonly writeSync: typeof import('fs').writeSync
  readonly read: typeof import('fs').read
  readonly readSync: typeof import('fs').readSync
  readonly readFileSync: typeof import('fs').readFileSync
  readonly writeFileSync: typeof import('fs').writeFileSync
  readonly appendFileSync: typeof import('fs').appendFileSync
  readonly watchFile: typeof import('fs').watchFile
  readonly unwatchFile: typeof import('fs').unwatchFile
  readonly existsSync: typeof import('fs').existsSync
  readonly accessSync: typeof import('fs').accessSync
  readonly createReadStream: typeof import('fs').createReadStream
  readonly createWriteStream: typeof import('fs').createWriteStream
  readonly fdatasync: typeof import('fs').fdatasync
  readonly fdatasyncSync: typeof import('fs').fdatasyncSync
  readonly copyFileSync: typeof import('fs').copyFileSync
  readonly writev: typeof import('fs').writev
  readonly writevSync: typeof import('fs').writevSync
  readonly readv: typeof import('fs').readv
  readonly readvSync: typeof import('fs').readvSync
  readonly openAsBlob: typeof import('fs').openAsBlob
  readonly opendirSync: typeof import('fs').opendirSync
  readonly cpSync: typeof import('fs').cpSync
  readonly globSync: typeof import('fs').globSync
  readonly promises: typeof import('node:fs/promises')
  readonly Stats: typeof import('fs').Stats
  readonly StatsFs: typeof import('fs').StatsFs
  readonly Dirent: typeof import('fs').Dirent
  readonly Dir: typeof import('fs').Dir
  readonly ReadStream: typeof import('fs').ReadStream
  readonly Utf8Stream: typeof import('fs').Utf8Stream
  readonly WriteStream: typeof import('fs').WriteStream
  readonly statSync: import('fs').StatSyncFn
  readonly lstatSync: import('fs').StatSyncFn
}
export default fs
