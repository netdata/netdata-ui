// Faithful copies of the custom elements added in cloud-frontend PR 5951 (Dyncfg rework). Raw hex/px values
// in this folder are deliberate so the review shows the PR as written; do not reuse them as netdata-ui code.
import { useState } from "react"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { Text, TextSmall } from "@/components/typography"
import { DyncfgVars } from "./tokens"
import {
  CompactSegment,
  CompactSegmented,
  FilterChip,
  MenuItem,
  MenuNote,
  MenuPanel,
  MenuText,
  OutlineButton,
  RowTextAction,
  SegmentButton,
  Segmented,
  SmallButton,
  TextButton,
  TextLink,
  Count,
  Tick,
} from "./controls"
import { IconAction, Tooltip } from "./actions"
import { PaneTabs, TabStrip } from "./tabs"
import { AlertLevelPill, MarkCounts, StatePill, StatusWord, statusTones } from "./status"
import { Chip, FilterInput, Highlight, RemovableChip, RowCheckbox, Switch } from "./inputs"
import {
  Empty,
  EmptyActionButton,
  EmptyActions,
  EmptyContainer,
  EmptyHint,
  EmptyResultActions,
  EmptyTitle,
  JobStateBanner,
} from "./surfaces"
import { ConfirmDialog, NeutralButton, PrimaryButton } from "./dialog"
import {
  AddItemButton,
  BellGlyph,
  DisclosureButton,
  PlugGlyph,
  RequiredTag,
  SilentSign,
  Tile,
  ValidationIcon,
} from "./marks"
import { Card, CardGap, CardHeader, CardNote, CardSub, CardTitle, ClampedDescription } from "./card"

const PR = "src/domains/configuration/components/"

export default {
  title: "Proposals/PR 5951 elements",
  parameters: { layout: "padded" },
  decorators: [
    Story => (
      <>
        <DyncfgVars />
        <Story />
      </>
    ),
  ],
}

const Caption = ({ source, overlaps, children }) => (
  <Flex column gap={4}>
    <Flex column gap={1}>
      <TextSmall color="textLite">{`PR: ${PR}${source}`}</TextSmall>
      <TextSmall color="textLite">{`Closest netdata-ui: ${overlaps}`}</TextSmall>
    </Flex>
    {children}
  </Flex>
)

const Row = props => <Flex gap={3} alignItems="center" flexWrap {...props} />

export const Buttons = () => (
  <Caption
    source="controls.js:124 OutlineButton, :163 SmallButton; alertEditor/controls.js:374 TextLink, :397 TextButton, :488 RowTextAction"
    overlaps="Button (flavour borderless/hollow, tiny/small), IconButton"
  >
    <Row>
      <OutlineButton type="button">
        <Icon name="plus" size="small" />
        Add job
      </OutlineButton>
      <OutlineButton type="button" isActive>
        Active
      </OutlineButton>
      <OutlineButton type="button" buttonHeight={28}>
        28px height
      </OutlineButton>
      <OutlineButton type="button" disabled>
        Disabled
      </OutlineButton>
      <SmallButton type="button">Copy</SmallButton>
    </Row>
    <Row>
      <TextButton type="button">
        <Icon name="plus" size="small" color="currentColor" />
        Add a condition
      </TextButton>
      <TextLink type="button">every 10 seconds</TextLink>
      <TextLink type="button" aria-disabled="true">
        disabled link
      </TextLink>
      <RowTextAction>Reset</RowTextAction>
      <RowTextAction aria-disabled="true">Reset (disabled)</RowTextAction>
    </Row>
  </Caption>
)

export const IconActions = () => (
  <Caption
    source="iconAction.js:44 IconAction (+ tooltip.js:59 Tooltip)"
    overlaps="IconButton + Tooltip"
  >
    <Row>
      <IconAction icon="pencilSolid" label="Edit job" />
      <IconAction icon="copy" label="Duplicate job" />
      <IconAction icon="trashcan" label="Delete job" tone="danger" />
      <IconAction icon="refresh" label="Restart job" size={24} />
      <IconAction icon="trashcan" label="Delete (disabled)" disabled />
    </Row>
  </Caption>
)

const SegmentedDemo = ({ Group, Segment, options }) => {
  const [value, setValue] = useState(options[0])
  return (
    <Group role="radiogroup">
      {options.map(option => (
        <Segment
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          isSelected={value === option}
          onClick={() => setValue(option)}
        >
          {option}
        </Segment>
      ))}
    </Group>
  )
}

export const SegmentedControls = () => (
  <Caption
    source="controls.js:5 Segmented / :16 SegmentButton / :44 CompactSegmented; configForm/widgets/segmentedChoice.js"
    overlaps="ButtonGroup (radio), Tabs"
  >
    <SegmentedDemo
      Group={Segmented}
      Segment={SegmentButton}
      options={["All", "Running", "Failed", "Disabled"]}
    />
    <SegmentedDemo Group={CompactSegmented} Segment={CompactSegment} options={["Form", "YAML"]} />
  </Caption>
)

export const FilterChips = () => {
  const [pressed, setPressed] = useState(true)
  return (
    <Caption
      source="controls.js:90 FilterChip; filters/activeFilters.js:30 Chip; workspace/styled.js:5 Chip, :31 Highlight"
      overlaps="Pill, MasterCardPill, Search highlight (none)"
    >
      <Row>
        <FilterChip aria-pressed={pressed} onClick={() => setPressed(p => !p)}>
          Needs attention
        </FilterChip>
        <FilterChip aria-pressed={false}>Configured</FilterChip>
        <FilterChip aria-disabled="true">Available</FilterChip>
      </Row>
      <Row>
        <RemovableChip type="button" aria-label="Remove the Failed filter">
          Failed
          <Icon name="x" size="small" color="currentColor" />
        </RemovableChip>
        <RemovableChip type="button" aria-label="Remove the User filter">
          User
          <Icon name="x" size="small" color="currentColor" />
        </RemovableChip>
      </Row>
      <Row>
        <Chip>dyncfg</Chip>
        <Chip mono>go.d:nginx:local</Chip>
        <Text>
          <Highlight text="nginx_local" match={{ start: 0, end: 5 }} />
        </Text>
      </Row>
    </Caption>
  )
}

export const TabStrips = () => {
  const [selected, setSelected] = useState(0)
  const [pane, setPane] = useState("jobs")
  const paneTabs = [
    { key: "jobs", label: "Jobs", icon: "nodes", count: 12, tick: { tone: "error", count: 2 } },
    { key: "alerts", label: "Alerts", icon: "alarm_bell", count: 48, of: 52 },
    { key: "settings", label: "Settings", icon: "gear", tone: "ink" },
  ]
  return (
    <Caption
      source="tabStrip.js:62 TabStrip; workspace/paneTabs.js:37 PaneTabs (+ typeTabs.js:58 TypeTab); controls.js:61 Count, :71 Tick"
      overlaps="Tabs / Tab"
    >
      <TabStrip
        tabs={[{ label: "Configuration" }, { label: "Prototypes" }, { label: "Alerts" }]}
        selected={selected}
        onChange={setSelected}
      />
      <PaneTabs tabs={paneTabs} selectedKey={pane} onSelect={setPane} label="Collector" />
      <Row>
        <Count>1,204</Count>
        <Tick tone="error">3</Tick>
        <Tick tone="warning">7</Tick>
        <Tick>0</Tick>
      </Row>
    </Caption>
  )
}

export const StatusMarks = () => (
  <Caption
    source="configItem/badges.js:80 StatePill, :133 StatusWord, :125 AlertStateWord; alertEditor/cardParts.js:177 StatusPill; configForm/templates/changeMarks.js:60 MarkCounts"
    overlaps="Pill (flavours success/error/warning/neutral), AlertMasterCard"
  >
    <Row>
      {Object.entries(statusTones).map(([key, { label, tone, hollow }]) => (
        <StatePill key={key} tone={tone} hollow={hollow}>
          {label}
        </StatePill>
      ))}
    </Row>
    <Row>
      <StatePill tone="success" small>
        Running
      </StatePill>
      <StatePill tone="error" small dot={false}>
        Failed
      </StatePill>
    </Row>
    <Row>
      {Object.entries(statusTones).map(([key, { label, tone, hollow }]) => (
        <StatusWord key={key} tone={tone} hollow={hollow} label={label} />
      ))}
      <StatusWord tone="warning" label="Warning" detail="for 12m" />
    </Row>
    <Row>
      <AlertLevelPill status="critical">Critical</AlertLevelPill>
      <AlertLevelPill status="warning">Warning</AlertLevelPill>
      <AlertLevelPill status="clear">Clear</AlertLevelPill>
      <AlertLevelPill>Not run yet</AlertLevelPill>
    </Row>
    <MarkCounts counts={{ error: 2, toFill: 1, edited: 4, customized: 3 }} />
  </Caption>
)

export const SwitchAndCheckbox = () => {
  const [on, setOn] = useState(true)
  const [checked, setChecked] = useState(false)
  return (
    <Caption
      source="switchTrack.js:7 + configForm/widgets/switchWidget.js:23; configItem/rowCheckbox.js:55"
      overlaps="Toggle, Checkbox"
    >
      <Row>
        <Switch value={on} onChange={setOn} label="Enabled" />
        <Switch value={false} onChange={() => {}} label="Off" />
        <Switch value disabled onChange={() => {}} label="Disabled" />
      </Row>
      <Row>
        <RowCheckbox checked={checked} onChange={() => setChecked(c => !c)} label="Select job" />
        <RowCheckbox checked onChange={() => {}} label="Checked" />
        <RowCheckbox indeterminate onChange={() => {}} label="Some selected" />
      </Row>
    </Caption>
  )
}

export const Filter = () => {
  const [value, setValue] = useState("nginx")
  return (
    <Caption source="workspace/filterInput.js:70 FilterInput" overlaps="Search, TextInput">
      <Flex width="320px" column gap={2}>
        <FilterInput
          value={value}
          onChange={setValue}
          placeholder="Filter by name, module or job"
        />
        <FilterInput value="" onChange={() => {}} placeholder="Filter alerts" />
      </Flex>
    </Caption>
  )
}

export const Menu = () => (
  <Caption
    source="controls.js:182 MenuPanel, :189 MenuItem; alertEditor/optionMenu.js:28 OptionMenu (panel shown inline)"
    overlaps="Menu / MenuDropdown / DropdownItem"
  >
    <Flex className="dyncfg-popover" width="fit-content">
      <MenuPanel role="menu">
        <MenuItem type="button">
          <span>Edit</span>
          <Icon name="pencilSolid" size="small" />
        </MenuItem>
        <MenuItem type="button">
          <MenuText>
            <span>Per dimension</span>
            <MenuNote>One alert for each dimension of the chart</MenuNote>
          </MenuText>
          <Icon name="check" size="small" />
        </MenuItem>
        <MenuItem type="button">
          <span>Delete</span>
          <Icon name="trashcan" size="small" />
        </MenuItem>
      </MenuPanel>
    </Flex>
  </Caption>
)

export const EmptyStates = () => (
  <Caption
    source="emptyResults.js:61 EmptyResults; workspace/emptyState.js:4 Empty, :34 EmptyActions"
    overlaps="none (no empty-state component in netdata-ui)"
  >
    <EmptyContainer role="status">
      <EmptyTitle>No matches for “postgres”</EmptyTitle>
      <EmptyHint>Try another search term, or clear the search and filters.</EmptyHint>
      <EmptyResultActions>
        <EmptyActionButton type="button">Clear search</EmptyActionButton>
        <EmptyActionButton type="button">Clear filters</EmptyActionButton>
      </EmptyResultActions>
    </EmptyContainer>
    <EmptyContainer>
      <EmptyHint>Nothing to configure here on this node.</EmptyHint>
    </EmptyContainer>
    <Empty>
      <Tile tileSize={40} look="plain" data-empty-logo>
        <PlugGlyph size={24} />
      </Tile>
      <h3>No jobs yet</h3>
      <p>The nginx collector has no jobs on this node. Add one to start collecting metrics.</p>
      <EmptyActions>
        <PrimaryButton type="button">Add job</PrimaryButton>
      </EmptyActions>
    </Empty>
  </Caption>
)

export const Banners = () => (
  <Caption
    source="configForm/jobStateBanner.js:157 JobStateBanner"
    overlaps="none (closest: Pill / AlertMasterCard)"
  >
    <JobStateBanner
      state={{
        tone: "error",
        icon: "warning_triangle",
        title: "This job failed.",
        text: "connection refused on 127.0.0.1:80.",
      }}
      action={<SmallButton type="button">Restart job</SmallButton>}
    />
    <JobStateBanner
      state={{
        tone: "warning",
        icon: "warning_triangle",
        title: "The nginx module is disabled.",
        text: "Enable it to run this job.",
      }}
      action={<SmallButton type="button">Enable</SmallButton>}
    />
    <JobStateBanner
      state={{
        tone: "neutral",
        icon: "information",
        title: "Disabled.",
        text: "This job does not collect data.",
      }}
    />
    <JobStateBanner state={{ variant: "hint", text: "Changes apply to this node only." }} />
  </Caption>
)

export const Dialog = () => (
  <Caption
    source="confirmDialog.js:183 ConfirmDialog (+ :102 NeutralButton, :127 DangerButton, :139 PrimaryButton)"
    overlaps="ConfirmationDialog"
  >
    <Row>
      <NeutralButton type="button">Cancel</NeutralButton>
      <PrimaryButton type="button">Save</PrimaryButton>
      <PrimaryButton type="button" disabled>
        Save
      </PrimaryButton>
    </Row>
    <ConfirmDialog
      inline
      title="Delete nginx_local?"
      message={
        <>
          The job <strong>nginx_local</strong> stops collecting and its configuration is removed
          from this node.
        </>
      }
      confirmLabel="Delete"
      onConfirm={() => {}}
      onDecline={() => {}}
    />
    <ConfirmDialog
      inline
      destructive={false}
      title="Apply to 3 nodes?"
      message="The job is copied to the selected nodes."
      confirmLabel="Apply"
      onConfirm={() => {}}
      onDecline={() => {}}
    />
  </Caption>
)

export const SmallMarks = () => {
  const [expanded, setExpanded] = useState(false)
  return (
    <Caption
      source="configItem/collectorLogo.js:48/88/117 logo tiles; workspace/addItemButton.js:12; templates/disclosureButton.js:22, requiredTag.js:12, validationIcon.js:19; alertEditor/silentSign.js:10"
      overlaps="Icon, IconButton, Collapsible header (none for tiles/tags)"
    >
      <Row>
        <Tile tileSize={28} look="letter">
          N
        </Tile>
        <Tile tileSize={28} look="letter" dimmed>
          P
        </Tile>
        <Tile tileSize={22} look="plain">
          <PlugGlyph size={13} />
        </Tile>
        <Tile tileSize={22} look="plain">
          <BellGlyph size={13} />
        </Tile>
        <AddItemButton noun="job" />
        <AddItemButton noun="job" disabled />
        <DisclosureButton expanded={expanded} title="TLS" onToggle={() => setExpanded(e => !e)} />
      </Row>
      <Row>
        <Text>
          URL
          <RequiredTag />
        </Text>
        <Text>
          Password
          <RequiredTag ifUsed />
        </Text>
        <ValidationIcon />
        <SilentSign />
      </Row>
    </Caption>
  )
}

export const AlertCard = () => (
  <Caption
    source="alertEditor/cardParts.js:7 Card, :150 CardNote; configForm/templates/clampedDescription.js:59"
    overlaps="none (closest: Flex with border/round)"
  >
    <Flex width="560px" column>
      <Card>
        <CardHeader>
          <CardTitle>On this node</CardTitle>
          <CardSub>web_log_nginx.requests · last 10 minutes</CardSub>
          <CardGap />
          <AlertLevelPill status="warning">Warning</AlertLevelPill>
        </CardHeader>
        <CardNote
          short="Values are averaged per minute."
          full="The rule averages the last 10 minutes of data every minute and compares it with the thresholds."
        />
      </Card>
    </Flex>
    <Flex width="360px">
      <TextSmall color="textLite">
        <ClampedDescription text="The URL of the nginx stub_status page. The collector reads active connections, accepts, handled and requests from it every update period." />
      </TextSmall>
    </Flex>
  </Caption>
)

export const TooltipPanel = () => (
  <Caption
    source="tooltip.js:59 Tooltip (plain panel with optional eyebrow title)"
    overlaps="Tooltip"
  >
    <Tooltip title="Source" content="Configured by the user through the UI" open>
      <Text>Hover me</Text>
    </Tooltip>
  </Caption>
)
