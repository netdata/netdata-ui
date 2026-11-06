import React from "react"
import styled from "styled-components"
import { getColor } from "@/theme"
import Flex from "@/components/templates/flex"
import Dot from "./dot"
import { getPillColor } from "./mixins/colors"

const Word = styled(Flex).attrs(({ alignItems = "center", gap = 1.5 }) => ({
  as: "span",
  alignItems,
  gap,
}))`
  display: inline-flex;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
`

const Detail = styled.span`
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: ${getColor("textLite")};
`

const hasDetail = detail =>
  detail !== undefined && detail !== null && detail !== false && detail !== ""

const StatusWord = ({
  children,
  color: customColor,
  "data-testid": testId = "status-word",
  detail,
  dot = "filled",
  tone,
  ...rest
}) => {
  const color = customColor ?? getPillColor("softText", tone)

  return (
    <Word color={color} data-testid={testId} {...rest}>
      <Dot color={color} data-testid={`${testId}-dot`} dot={dot} />
      <span>{children}</span>
      {hasDetail(detail) && <Detail data-testid={`${testId}-detail`}>· {detail}</Detail>}
    </Word>
  )
}

export default StatusWord
