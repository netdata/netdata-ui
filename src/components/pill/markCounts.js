import React from "react"
import styled from "styled-components"
import { getColor, getSizeBy } from "@/theme"
import Dot from "./dot"
import { getPillColor } from "./mixins/colors"
import VisuallyHidden from "@/components/visuallyHidden"
import margin from "@/mixins/margin"

const Counts = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(1.25)};
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  ${margin}
`

const Count = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.625)};
  color: ${({ color, theme }) => getColor(color)({ theme })};
`

const MarkCounts = ({ counts = [], "data-testid": testId = "mark-counts", ...rest }) => (
  <Counts data-testid={testId} {...rest}>
    {counts.map(({ tone, color: customColor, dot = "filled", dotSize, count, label }) => {
      const color = customColor ?? getPillColor("softText", tone)

      return (
        <Count color={color} data-testid={`${testId}-item`} key={label}>
          <Dot color={color} data-testid={`${testId}-dot`} dot={dot} size={dotSize} />
          {count}
          <VisuallyHidden>{` ${label}`}</VisuallyHidden>
        </Count>
      )
    })}
  </Counts>
)

export default MarkCounts
