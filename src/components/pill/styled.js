import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { getOrElse, getRgbColor, getSizeBy } from "@/theme"
import { FONT_MONOSPACE } from "@/theme/default/constants"
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
  ({ background, onClick, round = 999, size, ...props }) => ({
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

const appearanceStyles = {
  subtle: css`
    border: 0;
    background: color-mix(
      in srgb,
      currentColor ${({ theme }) => theme.constants.PILL_SUBTLE_TINT},
      transparent
    );
    box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 22%, transparent);
  `,
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
  font-variant-numeric: ${({ wrapChildren }) =>
    wrapChildren === false ? "inherit" : "tabular-nums"};
  ${({ monospace }) =>
    monospace &&
    css`
      font-family: ${getOrElse(["constants", "FONT_MONOSPACE"], FONT_MONOSPACE)};
    `}
  ${props =>
    props.fontSize !== undefined &&
    css`
      font-size: ${typeof props.fontSize === "number"
        ? getSizeBy(props.fontSize / 2)(props)
        : props.fontSize};
    `}
  ${({ fontWeight }) =>
    fontWeight !== undefined &&
    css`
      font-weight: ${fontWeight};
    `}
  ${({ lineHeight }) =>
    lineHeight !== undefined &&
    css`
      line-height: ${lineHeight};
    `}
  ${cursorStyle}
  ${({ appearance }) => appearanceStyles[appearance]}
`
