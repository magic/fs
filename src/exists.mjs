export const exists = async f => {
  try {
    await fs.stat(f)
    return true
  } catch (e) {
    return false
  }
}
