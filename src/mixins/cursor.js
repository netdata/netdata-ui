export default ({ cursor }) => {
  if (!cursor) return ""
  return `cursor: ${cursor};`
}
