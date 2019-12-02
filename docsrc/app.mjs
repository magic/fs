export const state = {
  title: '@magic/fs',
  description: 'nodejs fs promises and goodies.',
  logotext: '@magic/log',
  menu: [
    { to: '/#getting-started', text: 'getting started' },
    { to: '/#install', text: 'install' },
    { to: '/#import', text: 'import' },
    {
      to: '/#usage',
      text: 'usage',
      items: [
        { to: '-promises', text: 'promises' },
        { to: '-overloads', text: 'overloads' },
        { to: '-additional', text: 'additions' },
        { to: '-mkdirp', text: 'mkdirp' },
        { to: '-rmrf', text: 'rmrf' },
        { to: '-exists', text: 'exists' },
        { to: '-getDirectories', text: 'getDirectories' },
        { to: '-getFiles', text: 'getFiles' },
        { to: '-getFileType', text: 'getFileType' },
      ],
    },
    {
      to: '/#changelog',
      text: 'changelog',
      items: [{ to: '-0.0.1', text: 'v0.0.1' }],
    },
    { to: '/#source', text: 'source' },
  ],
}