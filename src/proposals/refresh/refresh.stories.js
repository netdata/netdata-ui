import React, { useState } from "react"
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import Box from "@/components/templates/box"
import { Button, IconButton, ButtonGroup } from "@/components/button"
import Search from "@/components/search"
import Select from "@/components/select"
import Pill from "@/components/pill"
import { Tabs, Tab } from "@/components/tabs"
import { Text, TextSmall } from "@/components/typography"
import { getColor } from "@/theme"
import { DyncfgVars } from "../pr5951/tokens"
import { IconAction, onRovingKeyDown } from "../pr5951/actions"
import { Compare, Row, Section, Stack } from "./layout"
import { DensityButton, DensityIconButton, DensitySearch, DensitySelect } from "./density"
import { MarkCounts, SoftPill, StatusWord } from "./pills"
import { ContainedTabs, SegmentedPicker, slotLabel } from "./tabs"

export default {
  title: "Proposals/Refresh",
  parameters: { layout: "padded" },
}

const statusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Critical", value: "critical" },
  { label: "Warning", value: "warning" },
  { label: "Clear", value: "clear" },
]

const TodayToolbar = ({ large }) => (
  <Row>
    <Box width={48}>
      <Search placeholder="Search alerts" {...(large ? { height: 8 } : {})} />
    </Box>
    <Box width={40}>
      <Select options={statusOptions} defaultValue={statusOptions[1]} />
    </Box>
    <Button flavour="hollow" label="Silence all" large={large} />
    <Button label="New alert" large={large} />
    <IconButton icon="refresh" tooltip="Refresh" large={large} />
    <IconButton icon="gear" tooltip="Alert settings" large={large} />
  </Row>
)

const ProposedToolbar = ({ density }) => (
  <Row>
    <DensitySearch density={density} placeholder="Search alerts" />
    <DensitySelect density={density} options={statusOptions} defaultValue={statusOptions[1]} />
    <DensityButton density={density} flavour="hollow" label="Silence all" />
    <DensityButton density={density} label="New alert" />
    <DensityIconButton density={density} icon="refresh" tooltip="Refresh" />
    <DensityIconButton density={density} icon="gear" tooltip="Alert settings" />
  </Row>
)

export const ControlDensity = () => (
  <Compare
    todayNote="Real Search, Select, Button, IconButton as shipped."
    proposedNote="Simulation: styled wrappers over the same components override height, text and padding."
    today={
      <Stack>
        <Section caption="Default: 24px tall · 12px text · buttons 12px side padding · field 8px inset (text after the 14px icon at 28px) · Select 24px">
          <TodayToolbar />
        </Section>
        <Section caption="Large: Button large 32px · 16px text · 16px padding; Search via height prop 32px, text stays 12px; Select has no large size (stays 24px); IconButton large 32px square">
          <TodayToolbar large />
        </Section>
      </Stack>
    }
    proposed={
      <Stack>
        <Section caption="Default 28px · 13px text · buttons 12px side padding · fields 10px text inset · icon buttons 28px square, 16px icon">
          <ProposedToolbar density="default" />
        </Section>
        <Section caption="Large 32px · 14px text · buttons 16px padding · fields 12px inset (text and padding are a suggestion; only the 32px height is set)">
          <ProposedToolbar density="large" />
        </Section>
        <Section caption="Compact 24px · 12px text · buttons 12px padding · fields 8px inset · 14px icon: today's values, kept for dense table toolbars">
          <ProposedToolbar density="compact" />
        </Section>
      </Stack>
    }
  />
)

const flavours = [
  ["success", "Clear"],
  ["warning", "Warning"],
  ["error", "Critical"],
  ["neutral", "Silenced"],
  ["stale", "Stale"],
]

const toneLabels = [...flavours, ["muted", "Disabled"]]

const PillRow = props => (
  <Row>
    {flavours.map(([flavour, label]) => (
      <Pill key={flavour} flavour={flavour} {...props}>
        {label}
      </Pill>
    ))}
  </Row>
)

const SoftRow = props => (
  <Row>
    {toneLabels.map(([tone, label]) => (
      <SoftPill key={tone} tone={tone} {...props}>
        {label}
      </SoftPill>
    ))}
  </Row>
)

const pillSizes = [
  ["tiny", "14px · 10px text"],
  ["small", "18px · 11px text"],
  ["default", "20px · 12px text"],
  ["large", "24px · 13px text"],
]

const NodeLine = ({ children }) => (
  <Flex alignItems="center" gap={3}>
    <Text strong>web-prod-01</Text>
    <TextSmall color="textLite">system.cpu</TextSmall>
    {children}
  </Flex>
)

export const PillTones = () => (
  <Compare
    todayNote="Real Pill. Flavours: success/clear, warning, error/critical, neutral, stale. No muted tone."
    proposedNote="Built from theme tokens: fill = <tone>Semi (stale: 14% stale, neutral: neutralHighlight), ring = 1px tone at 35%, text = tone."
    today={
      <Stack>
        <Section caption="Filled (default 20px · 12px text · 8px padding)">
          <PillRow />
        </Section>
        <Section caption="Hollow: 1px tone border, transparent fill">
          <PillRow hollow />
        </Section>
        <Section caption="Hollow + semi: <tone>Semi fill and border, tone text">
          <PillRow hollow semi />
        </Section>
        <Section caption="Sizes (filled): tiny 14px · small 18px · default 20px · large 24px">
          <Row>
            <Pill flavour="error" tiny>
              Critical
            </Pill>
            <Pill flavour="error" size="small">
              Critical
            </Pill>
            <Pill flavour="error">Critical</Pill>
            <Pill flavour="error" size="large">
              Critical
            </Pill>
          </Row>
        </Section>
      </Stack>
    }
    proposed={
      <Stack>
        <Section caption="soft: tinted fill + 1px tinted ring + tone text, weight 500">
          <SoftRow />
        </Section>
        <Section caption="soft + leading dot: 7px filled dot, 6px gap">
          <SoftRow dot />
        </Section>
        <Section caption="soft + hollow dot (1.5px ring): pending / not yet confirmed">
          <SoftRow dot hollowDot />
        </Section>
        <Section caption="Sizes on the same ladder: tiny 14 · small 18 · default 20 · large 24">
          <Row>
            {pillSizes.map(([size, note]) => (
              <SoftPill key={size} tone="error" size={size} dot>
                {`Critical ${note.split(" ")[0]}`}
              </SoftPill>
            ))}
          </Row>
        </Section>
        <Section caption="Status word, no container: 7px dot + 13px word (500) + muted detail (400)">
          <Flex column gap={2}>
            <StatusWord tone="success" label="Running" detail="4 collectors" />
            <StatusWord tone="error" label="Critical" detail="since 14:02 · 97.3%" />
            <StatusWord tone="warning" label="Warning" detail="iowait 18%" />
            <StatusWord tone="stale" hollow label="Stale" detail="last seen 3m ago" />
            <StatusWord tone="muted" hollow label="Disabled" />
          </Flex>
        </Section>
        <Section caption="Mark counts: 7px dot + number, 12px tabular, 10px between groups">
          <NodeLine>
            <MarkCounts
              counts={[
                { tone: "error", count: 3, label: "critical" },
                { tone: "warning", count: 7, label: "warning" },
                { tone: "success", count: 128, label: "clear" },
                { tone: "stale", hollow: true, count: 2, label: "stale" },
              ]}
            />
          </NodeLine>
        </Section>
      </Stack>
    }
  />
)

const sections = [
  { label: "Overview", value: "overview" },
  { label: "Nodes", value: "nodes" },
  { label: "Alerts", value: "alerts" },
  { label: "Anomalies", value: "anomalies" },
]

const ranges = [
  { label: "15m", value: "15m" },
  { label: "1h", value: "1h" },
  { label: "6h", value: "6h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
]

const TodayCounter = ({ label, count, active }) => (
  <Flex alignItems="center" gap={1.5}>
    <TextSmall color={active ? "primary" : "text"}>{label}</TextSmall>
    <Pill size="small" flavour="neutral" color={active ? "main" : "text"}>
      {count}
    </Pill>
  </Flex>
)

export const TabsVariants = () => {
  const [section, setSection] = useState("nodes")
  const [range, setRange] = useState("1h")
  const [todayRange, setTodayRange] = useState("1h")

  return (
    <Compare
      todayNote="Real Tabs (line) and ButtonGroup (RadioButtons)."
      proposedNote="contained = a track with the active item raised. The same track drives tabs (role tablist) and value pickers (role radiogroup)."
      today={
        <Stack>
          <Section caption="Line tabs: 32px tall · 16px text · 12px padding · 2px primary underline">
            <Tabs selected={1}>
              {sections.map(({ label }) => (
                <Tab key={label} label={label} />
              ))}
            </Tabs>
          </Section>
          <Section caption="Line tabs with counts today: green label + neutral small Pill (18px)">
            <Tabs selected={0}>
              <Tab
                label={({ active }) => <TodayCounter label="Nodes" count={128} active={active} />}
              />
              <Tab
                label={({ active }) => <TodayCounter label="Alerts" count={10} active={active} />}
              />
              <Tab
                label={({ active }) => (
                  <TodayCounter label="Metrics" count={2140} active={active} />
                )}
              />
            </Tabs>
          </Section>
          <Section caption="ButtonGroup value picker: 24px joined buttons; selected = filled green, others neutral hollow">
            <ButtonGroup items={ranges} value={todayRange} onChange={setTodayRange} />
          </Section>
        </Stack>
      }
      proposed={
        <Stack>
          <Section caption="contained tabs: track 3px padding, 4px radius, 1px borderSecondary, 12% textLite tint · items 22px · 13px · 10px padding · active raised on dropdown surface + 1px border ring, weight 600">
            <ContainedTabs
              label="Room sections"
              items={sections}
              value={section}
              onChange={setSection}
            />
          </Section>
          <Section caption="Line tabs with slots (real Tab, label render-prop): 16px icon · 13px label · muted 12px tabular count · optional 'of N' and status dot + count">
            <Tabs selected={0}>
              <Tab label={slotLabel({ icon: "nodes", label: "Nodes", count: 128 })} />
              <Tab
                label={slotLabel({
                  icon: "alarm",
                  label: "Alerts",
                  count: 10,
                  tick: { tone: "error", count: 3 },
                })}
              />
              <Tab label={slotLabel({ icon: "charts", label: "Metrics", count: 2140, of: 3056 })} />
            </Tabs>
          </Section>
          <Section caption="Segmented value picker on the same track (22px items, 13px)">
            <SegmentedPicker label="Time range" items={ranges} value={range} onChange={setRange} />
          </Section>
          <Section caption="Small track for toolbars: 18px items · 12px text">
            <Row>
              <SegmentedPicker
                label="Time range"
                items={ranges}
                value={range}
                onChange={setRange}
                size="small"
              />
              <ContainedTabs
                label="View"
                size="small"
                items={[
                  { label: "Charts", value: "charts", icon: "charts" },
                  { label: "Table", value: "table", icon: "dashboard" },
                ]}
                value="charts"
                onChange={() => {}}
              />
            </Row>
          </Section>
        </Stack>
      }
    />
  )
}

const toolbarActions = [
  { icon: "refresh", label: "Refresh alerts" },
  { icon: "filter", label: "Filter by node" },
  { icon: "download", label: "Export alerts" },
  { icon: "gear", label: "Alert settings" },
]

const RovingToolbar = () => {
  const [focused, setFocused] = useState(0)
  return (
    <Flex role="toolbar" aria-label="Alerts actions" gap={1} alignItems="center">
      {toolbarActions.map(({ icon, label }, index) => (
        <IconAction
          key={icon}
          icon={icon}
          label={label}
          data-roving
          tabIndex={index === focused ? 0 : -1}
          onKeyDown={event =>
            onRovingKeyDown({ event, index, count: toolbarActions.length, onMove: setFocused })
          }
        />
      ))}
    </Flex>
  )
}

// Dashed frame marks the hit area, since both buttons are borderless at rest.
const Bounds = styled(Flex)`
  display: inline-flex;
  outline: 1px dashed ${getColor("border")};
`

const Labeled = ({ note, children }) => (
  <Flex column gap={1} alignItems="center">
    <Bounds>{children}</Bounds>
    <TextSmall color="textLite">{note}</TextSmall>
  </Flex>
)

export const IconButtonVsIconAction = () => (
  <>
    <DyncfgVars />
    <Compare
      todayNote="Real IconButton: borderless neutral Button + built-in tooltip. Hover the buttons to see the live state."
      proposedNote="PR IconAction (copied from PR 5951, PR colours as written). Hover the buttons to see the live state."
      today={
        <Stack>
          <Section caption="Sizes: default min 24px square, large 32px; no 28px step. Icon 14px by default (width/height props).">
            <Row gap={4} alignItems="end">
              <Labeled note="24 default">
                <IconButton icon="gear" tooltip="Alert settings" />
              </Labeled>
              <Flex column gap={1} alignItems="center">
                <TextSmall color="textLite">none</TextSmall>
                <TextSmall color="textLite">28: not available</TextSmall>
              </Flex>
              <Labeled note="32 large">
                <IconButton icon="gear" tooltip="Alert settings" large />
              </Labeled>
            </Row>
          </Section>
          <Section caption="Disabled: native disabled, opacity 0.4, pointer-events none, leaves the tab order, tooltip unreachable">
            <Row gap={4}>
              <IconButton icon="trashcan" tooltip="Delete alert" disabled />
            </Row>
          </Section>
          <Section caption="Toolbar: every IconButton is its own tab stop; no arrow-key movement; aria-label only when passed">
            <Flex gap={1} alignItems="center">
              {toolbarActions.map(({ icon, label }) => (
                <IconButton key={icon} icon={icon} tooltip={label} aria-label={label} />
              ))}
            </Flex>
          </Section>
        </Stack>
      }
      proposed={
        <Stack>
          <Section caption="Explicit square size prop: 24 / 28 (default) / 32 · optional height · 16px icon (size small) · 6px radius · hover = elementBackground + textFocus">
            <Row gap={4} alignItems="end">
              {[24, 28, 32].map(size => (
                <Labeled key={size} note={`${size}`}>
                  <IconAction icon="gear" label="Alert settings" size={size} />
                </Labeled>
              ))}
              <Labeled note="danger tone">
                <IconAction icon="trashcan" label="Delete alert" tone="danger" />
              </Labeled>
            </Row>
          </Section>
          <Section caption="Disabled: native disabled (left) vs aria-disabled (right: stays focusable, tooltip still explains why)">
            <Row gap={4}>
              <IconAction icon="trashcan" label="Delete alert" disabled />
              <IconAction
                icon="trashcan"
                label="Delete alert"
                tooltip="Managed by a parent; delete it there"
                aria-disabled="true"
              />
            </Row>
          </Section>
          <Section caption="Toolbar with roving focus: one tab stop, arrow keys / Home / End move between actions; aria-label always from label">
            <RovingToolbar />
          </Section>
        </Stack>
      }
    />
  </>
)
