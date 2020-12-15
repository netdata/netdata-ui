export default node => {
  const ancestors = []

  node = node.parentNode
  while (node) {
    ancestors.push(node)
    node = node.parentNode
  }

  return ancestors
}
