export default ({ zIndex }) => {
  if (!zIndex) return
  if (typeof zIndex !== "number") return
  return `z-index: ${zIndex};`
}
