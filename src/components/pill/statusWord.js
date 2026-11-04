import React from "react"
import styled from "styled-components"
import { getColor, getSizeBy } from "@/theme"
import Dot from "./dot"
import { getPillColor } from "./mixins/colors"

const Word = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ color, theme }) => getColor(color)({ theme })};
`

const Detail = styled.span`
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: ${getColor("textLite")};
`

const StatusWord = ({
  children,
  "data-testid": testId = "status-word",
  detail,
  dot = "filled",
  tone,
  ...rest
}) => {
  const color = getPillColor("softText", tone)

  return (
    <Word color={color} data-testid={testId} {...rest}>
      <Dot color={color} data-testid={`${testId}-dot`} dot={dot} />
      <span>{children}</span>
      {detail && <Detail data-testid={`${testId}-detail`}>· {detail}</Detail>}
    </Word>
  )
}

export default StatusWord
