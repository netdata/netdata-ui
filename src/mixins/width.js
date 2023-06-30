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

  return [
    { rule: "width", value: width },
    { rule: "min-width", value: minWidth },
    { rule: "max-width", value: maxWidth },
  ]
    .reduce((acc, { rule, value }) => {
      if (value || value == 0) {
        acc.push(getWidthRules({ theme, rule, value }))
      }

      return acc
    }, [])
    .join("")
}
