const values = new Set(["normal", "nowrap"])

export default ({ whiteSpace }) => values.has(whiteSpace) && `white-space: ${whiteSpace};`
