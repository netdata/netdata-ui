import { useId, useRef, useState } from "react"
import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import SearchInput from "@/components/search"
import { Text, TextSmall } from "@/components/typography"
import { getColor } from "@/theme"

const alerts = [
  {
    id: "systemd_service_unit_failed_state",
    title: "Systemd service failed",
    source: "Systemd",
    severity: "Warning",
    shortcut: "Systemd",
    recent: true,
  },
  {
    id: "system_post_update_reboot_status",
    title: "Reboot required after update",
    source: "System updates",
    severity: "Warning",
    shortcut: "Reboot status",
    recent: true,
  },
  {
    id: "disk_space_usage",
    title: "Disk space usage",
    source: "Storage",
    severity: "Critical",
    shortcut: "Disk space",
    recent: true,
  },
  {
    id: "plugin_data_collection_status",
    title: "Data collection stopped",
    source: "Collectors",
    severity: "Warning",
  },
  {
    id: "load_average_15",
    title: "15-minute load average",
    source: "CPU",
    severity: "Clear",
  },
  {
    id: "smbios_memory_comparison_unavailable",
    title: "Memory comparison unavailable",
    source: "Hardware",
    severity: "Clear",
  },
]

export const directions = {
  inset: {
    letter: "A",
    title: "Inset list",
    summary: "Dense, familiar rows with a soft selection.",
  },
  sections: {
    letter: "B",
    title: "Status sections",
    summary: "Readable names, severity labels, and distinct groups.",
    details: true,
  },
  command: {
    letter: "C",
    title: "Command menu",
    summary: "One result list with small shortcuts for recent alerts.",
    shortcuts: true,
  },
}

const severityColors = {
  Critical: "statusErrorText",
  Warning: "statusWarningText",
  Clear: "statusMutedText",
}

const Pane = styled(Flex)`
  min-width: 0;
  background: ${getColor("dropdown")};
  border: 1px solid ${getColor("border")};
  border-radius: 14px;
  box-shadow: 0 12px 28px ${getColor("dropdownShadow")};
  overflow: clip;

  &[data-layout="command"] {
    background: ${getColor("panelBg")};
  }
`

const Inset = styled(Flex)`
  padding: 12px;
  min-width: 0;
`

const PaneHeader = styled(Inset)`
  padding-bottom: 8px;

  [data-layout="command"] & {
    padding-bottom: 12px;
    border-bottom: 1px solid ${getColor("borderSecondary")};
  }
`

const Search = styled(SearchInput)`
  width: 100%;
  min-width: 0;
`

const Group = styled(Flex)`
  min-width: 0;

  & + & {
    margin-top: 10px;
  }

  [data-layout="inset"] & + & {
    padding-top: 10px;
    border-top: 1px solid ${getColor("borderSecondary")};
  }

  [data-layout="sections"] & {
    padding: 6px;
    border: 1px solid ${getColor("borderSecondary")};
    border-radius: 9px;
  }
`

const GroupLabel = styled(TextSmall)`
  padding: 2px 7px 4px;
  color: ${getColor("textLite")};
  font-weight: 600;
`

const buttonReset = css`
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  text-align: start;
  color: inherit;
  cursor: pointer;
  min-width: 0;

  &:focus-visible {
    outline: 2px solid ${getColor("segmentedFocus")};
    outline-offset: -2px;
  }
`

const Row = styled.button`
  ${buttonReset};
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 0 8px;
  min-height: 34px;
  border-radius: 7px;

  &:hover {
    background: ${getColor("menuItemHover")};
  }

  &[aria-current="true"] {
    color: ${getColor("menuItemSelectedText")};
    background: ${getColor("menuItemSelected")};
  }

  &[aria-current="true"]:hover {
    background: ${getColor("menuItemSelectedHover")};
  }

  [data-layout="sections"] & {
    min-height: 45px;
    padding: 4px 7px;
  }

  [data-layout="command"] & {
    min-height: 36px;
  }

  [data-layout="command"] &[aria-current="true"] {
    box-shadow: inset 2px 0 ${getColor("primary")};
  }
`

const Shortcut = styled.button`
  ${buttonReset};
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  max-width: 100%;
  min-height: 26px;
  border: 1px solid ${getColor("border")};
  border-radius: 6px;
  background: ${getColor("controlBackground")};

  &:hover {
    background: ${getColor("menuItemHover")};
  }
`

const RowText = styled(Flex)`
  flex: 1 1 auto;
  min-width: 0;

  & > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
  }
`

const Dot = styled.span`
  flex: none;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $severity }) => getColor(severityColors[$severity])};
`

const StatusText = styled(TextSmall)`
  flex: none;
  color: ${({ $severity }) => getColor(severityColors[$severity])};
`

const Marker = styled.span`
  flex: 0 0 14px;
  display: grid;
  place-items: center;
`

const ListBody = styled(Inset)`
  max-height: min(390px, 62dvh);
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  overscroll-behavior: contain;
`

const HeaderIcon = ({ name, color = "textLite" }) => (
  <Icon name={name} width="14px" height="14px" color={color} aria-hidden="true" />
)

const AlertRow = ({ alert, details, current, onSelect }) => (
  <Row
    type="button"
    data-dropdown-option={alert.id}
    aria-current={current ? "true" : undefined}
    aria-label={`${alert.id}, ${alert.severity}`}
    title={alert.id}
    onClick={() => onSelect(alert.id)}
  >
    {details ? null : <Dot $severity={alert.severity} aria-hidden="true" />}
    <RowText column gap={0.5}>
      <Text color="inherit">{details ? alert.title : alert.id}</Text>
      {details ? <TextSmall color="textLite">{alert.id}</TextSmall> : null}
    </RowText>
    {details ? (
      <StatusText $severity={alert.severity} aria-hidden="true">
        {alert.severity}
      </StatusText>
    ) : null}
    <Marker>
      {current ? <HeaderIcon name="checkmark_s" color="menuItemSelectedText" /> : null}
    </Marker>
  </Row>
)

const AlertGroup = ({ label, items, details, selected, onSelect }) =>
  items.length ? (
    <Group as="section" aria-label={label} column gap={0.5}>
      <GroupLabel>{label}</GroupLabel>
      {items.map(alert => (
        <AlertRow
          key={alert.id}
          alert={alert}
          details={details}
          current={selected === alert.id}
          onSelect={onSelect}
        />
      ))}
    </Group>
  ) : null

const focusResults = (event, container) => {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return
  const rows = Array.from(container.querySelectorAll("[data-dropdown-option]"))
  if (!rows.length) return
  const current = rows.indexOf(event.target)
  if (current < 0 && event.key !== "ArrowDown") return
  const next = {
    ArrowDown: (current + 1) % rows.length,
    ArrowUp: (current - 1 + rows.length) % rows.length,
    Home: 0,
    End: rows.length - 1,
  }[event.key]
  event.preventDefault()
  rows[next].focus()
}

export const AlertDropdown = ({ direction }) => {
  const [selected, setSelected] = useState(alerts[0].id)
  const [query, setQuery] = useState("")
  const container = useRef(null)
  const titleId = useId()
  const { details, shortcuts } = directions[direction]
  const term = query.trim().toLowerCase()
  const visible = alerts.filter(({ id, title, source, severity }) =>
    `${id} ${title} ${source} ${severity}`.toLowerCase().includes(term)
  )
  const recents = term ? [] : visible.filter(alert => alert.recent)
  const results = term || shortcuts ? visible : visible.filter(alert => !alert.recent)
  const recentShortcuts = recents.filter(alert => alert.id !== selected)

  const selectShortcut = id => {
    setSelected(id)
    container.current.querySelector(`[data-dropdown-option="${CSS.escape(id)}"]`)?.focus()
  }

  return (
    <Pane
      ref={container}
      as="section"
      aria-labelledby={titleId}
      column
      data-layout={direction}
      onKeyDown={event => focusResults(event, container.current)}
    >
      <PaneHeader column gap={2}>
        <Flex alignItems="center" justifyContent="between" gap={2}>
          <Flex alignItems="center" gap={1.5}>
            <HeaderIcon name="alarm_bell" />
            <Text as="h2" strong id={titleId} margin={0}>
              Alerts
            </Text>
          </Flex>
          <TextSmall color="textLite">{alerts.length} alerts</TextSmall>
        </Flex>
        <Search
          type="search"
          aria-label="Search alerts"
          placeholder="Search alerts"
          onChange={setQuery}
          onReset={() => setQuery("")}
        />
      </PaneHeader>
      <ListBody column>
        {shortcuts && recentShortcuts.length ? (
          <Group as="section" aria-label="Recent shortcuts" column gap={1}>
            <GroupLabel>Recent shortcuts</GroupLabel>
            <Flex flexWrap gap={1} padding={[0, 1.5]}>
              {recentShortcuts.map(alert => (
                <Shortcut
                  type="button"
                  key={alert.id}
                  aria-label={`Open recent alert ${alert.id}`}
                  title={alert.id}
                  onClick={() => selectShortcut(alert.id)}
                >
                  <HeaderIcon name="clock_hollow" />
                  <TextSmall>{alert.shortcut}</TextSmall>
                </Shortcut>
              ))}
            </Flex>
          </Group>
        ) : null}
        {!shortcuts ? (
          <AlertGroup
            label="Recently visited"
            items={recents}
            details={details}
            selected={selected}
            onSelect={setSelected}
          />
        ) : null}
        <AlertGroup
          label={term ? "Search results" : shortcuts ? "All alerts" : "More alerts"}
          items={results}
          details={details}
          selected={selected}
          onSelect={setSelected}
        />
        {visible.length ? null : (
          <TextSmall role="status" color="textLite" padding={[2]}>
            No matching alerts
          </TextSmall>
        )}
      </ListBody>
    </Pane>
  )
}
