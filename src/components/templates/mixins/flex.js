const getFlex = (flex, basis = "auto") => {
  if (flex === true) {
    return `1 1 ${basis}`
  }

  if (flex === false) {
    return `0 0 ${basis}`
  }

  if (flex === "grow") {
    return `1 0 ${basis}`
  }

  if (flex === "shrink") {
    return `0 1 ${basis}`
  }

  if (typeof flex === "number") {
    return `${flex} 0 ${basis}`
  }

  if (typeof flex !== "object") {
    return flex
  }

  const { grow, shrink } = flex
  return `${grow} ${shrink} ${basis}`
}

export default ({ flex, basis }) => {
  if (flex === undefined && basis === undefined) {
    return ""
  }

  if (basis && flex === undefined) {
    return `flex-basis: ${basis};`
  }

  const flexValue = getFlex(flex, basis)
  return flexValue ? `flex: ${flexValue};` : ""
}
