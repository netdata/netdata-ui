import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { getRgbColor } from "@/theme"
import getPillBackground from "./mixins/background"
import { getPillColor } from "./mixins/colors"
import getPillHeight from "./mixins/height"
import getPillPadding from "./mixins/padding"
import { getSoftRing } from "./mixins/soft"

// Hollow idle pills keep their hue only on a faint edge of the base tone.
const idleTone = { idleError: "error", idleWarning: "warning", idleClear: "success" }

const getPillBorderColor = ({ flavour, look, theme }) => {
  if (look === "hollow" && idleTone[flavour]) return getRgbColor(idleTone[flavour], 0.35)({ theme })
  if (look === "semi") return getPillColor("hollow", flavour)
  if (look === "soft") return getSoftRing(flavour, theme)
  return getPillColor("border", flavour)
}

export const MasterCardContainer = styled(Flex).attrs(
  ({ background, height, onClick, round = 999, size, ...props }) => ({
    background,
    ...(onClick && { cursor: "pointer" }),
    position: "relative",
    round,
    size,
    ...props,
  })
)`
  -webkit-user-select: ${({ noUserSelection }) => (noUserSelection ? "none" : "auto")};
  -ms-user-select: ${({ noUserSelection }) => (noUserSelection ? "none" : "auto")};
  user-select: ${({ noUserSelection }) => (noUserSelection ? "none" : "auto")};

  * {
    cursor: ${({ onClick }) => (onClick ? "pointer" : "inherit")};
  }
`

const cursorStyle = props => {
  if (props.onClick) return `&& { cursor: pointer; }`
  return ""
}

export const PillContainer = styled(Flex).attrs(
  ({
    round = true,
    look,
    flavour,
    borderColor,
    onClick,
    padding,
    size,
    tiny,
    height,
    position,
    zIndex,
    justifyContent = "center",
    alignItems = "center",
    background,
    theme,
    ...rest
  }) => ({
    ...(onClick && { cursor: "pointer" }),
    padding: getPillPadding(padding, size, tiny),
    height: height ?? { min: getPillHeight(null, size, tiny) },
    round: round === false ? 1 : round === true ? 7.5 : round,
    border: {
      side: "all",
      color: borderColor || getPillBorderColor({ flavour, look, theme }),
      size: "1px",
    },
    justifyContent,
    alignItems,
    position,
    zIndex,
    ...getPillBackground({ background, flavour, look }),
    theme,
    ...rest,
  })
)`
  font-variant-numeric: tabular-nums;
  ${cursorStyle}
`
