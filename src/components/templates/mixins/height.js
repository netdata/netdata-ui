export default ({ height }) => {
  if (typeof height === "object") {
    const { min = "", max = "" } = height
    return `
      ${min && `min-height: ${min};`}
      ${max && `max-height: ${max};`}
    `
  }

  return height && `height: ${height};`
}
