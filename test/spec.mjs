import { is, log } from '@magic/test'

import { default as fso } from 'fs'

import fs from '../src/index.mjs'

const fns = [
  ...Object.keys(fso),
  'readDir',
  'readfile',
  'rmDir',
  'mkdirp',
  'rmrf',
  'getFileType',
  'getDirectories',
  'getFiles',
  'getContentType',
  'getFilePath',
]

export default [
  ...fns.map(fn => ({
    fn: !fso[fn] || typeof fs[fn] === typeof fso[fn],
    info: `${fn} is a ${typeof fs[fn]}`,
  })),
  {
    fn: () => {
      let result = []
      if (fns.length > Object.keys(fs).length) {
        result = fns.filter(f => !fs.hasOwnProperty(f))

        if (result.length > 0) {
          log.warn('Spec: functions not expected', result)
        }
      } else {
        result = Object.keys(fs).filter(f => !fns.includes(f))

        if (result.length > 0) {
          log.warn('Spec: Missing Functions:', result)
        }
      }

      return result.length === 0
    },
    info: 'functions match between spec and implementation',
  },
]
