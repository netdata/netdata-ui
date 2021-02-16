export default ({ elevation }) => {
  if (!elevation) return
  if (typeof elevation !== "number") return
  return `z-index: ${elevation};`
}
