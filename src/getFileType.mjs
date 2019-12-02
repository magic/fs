import path from 'path'

export const getFileType = name =>
  !name || !name.includes('.') ? 'txt' : path.extname(name).substring(1)
