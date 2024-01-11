import styled from "styled-components"
import alignItems from "@/components/templates/mixins/alignItems"
import alignContent from "@/components/templates/mixins/alignContent"
import justifyContent from "@/components/templates/mixins/justifyContent"
import getMarginDimensions from "./mixins/getMarginDimensions"

const getCalc = (from, to) => {
  if (from !== "0" && to !== "0") return `calc((100% - ${from}) - ${to})`
  if (from === "0" && to === "0") return `100%`

  return `calc(100% - ${from === "0" ? to : from})`
}

const maxHeight = ({ marginDimensions: { top, bottom } }) => `max-height: ${getCalc(top, bottom)};`
const maxWidth = ({ marginDimensions: { right, left } }) => `max-width: ${getCalc(left, right)};`

const hCenterAlignPositions = new Set(["top", "center", "bottom"])
const leftAlignPositions = new Set(["bottom-left", "left", "top-left"])

const styledLeft = ({ position, full, marginDimensions }) => {
  if (full === "horizontal" || full === true || leftAlignPositions.has(position)) {
    return `left: ${marginDimensions.left};`
  }

  if (hCenterAlignPositions.has(position)) {
    return `left: 50%;`
  }

  return ""
}

const vCenterAlignPositions = new Set(["right", "center", "left"])
const topAlignPositions = new Set(["top-left", "top", "top-right"])

const styledTop = ({ position, full, marginDimensions }) => {
  if (full === "vertical" || full === true || topAlignPositions.has(position)) {
    return `top: ${marginDimensions.top};`
  }

  if (vCenterAlignPositions.has(position)) {
    return `top: 50%;`
  }

  return ""
}

const rightAlignPositions = new Set(["top-right", "right", "bottom-right"])
const styledRight = ({ position, full, marginDimensions }) => {
  if (full === "horizontal" || full === true || rightAlignPositions.has(position)) {
    return `right: ${marginDimensions.right};`
  }

  return ""
}

const bottomAlignPositions = new Set(["bottom-right", "bottom", "bottom-left"])
const styledBottom = ({ position, full, marginDimensions }) => {
  if (full === "vertical" || full === true || bottomAlignPositions.has(position)) {
    return `bottom: ${marginDimensions.bottom};`
  }

  return ""
}

const transform = ({ full, position }) => {
  const getValue = () => {
    const left = full !== true && full !== "horizontal" && hCenterAlignPositions.has(position)
    const top = full !== true && full !== "vertical" && vCenterAlignPositions.has(position)

    if (!left && !top) return ""
    if (left && !top) return "translateX(-50%)"
    if (!left && top) return "translateY(-50%)"

    return "translate(-50%, -50%)"
  }

  const value = getValue()
  return value && `transform: ${value};`
}

const boxShadow = ({ borderShadow }) =>
  borderShadow && "box-shadow: 0px 2px 68px rgba(0, 0, 0, 0.288);"

const zIndex = ({ zIndex = 35 }) => `z-index: ${zIndex};`

const Container = styled.div.attrs(({ theme, margin }) => ({
  marginDimensions: getMarginDimensions(theme, margin),
}))`
  position: ${({ isAbsolute }) => (isAbsolute ? "absolute" : "fixed")};
  display: flex;
  outline: none;
  pointer-events: all;

  ${alignItems}
  ${alignContent}
  ${justifyContent}

  ${maxHeight}
  ${maxWidth}
  ${styledTop}
  ${styledRight}
  ${styledBottom}
  ${styledLeft}
  ${transform}

  ${boxShadow}
  ${zIndex}
`

export default Container
