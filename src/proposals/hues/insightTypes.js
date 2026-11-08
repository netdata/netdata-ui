// Story-only replica of CF Insights type styling (report sample cards + "new report" menu), with hue options.
import React from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { Text, TextBig, TextSmall } from "@/components/typography"
import { getSizeBy } from "@/theme"

// `today` names the kit's *_colored insight icons, whose fills are baked into the SVG and ignore `color`;
// `glyph` is the closest single-colour kit icon, so a proposed colour can actually apply.
const types = [
  {
    key: "anomalies",
    group: "insights",
    title: "Anomaly Analysis",
    description: "Spots unusual behavior in your systems and explains what’s happening.",
    today: "anomalyAnalysis",
    glyph: "anomaliesLens",
    hue: "insightsPurple",
  },
  {
    key: "performance",
    group: "insights",
    title: "Performance Optimization",
    description: "Identifies when resources compete or slow each other down.",
    today: "performanceOptimization",
    glyph: "chart_gauge",
    hue: "insightsGreen",
  },
  {
    key: "capacity",
    group: "insights",
    title: "Capacity Planning",
    description: "Predicts future trends and highlights key turning points.",
    today: "capacityPlanning",
    glyph: "line_chart",
    hue: "insightsYellow",
  },
  {
    key: "summary",
    group: "insights",
    title: "Infrastructure Summary",
    description: "A quick overview of any problems and how they affect your services.",
    today: "automatedTroubleshooting",
    glyph: "view_list",
    hue: "insightsViolet",
  },
  {
    key: "investigation",
    group: "investigations",
    title: "New Investigation",
    today: "investigation",
    glyph: "search",
    hue: "insightsBlue",
  },
  {
    key: "alertInvestigation",
    group: "investigations",
    title: "Alert Investigation",
    today: "alertInvestigation",
    glyph: "alarm_bell",
    hue: "insightsRed",
  },
]

const groups = [
  { key: "insights", label: "Insights", icon: "view_list" },
  { key: "investigations", label: "Investigations", icon: "search_s" },
]

const neutralHover = { hoverBg: "menuItemHover", hoverBorder: "border" }

// Each scheme maps a type to: icon name, glyph colour, label colour and the hovered tile's surface.
export const schemes = {
  today: {
    type: ({ today, hue }) => ({
      icon: today,
      glyph: hue,
      label: hue,
      hoverBg: `${hue}Semi`,
      hoverBorder: hue,
    }),
  },
  A: {
    type: ({ glyph }) => ({ icon: glyph, glyph: "primaryAI", label: "text", ...neutralHover }),
  },
  B: {
    type: ({ key, glyph }) => ({
      icon: glyph,
      glyph: key === "alertInvestigation" ? "error" : "iconColor",
      label: "text",
      ...neutralHover,
    }),
  },
  C: {
    type: ({ glyph }) => ({ icon: glyph, glyph: "iconColor", label: "text", ...neutralHover }),
    groupIcon: { name: "ai", color: "primaryAI" },
  },
}

const CardsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(4, minmax(${getSizeBy(20)}, 1fr));
  gap: ${getSizeBy(2)};
`

const TilesGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${getSizeBy(1)};
`

const GroupHeader = ({ group, scheme }) => {
  const { name, color } = scheme.groupIcon || { name: group.icon, color: "menuItem" }
  return (
    <Flex alignItems="center" gap={2}>
      <Icon name={name} color={color} />
      <Text strong color="menuItem">
        {group.label}
      </Text>
    </Flex>
  )
}

const ReportCard = ({ type, style }) => (
  <Flex column gap={4} padding={[4]} background="panelBg" round="8px">
    <Flex alignItems="center" gap={2}>
      <Icon name={style.icon} color={style.glyph} />
      <TextBig color={style.label}>{type.title}</TextBig>
    </Flex>
    <TextSmall color="textDescription">{type.description}</TextSmall>
    <Flex justifyContent="end">
      <TextSmall color="link">Explore in demo space</TextSmall>
    </Flex>
  </Flex>
)

const MenuTile = ({ type, style, hovered }) => (
  <Flex
    height="28px"
    alignItems="center"
    justifyContent="center"
    gap={1}
    round
    background={hovered ? style.hoverBg : "panelBg"}
    border={hovered ? { side: "all", color: style.hoverBorder } : undefined}
  >
    <Icon name={style.icon} color={style.glyph} />
    <Text color={style.label}>{type.title}</Text>
  </Flex>
)

// The first tile of each group is drawn hovered so the hover surface can be judged too.
export const InsightTypes = ({ schemeKey }) => {
  const scheme = schemes[schemeKey]
  const rows = types.map(type => ({ type, style: scheme.type(type) }))

  return (
    <Flex column gap={6} width={{ max: "1040px" }}>
      <Flex column gap={3}>
        <GroupHeader group={groups[0]} scheme={scheme} />
        <CardsGrid>
          {rows
            .filter(({ type }) => type.group === "insights")
            .map(({ type, style }) => (
              <ReportCard key={type.key} type={type} style={style} />
            ))}
        </CardsGrid>
      </Flex>
      <Flex gap={6} width={{ max: "560px" }} column>
        {groups.map(group => (
          <Flex key={group.key} column gap={4}>
            <GroupHeader group={group} scheme={scheme} />
            <TilesGrid>
              {rows
                .filter(({ type }) => type.group === group.key)
                .map(({ type, style }, index) => (
                  <MenuTile key={type.key} type={type} style={style} hovered={index === 0} />
                ))}
            </TilesGrid>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
