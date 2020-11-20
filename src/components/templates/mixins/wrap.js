const getWrap = flexWrap => {
  if (flexWrap === true) {
    return "wrap"
  }

  if (flexWrap === false) {
    return "nowrap"
  }

  return flexWrap === "reverse" ? flexWrap : ""
}

export default ({ flexWrap }) => {
  const value = getWrap(flexWrap)
  return value && `flex-wrap: ${value};`
}
