const getRadius = (baseUnit, round) => {
  if (round === true) return `${baseUnit}px`

  if (typeof round === "number") return `${baseUnit * round}px`

  if (typeof round === "string") return round

  return ""
}

const topLeft = (baseUnit, size) => `border-top-left-radius: ${getRadius(baseUnit, size)};`
const topRight = (baseUnit, size) => `border-top-right-radius: ${getRadius(baseUnit, size)};`
const bottomLeft = (baseUnit, size) => `border-bottom-left-radius: ${getRadius(baseUnit, size)};`
const bottomRight = (baseUnit, size) => `border-bottom-right-radius: ${getRadius(baseUnit, size)};`

const radiusMap = {
  top: (baseUnit, size) => `
    ${topLeft(baseUnit, size)}
    ${topRight(baseUnit, size)}
  `,
  left: (baseUnit, size) => `
    ${topLeft(baseUnit, size)}
    ${bottomLeft(baseUnit, size)}
  `,
  bottom: (baseUnit, size) => `
    ${bottomLeft(baseUnit, size)}
    ${bottomRight(baseUnit, size)}
  `,
  right: (baseUnit, size) => `
    ${topRight(baseUnit, size)}
    ${bottomRight(baseUnit, size)}
  `,
  "top-left": topLeft,
  "top-right": topRight,
  "bottom-left": bottomLeft,
  "bottom-right": bottomRight,
}

export default ({
  theme: {
    constants: { SIZE_SUB_UNIT: baseUnit },
  },
  round,
}) => {
  if (!round) return ""

  const value = getRadius(baseUnit, round)
  if (value) return `border-radius: ${value};`

  const { side, size = 1 } = round
  return side in radiusMap ? `${radiusMap[side](baseUnit, size)}` : ""
}
