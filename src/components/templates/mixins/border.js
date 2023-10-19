import { getColor } from "@/theme"

const borderMap = {
  all: ({ size, type, color }) => `
    border: ${size} ${type} ${color};
  `,
  horizontal: ({ size, type, color }) => `
    border-top: ${size} ${type} ${color};
    border-bottom: ${size} ${type} ${color};
  `,
  vertical: ({ size, type, color }) => `
    border-left: ${size} ${type} ${color};
    border-right: ${size} ${type} ${color};
  `,
  top: ({ size, type, color }) => `
    border-top: ${size} ${type} ${color};
  `,
  right: ({ size, type, color }) => `
    border-right: ${size} ${type} ${color};
  `,
  bottom: ({ size, type, color }) => `
    border-bottom: ${size} ${type} ${color};
  `,
  left: ({ size, type, color }) => `
    border-left: ${size} ${type} ${color};
  `,
}

const getDefaults = theme => ({
  color: getColor("border")({ theme }),
  size: "1px",
  side: "all",
  type: "solid",
})

export default ({ theme, border }) => {
  if (border === undefined) {
    return ""
  }

  if (border === true) {
    return borderMap.all(getDefaults(theme))
  }

  if (border in borderMap) {
    return borderMap[border](getDefaults(theme))
  }

  if (typeof border === "string") {
    return borderMap.all({
      ...getDefaults(theme),
      color: getColor(border || "border")({ theme }),
    })
  }

  if (typeof border !== "object") {
    return ""
  }

  const { side, color } = border
  return (
    side in borderMap &&
    borderMap[side]({
      ...getDefaults(theme),
      ...border,
      color: getColor(color || "border")({ theme }),
    })
  )
}
