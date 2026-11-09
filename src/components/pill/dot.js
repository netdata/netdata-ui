import React from "react"
import styled from "styled-components"
import { getColor, getSizeBy } from "@/theme"
import { getPillColor } from "./mixins/colors"

const inkOf = ({ color, theme }) => getColor(color)({ theme })

const DotBase = styled.span.attrs({ "aria-hidden": "true" })`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: ${({ size = 1.75 }) => getSizeBy(size / 2)};
  height: ${({ size = 1.75 }) => getSizeBy(size / 2)};
  border-radius: 50%;
`

const FilledDot = styled(DotBase)`
  background-color: ${inkOf};
`

const HollowDot = styled(DotBase)`
  border: 1.5px solid ${inkOf};
`

const DashedDot = styled(DotBase)`
  border: 1.5px dashed ${inkOf};
`

const BarDot = styled(FilledDot)`
  width: ${getSizeBy(0.375)};
  height: ${getSizeBy(1.375)};
  border-radius: ${getSizeBy(0.5)};
`

const componentsByDot = { hollow: HollowDot, dashed: DashedDot, bar: BarDot }

const Dot = ({ dot = true, ...rest }) => {
  const Component = componentsByDot[dot] || FilledDot
  return <Component {...rest} />
}

export const StatusDot = ({ color, dot = "filled", tone = "muted", ...rest }) => (
  <Dot
    color={color ?? getPillColor("softText", tone)}
    dot={dot}
    data-tone={tone}
    data-hollow={dot === "hollow" || dot === "dashed" ? "true" : "false"}
    {...rest}
  />
)

export default Dot
