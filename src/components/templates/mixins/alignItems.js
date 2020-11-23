const alignItemValuesMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  baseline: "baseline",
  stretch: "stretch",
}

export default ({ alignItems }) =>
  alignItems in alignItemValuesMap ? `align-items: ${alignItemValuesMap[alignItems]};` : ""
