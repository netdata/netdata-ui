import styled, { css } from "styled-components"
import { getColor } from "src/theme"
import alignSelf from "src/mixins/alignSelf"
import margin from "src/mixins/margin"
import padding from "src/mixins/padding"
import textTransform from "src/mixins/textTransform"
import textAlign from "./mixins/textAlign"
import textDecoration from "./mixins/textDecoration"
import truncate from "./mixins/truncate"
import whiteSpace from "./mixins/whiteSpace"
import wordBreak from "./mixins/wordBreak"
import opacity from "src/mixins/opacity"

const makeFontSize = size => () => `font-size: ${size};`
const makeLineHeight = size => () => `line-height: ${size};`
const makeFontWeight =
  defaultStrong =>
  ({ strong = defaultStrong }) =>
    `font-weight: ${strong ? "bold" : "normal"};`
export const fontColor = ({ theme, color = "text" }) => `color: ${getColor(color)({ theme })};`

const typography = css`
  ${fontColor}
  ${alignSelf}
  ${textAlign}
  ${textDecoration}
  ${textTransform}
  ${truncate}
  ${whiteSpace}
  ${wordBreak}  
  ${margin}
  ${padding}
  ${opacity}
`

export const makeTypography = (Component, { fontSize, lineHeight, strong }) => styled(Component)`
  font-family: "IBM Plex Sans", sans-serif;
  font-style: normal;
  ${makeFontSize(fontSize)}
  ${makeLineHeight(lineHeight)}
  ${makeFontWeight(strong)}
  ${typography}
`
export const makeH0 = Component =>
  makeTypography(Component, {
    fontSize: "26px",
    lineHeight: "32px",
    strong: true,
  })

export const makeH1 = Component =>
  makeTypography(Component, {
    fontSize: "24px",
    lineHeight: "28px",
    strong: true,
  })

export const makeH2 = Component =>
  makeTypography(Component, {
    fontSize: "22px",
    lineHeight: "24px",
    strong: true,
  })

export const makeH3 = Component =>
  makeTypography(Component, {
    fontSize: "20px",
    lineHeight: "24px",
    strong: true,
  })

export const makeH4 = Component =>
  makeTypography(Component, {
    fontSize: "16px",
    lineHeight: "21px",
    strong: true,
  })

export const makeH5 = Component =>
  makeTypography(Component, {
    fontSize: "14px",
    lineHeight: "18px",
    strong: true,
  })

export const makeH6 = Component =>
  makeTypography(Component, {
    fontSize: "12px",
    lineHeight: "14px",
    strong: true,
  })

// Text

export const makeFemto = Component =>
  makeTypography(Component, {
    fontSize: "8px",
    lineHeight: "10px",
  })

export const makeNano = Component =>
  makeTypography(Component, {
    fontSize: "10px",
    lineHeight: "13px",
  })

export const makeMicro = Component =>
  makeTypography(Component, {
    fontSize: "11px",
    lineHeight: "14px",
  })

export const makeSmall = Component =>
  makeTypography(Component, {
    fontSize: "12px",
    lineHeight: "16px",
  })

export const makeText = Component =>
  makeTypography(Component, {
    fontSize: "14px",
    lineHeight: "20px",
  })

export const makeBig = Component =>
  makeTypography(Component, {
    fontSize: "16px",
    lineHeight: "18px",
  })

export const makeBigger = Component =>
  makeTypography(Component, {
    fontSize: "24px",
    lineHeight: "32px",
  })

export const makeHuge = Component =>
  makeTypography(Component, {
    fontSize: "36px",
    lineHeight: "44px",
  })
