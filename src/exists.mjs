import { fs } from './fs.mjs'

export const exists = async f => {
  try {
    await fs.stat(f)
    return true
  } catch (_) {
    return false
  }
}
