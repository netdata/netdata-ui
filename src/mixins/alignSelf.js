const alignSelfMap = {
  end: "flex-end",
  start: "flex-start",
  center: "center",
  stretch: "stretch",
}

export default ({ alignSelf }) =>
  alignSelf in alignSelfMap && `align-self: ${alignSelfMap[alignSelf]};`
