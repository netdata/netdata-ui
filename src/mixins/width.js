import { getDimension } from "src/mixins/margin"

const getWidthRules = ({ theme, rule, value }) => {
  const ruleValue =
    typeof value == "number"
      ? getDimension(theme, value)
      : typeof value == "string"
      ? value
      : "auto"

  return `${rule}: ${ruleValue};`
}

export default ({ theme, width, minWidth, maxWidth }) => {
  if (!width && !minWidth && !maxWidth) return "min-width: 144px;width: 100%;"

  const widthRules = []

  if (width) {
    widthRules.push(getWidthRules({ theme, rule: "width", value: width }))
  }

  if (minWidth) {
    widthRules.push(getWidthRules({ theme, rule: "min-width", value: minWidth }))
  }

  if (maxWidth) {
    widthRules.push(getWidthRules({ theme, rule: "max-width", value: maxWidth }))
  }

  return widthRules.join("")
}
