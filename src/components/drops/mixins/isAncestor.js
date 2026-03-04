import getAncestors from "./getAncestors"

export default (parent, target) => {
  const ancestors = getAncestors(target)
  if (ancestors.length === 0) return false
  return ancestors.some(node => node === parent)
}
