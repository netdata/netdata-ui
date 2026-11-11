import styled, { css } from "styled-components"
import { getColor, getSizeBy } from "@/theme"
import Flex from "@/components/templates/flex"
import { StatusDot } from "./dot"
import { getPillColor } from "./mixins/colors"

const wordStylesBySize = {
  small: css`
    font-size: ${getSizeBy(1.5)};
    font-variant-numeric: tabular-nums;
  `,
}

const gapBySize = { small: 1 }

const Word = styled(Flex).attrs(({ alignItems = "center", gap, size }) => ({
  as: "span",
  alignItems,
  gap: gap ?? gapBySize[size] ?? 1.5,
}))`
  display: inline-flex;
  font-size: 13px;
  font-weight: ${({ strong }) => (strong ? 600 : 500)};
  white-space: nowrap;
  ${({ size }) => wordStylesBySize[size]}
`

const Detail = styled.span`
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  color: ${({ color = "textLite" }) => getColor(color)};
`

const hasContent = value => value !== undefined && value !== null && value !== false && value !== ""

const StatusWord = ({
  children,
  color: customColor,
  "data-testid": testId = "status-word",
  detail,
  detailColor,
  dot = "filled",
  dotSize,
  tone,
  ...rest
}) => {
  const color = customColor ?? getPillColor("softText", tone)

  return (
    <Word color={color} data-testid={testId} {...rest}>
      {dot && (
        <StatusDot
          color={color}
          data-testid={`${testId}-dot`}
          dot={dot}
          size={dotSize}
          tone={tone}
          data-tone={tone}
          data-hollow={
            tone === undefined ? undefined : dot === "hollow" || dot === "dashed" ? "true" : "false"
          }
        />
      )}
      {(dot !== "bar" || hasContent(children)) && <span>{children}</span>}
      {hasContent(detail) && (
        <Detail color={detailColor} data-testid={`${testId}-detail`}>
          · {detail}
        </Detail>
      )}
    </Word>
  )
}

export default StatusWord
