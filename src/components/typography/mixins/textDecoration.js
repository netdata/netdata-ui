const textDecorations = new Set(["underline", "none", "line-through"])

export default ({ textDecoration }) => textDecorations.has(textDecoration) && `text-decoration: ${textDecoration};`
