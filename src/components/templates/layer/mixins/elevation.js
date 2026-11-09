import { getColor, getRgbColor, getSizeBy } from "@/theme/utils"

// Luminance of mainBackground, so custom themes built on either palette pick the right scrim.
export const isDarkTheme = props => {
  const hex = getColor("mainBackground")(props)
  if (typeof hex !== "string" || !hex.startsWith("#")) return false

  const value = parseInt(hex.slice(1), 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255

  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 128
}

// Single floating-layer shadow shared by Layer, Modal, ConfirmationDialog and PortalSidebar.
export const modalShadow = props => {
  const color = getColor("dropdownShadow")(props)
  return `0 16px 40px -8px ${color}, 0 2px 6px ${color}`
}

export const dialogShadow = props =>
  `0 ${getSizeBy(2)(props)} ${getSizeBy(6)(props)} ${getRgbColor("onColorDark", isDarkTheme(props) ? 0.5 : 0.2)(props)}`

// A plain black wash barely dims the dark app, so dark gets a denser near-black scrim.
export const scrimColor = props =>
  isDarkTheme(props)
    ? getRgbColor(["neutral", "grey10"], 0.6)(props)
    : getRgbColor(["neutral", "limedSpruce"], 0.32)(props)

// Same recipe as modalShadow, rotated so a viewport-edge panel casts toward the page content.
export const sidePanelShadow = props => {
  const color = getColor("dropdownShadow")(props)
  const sign = props.side === "right" ? "-" : ""
  return `${sign}16px 0 40px -8px ${color}, ${sign}2px 0 6px ${color}`
}
