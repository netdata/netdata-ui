// Faithful copies of today's cloud-frontend (CF) and charts (CH) dividers, dots and skeletons.
// Raw px values, local keyframes and ad-hoc colours are kept on purpose, for comparison only.
// They live only in this proposal file and must not be copied into src/components.
import React from "react"
import styled, { css } from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { TextSmall } from "@/components/typography"
import { getColor, getSizeBy } from "@/theme"

// CF components/separator/index.js:3
export const CfSeparator = ({ vertical, color = "borderSecondary", ...props }) => (
  <Box
    as="hr"
    height={vertical ? "100%" : "1px"}
    {...(!vertical ? { width: "100%" } : {})}
    sx={{
      borderWidth: vertical ? "0px 0px 0px 1px" : "1px 0px 0px 0px",
      borderColor: color,
      borderStyle: "solid",
    }}
    {...props}
  />
)

// CF components/navigation/sidebar/divider.js:3
export const CfSidebarDivider = props => (
  <Flex flex={false} border={{ side: "top", color: "border" }} {...props} />
)

// CF components/menus/styled.js:4
export const CfMenuDivider = styled.div`
  background: ${getColor("disabled")};
  height: 1px;
  width: auto;
  margin: ${getSizeBy(1)} ${getSizeBy(2)};
`

// CF domains/spaces/components/billing/separator.js:3 (vertical)
export const CfBillingSeparator = props => (
  <Box
    as="hr"
    height="100%"
    sx={{ borderWidth: "0px 0px 0px 1px", borderColor: "borderSecondary", borderStyle: "solid" }}
    {...props}
  />
)

// CF domains/spaces/components/sidebar/spaces/components/separator.js:4
export const CfSpacesSeparator = styled.div`
  height: 1px;
  width: ${getSizeBy(3)};
  background: ${getColor("border")};
`

// CF domains/rooms/components/room-overview/header/nodeBadges/styled.js:4
export const CfNodeBadgesSeparator = styled.div`
  background: ${getColor("border")};
  height: 20px;
  width: 1px;
`

// CF domains/dashboards/components/playlists/player/hud.js:46
export const CfHudDivider = styled(Box).attrs({
  width: "1px",
  height: "16px",
  background: "separator",
})``

// CF domains/anomalies/components/separator.js:3
export const CfDotSeparator = () => (
  <TextSmall aria-hidden="true" color="textLite">
    ·
  </TextSmall>
)

// CH components/line/separator.js:4
export const ChLineSeparator = ({ disabled }) => (
  <Flex width="1px" background={disabled ? "disabled" : "borderSecondary"} />
)

// CH components/modern/menu.js:80
export const ChMenuDivider = () => <Box margin={[1, 0]} height="1px" background="borderSecondary" />

// CF domains/spaces/components/mcpConnections/listView/statusDot.js:5 (colour from statusPropsByHealthStatus)
export const CfMcpStatusDot = ({ color }) => (
  <Box width="8px" height="8px" round="50%" background={color} />
)

// CF alertsSelector/alertsList/statusDot.js:4 and alertNameCell.js:9 (colour from alertPill colors)
export const CfAlertStatusDot = ({ color }) => (
  <Flex alignItems="center" justifyContent="center">
    <Box width="8px" height="8px" round="50%" background={color} />
  </Flex>
)

// CF domains/alerts/components/indicators.js:4-21 (round: 1 on an 8px box = 4px radius)
export const CfErrorIndicator = styled(Flex).attrs({
  flex: { grow: 0, shrink: 0 },
  width: 2,
  height: 2,
  margin: [0, 1, 0, 0],
  round: 1,
  background: "error",
})``
export const CfWarningIndicator = styled(CfErrorIndicator).attrs({ background: "warning" })``
export const CfUnreachableIndicator = styled(CfErrorIndicator).attrs({ background: "textLite" })``

// CF domains/insights/components/styled.js:145 (6px, optional 1.6s 0-1-0 opacity blink)
const blinkingMixin = css`
  animation: ${({ isBlinking }) => (isBlinking ? `cfBlinking 1.6s ease-in infinite` : "")};
  @keyframes cfBlinking {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
export const CfReportStatusDot = styled(Box).attrs(props => ({
  width: "6px",
  height: "6px",
  round: "50%",
  ...props,
}))`
  ${blinkingMixin}
`

// CF inline boxes, e.g. <Box width="6px" height="6px" round="50%" background="success" />
export const CfInlineDot = ({ px = 6, color }) => (
  <Box width={`${px}px`} height={`${px}px`} round="50%" background={color} />
)

// CH components/modern/dot.js:5 (size 2 = 8px, radius.pill = 999px)
export const ChDot = styled(Box).attrs(({ size = 2 }) => ({
  as: "span",
  width: size,
  height: size,
  round: "999px",
}))`
  flex: none;
`
