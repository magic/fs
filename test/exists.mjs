import fs from '../src/index.mjs'

export default [
  { fn: async () => await fs.exists(process.cwd()), info: 'fs.exists returns true for cwd' },
  { fn: async () => await fs.exists('/path/that/probably/doesnt/exist/'), expect: false, info: 'fs.exists returns false for bogus dir' },
]
