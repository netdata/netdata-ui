const values = new Set(["normal", "nowrap", "pre-line", "pre-wrap"])

export default ({ whiteSpace }) => values.has(whiteSpace) && `white-space: ${whiteSpace};`
