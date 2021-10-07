const values = new Set(["normal", "nowrap", "pre-line"])

export default ({ whiteSpace }) => values.has(whiteSpace) && `white-space: ${whiteSpace};`
