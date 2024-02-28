const opacityMap = {
  weak: 0.3,
  medium: 0.4,
  strong: 0.8,
  none: 1,
}

export default ({ opacity }) => {
  const value = (opacity && opacityMap[opacity]) || opacity
  return value ? `opacity: ${value};` : ""
}
