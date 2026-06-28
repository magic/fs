export const fs: {
  readonly mkdirp: (
    p: import('node:fs').PathLike,
    opts?: import('node:fs').MakeDirectoryOptions,
  ) => Promise<boolean>
  readonly rmrf: (
    dir: string,
    opts?: {
      dryRun?: boolean | undefined
    },
  ) => Promise<boolean | undefined>
  readonly getFileType: (name: string) => string
  readonly getDirectories: (
    dir: string | string[],
    options?:
      | number
      | false
      | {
          root?: string
          maxDepth?: number
          minDepth?: number
          depth?: boolean | number
          noRoot?: boolean
        },
  ) => Promise<string[]>
  readonly getFiles: (
    dir: string,
    options?:
      | number
      | {
          minDepth?: number
          maxDepth?: number
          depth?: number | false
          extension?: string
          ext?: string
          root?: string
        },
  ) => Promise<string[]>
  readonly exists: (f: import('node:fs').PathLike) => Promise<boolean>
  readonly getContentType: (uri: string) => string
  readonly getFilePath: (
    fn:
      | ((
          dir: string,
          options?:
            | number
            | {
                minDepth?: number
                maxDepth?: number
                depth?: number | false
                extension?: string
                ext?: string
                root?: string
              },
        ) => Promise<string[]>)
      | ((
          dir: string | string[],
          options?:
            | number
            | false
            | {
                root?: string
                maxDepth?: number
                minDepth?: number
                depth?: boolean | number
                noRoot?: boolean
              },
        ) => Promise<string[]>),
    dir: string,
    file: string,
    args?:
      | number
      | {
          minDepth?: number
          maxDepth?: number
          depth?: number | false
          extension?: string
          ext?: string
          root?: string
        },
  ) => Promise<string | string[] | undefined>
  readonly readdir: typeof import('node:fs/promises').readdir
  readonly readDir: typeof import('node:fs/promises').readdir
  readonly readFile: typeof import('node:fs/promises').readFile
  readonly readfile: typeof import('node:fs/promises').readFile
  readonly rmdir: typeof import('node:fs/promises').rmdir
  readonly rmDir: typeof import('node:fs/promises').rmdir
  readonly watch: typeof import('node:fs').watch
  readonly access: typeof import('node:fs/promises').access
  readonly constants: typeof import('node:fs').constants
  readonly copyFile: typeof import('node:fs/promises').copyFile
  readonly open: typeof import('node:fs/promises').open
  readonly rename: typeof import('node:fs/promises').rename
  readonly truncate: typeof import('node:fs/promises').truncate
  readonly rm: typeof import('node:fs/promises').rm
  readonly mkdir: typeof import('node:fs/promises').mkdir
  readonly readlink: typeof import('node:fs/promises').readlink
  readonly symlink: typeof import('node:fs/promises').symlink
  readonly lstat: typeof import('node:fs/promises').lstat
  readonly stat: typeof import('node:fs/promises').stat
  readonly statfs: typeof import('node:fs/promises').statfs
  readonly link: typeof import('node:fs/promises').link
  readonly unlink: typeof import('node:fs/promises').unlink
  readonly chmod: typeof import('node:fs/promises').chmod
  readonly lchmod: typeof import('node:fs/promises').lchmod
  readonly lchown: typeof import('node:fs/promises').lchown
  readonly lutimes: typeof import('node:fs/promises').lutimes
  readonly chown: typeof import('node:fs/promises').chown
  readonly utimes: typeof import('node:fs/promises').utimes
  readonly realpath: typeof import('node:fs/promises').realpath
  readonly mkdtemp: typeof import('node:fs/promises').mkdtemp
  readonly mkdtempDisposable: typeof import('node:fs/promises').mkdtempDisposable
  readonly writeFile: typeof import('node:fs/promises').writeFile
  readonly appendFile: typeof import('node:fs/promises').appendFile
  readonly opendir: typeof import('node:fs/promises').opendir
  readonly cp: typeof import('node:fs/promises').cp
  readonly glob: typeof import('node:fs/promises').glob
  readonly renameSync: typeof import('node:fs').renameSync
  readonly truncateSync: typeof import('node:fs').truncateSync
  readonly ftruncate: typeof import('node:fs').ftruncate
  readonly ftruncateSync: typeof import('node:fs').ftruncateSync
  readonly chownSync: typeof import('node:fs').chownSync
  readonly fchown: typeof import('node:fs').fchown
  readonly fchownSync: typeof import('node:fs').fchownSync
  readonly lchownSync: typeof import('node:fs').lchownSync
  readonly lutimesSync: typeof import('node:fs').lutimesSync
  readonly chmodSync: typeof import('node:fs').chmodSync
  readonly fchmod: typeof import('node:fs').fchmod
  readonly fchmodSync: typeof import('node:fs').fchmodSync
  readonly lchmodSync: typeof import('node:fs').lchmodSync
  readonly statSync: typeof import('node:fs').statSync
  readonly fstat: typeof import('node:fs').fstat
  readonly fstatSync: typeof import('node:fs').fstatSync
  readonly statfsSync: typeof import('node:fs').statfsSync
  readonly lstatSync: typeof import('node:fs').lstatSync
  readonly linkSync: typeof import('node:fs').linkSync
  readonly symlinkSync: typeof import('node:fs').symlinkSync
  readonly readlinkSync: typeof import('node:fs').readlinkSync
  readonly realpathSync: typeof import('node:fs').realpathSync
  readonly unlinkSync: typeof import('node:fs').unlinkSync
  readonly rmdirSync: typeof import('node:fs').rmdirSync
  readonly rmSync: typeof import('node:fs').rmSync
  readonly mkdirSync: typeof import('node:fs').mkdirSync
  readonly mkdtempSync: typeof import('node:fs').mkdtempSync
  readonly mkdtempDisposableSync: typeof import('node:fs').mkdtempDisposableSync
  readonly readdirSync: typeof import('node:fs').readdirSync
  readonly close: typeof import('node:fs').close
  readonly closeSync: typeof import('node:fs').closeSync
  readonly openSync: typeof import('node:fs').openSync
  readonly utimesSync: typeof import('node:fs').utimesSync
  readonly futimes: typeof import('node:fs').futimes
  readonly futimesSync: typeof import('node:fs').futimesSync
  readonly fsync: typeof import('node:fs').fsync
  readonly fsyncSync: typeof import('node:fs').fsyncSync
  readonly write: typeof import('node:fs').write
  readonly writeSync: typeof import('node:fs').writeSync
  readonly read: typeof import('node:fs').read
  readonly readSync: typeof import('node:fs').readSync
  readonly readFileSync: typeof import('node:fs').readFileSync
  readonly writeFileSync: typeof import('node:fs').writeFileSync
  readonly appendFileSync: typeof import('node:fs').appendFileSync
  readonly watchFile: typeof import('node:fs').watchFile
  readonly unwatchFile: typeof import('node:fs').unwatchFile
  readonly existsSync: typeof import('node:fs').existsSync
  readonly accessSync: typeof import('node:fs').accessSync
  readonly createReadStream: typeof import('node:fs').createReadStream
  readonly createWriteStream: typeof import('node:fs').createWriteStream
  readonly fdatasync: typeof import('node:fs').fdatasync
  readonly fdatasyncSync: typeof import('node:fs').fdatasyncSync
  readonly copyFileSync: typeof import('node:fs').copyFileSync
  readonly writev: typeof import('node:fs').writev
  readonly writevSync: typeof import('node:fs').writevSync
  readonly readv: typeof import('node:fs').readv
  readonly readvSync: typeof import('node:fs').readvSync
  readonly openAsBlob: typeof import('node:fs').openAsBlob
  readonly opendirSync: typeof import('node:fs').opendirSync
  readonly cpSync: typeof import('node:fs').cpSync
  readonly globSync: typeof import('node:fs').globSync
  readonly Stats: typeof import('node:fs').Stats
  readonly StatsFs: typeof import('node:fs').StatsFs
  readonly Dirent: typeof import('node:fs').Dirent
  readonly Dir: typeof import('node:fs').Dir
  readonly ReadStream: typeof import('node:fs').ReadStream
  readonly Utf8Stream: typeof import('node:fs').Utf8Stream
  readonly WriteStream: typeof import('node:fs').WriteStream
  readonly promises: typeof import('node:fs/promises')
}
export default fs
