import React from "react"
import styled from "styled-components"
import { getColor, getSizeBy } from "@/theme"

const inkOf = ({ color, theme }) => getColor(color)({ theme })

const DotBase = styled.span.attrs({ "aria-hidden": "true" })`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: ${getSizeBy(0.875)};
  height: ${getSizeBy(0.875)};
  border-radius: 50%;
`

const FilledDot = styled(DotBase)`
  background-color: ${inkOf};
`

const HollowDot = styled(DotBase)`
  border: 1.5px solid ${inkOf};
`

// `true` and "filled" draw a solid dot; "hollow" draws a ring.
const Dot = ({ dot = true, ...rest }) =>
  dot === "hollow" ? <HollowDot {...rest} /> : <FilledDot {...rest} />

export default Dot
