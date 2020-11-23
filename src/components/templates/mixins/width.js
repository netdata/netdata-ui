export default ({ width }) => {
  if (typeof width === "object") {
    const { min = "", max = "" } = width
    return `
      ${min && `min-width: ${min};`}
      ${max && `max-width: ${max};`}
    `
  }

  return width && `width: ${width};`
}
