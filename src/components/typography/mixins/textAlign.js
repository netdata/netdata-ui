const textAligns = new Set(["left", "center", "right"])

export default ({ textAlign }) => textAligns.has(textAlign) && `text-align: ${textAlign};`
