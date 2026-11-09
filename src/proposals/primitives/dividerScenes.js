import React from "react"
import Flex from "@/components/templates/flex"
import { IconButton } from "@/components/button"
import { Text, TextSmall } from "@/components/typography"
import { Section, Stack } from "../refresh/layout"
import { Card, CardTitle, Grid, Note, Sample, Strip } from "./frame"
import Divider from "./divider"
import {
  CfBillingSeparator,
  CfDotSeparator,
  CfHudDivider,
  CfMenuDivider,
  CfNodeBadgesSeparator,
  CfSeparator,
  CfSidebarDivider,
  CfSpacesSeparator,
  ChLineSeparator,
  ChMenuDivider,
} from "./today"

const Words = ({ children }) => <TextSmall color="text">{children}</TextSmall>

export const TodayDividers = () => (
  <Stack>
    <Section caption="Horizontal rules: four colours, two DOM shapes (hr border vs div background).">
      <Grid>
        <Sample name="CF components/separator" values="hr, 1px top border, borderSecondary">
          <CfSeparator />
        </Sample>
        <Sample name="CF sidebar divider" values="Flex top border, border">
          <CfSidebarDivider />
        </Sample>
        <Sample name="CF menus Divider" values="div 1px, disabled, margin 8px 16px">
          <CfMenuDivider />
        </Sample>
        <Sample name="CF spaces sidebar" values="div 1px x 24px, border">
          <CfSpacesSeparator />
        </Sample>
        <Sample name="CH modern menu Divider" values="Box 1px, borderSecondary, margin 4px 0">
          <ChMenuDivider />
        </Sample>
      </Grid>
    </Section>
    <Section caption="Vertical rules: heights hard-coded or 100%.">
      <Grid>
        <Sample name="CF billing separator" values="hr, 1px left border, borderSecondary, 100%">
          <Strip>
            <Words>Plan</Words>
            <CfBillingSeparator />
            <Words>Usage</Words>
          </Strip>
        </Sample>
        <Sample name="CF nodeBadges" values="div 1px x 20px, border">
          <Strip>
            <Words>12 nodes</Words>
            <CfNodeBadgesSeparator />
            <Words>3 offline</Words>
          </Strip>
        </Sample>
        <Sample name="CF playlist HUD" values="Box 1px x 16px, separator">
          <Strip>
            <Words>Prev</Words>
            <CfHudDivider />
            <Words>Next</Words>
          </Strip>
        </Sample>
        <Sample name="CH line separator" values="Flex 1px, borderSecondary (disabled: disabled)">
          <Strip>
            <Words>Legend</Words>
            <ChLineSeparator />
            <Words>Units</Words>
            <ChLineSeparator disabled />
            <Words>Off</Words>
          </Strip>
        </Sample>
        <Sample name="CF anomalies Separator" values="TextSmall middle dot, textLite, aria-hidden">
          <Flex gap={1} alignItems="center">
            <Words>4 anomalies</Words>
            <CfDotSeparator />
            <Words>2 nodes</Words>
            <CfDotSeparator />
            <Words>last 15m</Words>
          </Flex>
        </Sample>
      </Grid>
    </Section>
  </Stack>
)

const menuItems = [["Edit", "Duplicate"], ["Move to room", "Share link"], ["Delete"]]

const MenuContext = () => (
  <Card padding={[1, 0]} gap={0} width={50} round="6px">
    {menuItems.map((group, index) => (
      <React.Fragment key={group[0]}>
        {index ? <Divider margin={[1, 0]} /> : null}
        {group.map(label => (
          <Flex key={label} padding={[1.5, 3]}>
            <TextSmall color={label === "Delete" ? "error" : "text"}>{label}</TextSmall>
          </Flex>
        ))}
      </React.Fragment>
    ))}
  </Card>
)

const ToolbarContext = () => (
  <Flex
    alignItems="center"
    gap={1}
    padding={[1, 2]}
    round="6px"
    border={{ side: "all", color: "border" }}
  >
    <IconButton icon="search" tooltip="Search" />
    <IconButton icon="filter" tooltip="Filter" />
    <Divider vertical margin={[1, 1]} />
    <IconButton icon="zoomIn" tooltip="Zoom in" />
    <IconButton icon="zoomOut" tooltip="Zoom out" />
    <Divider vertical margin={[1, 1]} />
    <IconButton icon="download" tooltip="Download" />
    <IconButton icon="share" tooltip="Share" />
  </Flex>
)

const CardContext = () => (
  <Card width={90}>
    <CardTitle>Node overview</CardTitle>
    <Text color="textLite">ip-10-0-1-12 · Ubuntu 24.04 · agent v2.3.0</Text>
    <Divider margin={[0, -4]} />
    <Flex justifyContent="between">
      <TextSmall color="textLite">Collected metrics</TextSmall>
      <TextSmall strong>2,431</TextSmall>
    </Flex>
    <Divider color="borderSecondary" />
    <Flex justifyContent="between">
      <TextSmall color="textLite">Active alerts</TextSmall>
      <TextSmall strong>3</TextSmall>
    </Flex>
  </Card>
)

export const ProposedDividers = () => (
  <Stack>
    <Section caption='<Divider /> - div role="separator", 1px, color "border". Props: vertical, color, plus Box margin for spacing and inset.'>
      <Grid>
        <Sample name="<Divider />" values="1px, border">
          <Divider />
        </Sample>
        <Sample name='color="borderSecondary"' values="for rules inside a surface">
          <Divider color="borderSecondary" />
        </Sample>
        <Sample name="margin={[0, 4]}" values="inset 16px each side">
          <Divider margin={[0, 4]} />
        </Sample>
        <Sample name="<Divider vertical />" values="1px, stretches to the row height">
          <Strip>
            <Words>12 nodes</Words>
            <Divider vertical />
            <Words>3 offline</Words>
          </Strip>
        </Sample>
      </Grid>
    </Section>
    <Section caption="Menu: 4px above and below, full bleed.">
      <MenuContext />
    </Section>
    <Section caption="Toolbar: vertical, margin 4px, splits control groups.">
      <Flex>
        <ToolbarContext />
      </Flex>
    </Section>
    <Section caption="Card section break: full bleed with margin={[0, -4]}, then borderSecondary between rows.">
      <CardContext />
    </Section>
    <Note>
      Dot text separator not proposed: only anomalies/components/separator.js defines one (2
      importers). Elsewhere the middle dot is joined inside strings, which a component would not
      replace.
    </Note>
  </Stack>
)
