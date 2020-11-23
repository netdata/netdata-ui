export default ({ overflow }) => {
  if (!overflow) {
    return ""
  }

  if (typeof overflow === "string") {
    return `overflow: ${overflow};`
  }

  const { vertical = "", horizontal = "" } = overflow
  return `
    ${vertical && `overflow-y: ${vertical};`}
    ${horizontal && `overflow-x: ${horizontal};`}
  `
}
