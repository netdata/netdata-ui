const alignContentMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  stretch: "stretch",
}

export default ({ alignContent }) =>
  alignContent in alignContentMap ? `align-content: ${alignContentMap[alignContent]};` : ""
