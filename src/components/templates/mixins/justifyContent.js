const justifyContentMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  stretch: "stretch",
}

export default ({ justifyContent }) =>
  justifyContent in justifyContentMap
    ? `justify-content: ${justifyContentMap[justifyContent]};`
    : ""
