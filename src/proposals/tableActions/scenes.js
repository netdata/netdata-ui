// Story scenes: today's real Table + Action next to proposal-only chip renderings of the same rows.
import React, { useState } from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import Flex from "@/components/templates/flex"
import { Table } from "@/components/table"
import { Text, TextSmall } from "@/components/typography"
import { Row, Section, Stack } from "../refresh/layout"
import { ActionChip, ChipCluster } from "./chip"
import { ActionTrack } from "./track"
import { OverflowActions } from "./fanStack"

const noop = () => {}

const alerts = [
  { id: "a1", name: "disk_space_usage", node: "db-primary-01", value: "96.2%" },
  { id: "a2", name: "10min_cpu_usage", node: "web-03", value: "84.1%" },
  { id: "a3", name: "ram_in_use", node: "cache-02", value: "81.7%", locked: true },
  { id: "a4", name: "net_packet_drops", node: "edge-gw-1", value: "1.2k/s" },
]

const getRowId = row => row.id

const dataColumns = [
  { id: "name", accessorKey: "name", header: "Alert", cell: ({ getValue }) => getValue() },
  { id: "node", accessorKey: "node", header: "Node", cell: ({ getValue }) => getValue() },
  {
    id: "value",
    accessorKey: "value",
    header: "Value",
    size: 90,
    cell: ({ getValue }) => getValue(),
  },
]

const rowActionDefs = [
  { id: "acknowledge", icon: "checkmark_s", label: "Acknowledge and hide" },
  { id: "edit", icon: "pencilOutline", label: "Edit this alert configuration" },
  { id: "silence", icon: "alarm_off", label: "Add new silencing rule" },
  {
    id: "mark",
    icon: "palette",
    label: "Mark this alert",
    isDisabled: row => !!row.locked,
  },
  { id: "troubleshoot", icon: "ai", label: "Ask AI to troubleshoot this alert", tone: "ai" },
  {
    id: "conversation",
    icon: "conversationSubject",
    label: "Add to an AI conversation",
    tone: "ai",
  },
]

const bulkActionDefs = [
  { id: "acknowledge", icon: "checkmark_s", label: "Acknowledge selected" },
  { id: "mark", icon: "palette", label: "Mark selected" },
  { id: "download", icon: "download", label: "Download as CSV", alwaysEnabled: true },
  { id: "columns", icon: "columns", label: "Columns", alwaysEnabled: true },
]

const todayRowActions = Object.fromEntries(
  rowActionDefs.map(({ id, icon, label, tone, isDisabled }) => [
    id,
    {
      icon,
      tooltipText: label,
      confirmation: false,
      handleAction: noop,
      isDisabled,
      ...(tone === "ai" ? { iconColor: "primaryAI" } : {}),
    },
  ])
)

const todayBulkActions = Object.fromEntries(
  bulkActionDefs
    .filter(({ id }) => id !== "columns")
    .map(({ id, icon, label, alwaysEnabled }) => [
      id,
      { icon, tooltipText: label, confirmation: false, handleAction: noop, alwaysEnabled },
    ])
)

const TableFrame = props => <Box width="640px" {...props} />

const chipActionsColumn = ({ renderCell, size }) => ({
  id: "actions",
  header: "Actions",
  headerString: "Actions",
  cell: ({ row }) => renderCell(row.original),
  enableColumnFilter: false,
  enableSorting: false,
  enableResizing: false,
  enableReordering: false,
  size,
  align: "end",
  notFlex: true,
  meta: { cellStyles: { justifyContent: "end" } },
})

const clusterWidth = count => count * 28 + (count - 1) * 4 + 32

const renderChips = (row, actions, shape) =>
  actions.map(({ id, isDisabled, ...action }) => (
    <ActionChip
      key={id}
      shape={shape}
      onClick={noop}
      disabled={isDisabled ? isDisabled(row) : false}
      {...action}
    />
  ))

const ProposedTable = ({ renderCell, size, ...rest }) => (
  <TableFrame>
    <Table
      data={alerts}
      dataColumns={[...dataColumns, chipActionsColumn({ renderCell, size })]}
      getRowId={getRowId}
      {...rest}
    />
  </TableFrame>
)

export const TodayRowActions = () => (
  <TableFrame>
    <Table
      data={alerts}
      dataColumns={dataColumns}
      rowActions={todayRowActions}
      getRowId={getRowId}
    />
  </TableFrame>
)

const ChipStates = ({ shape }) => (
  <Row>
    <ActionChip shape={shape} icon="pencilOutline" label="Rest" />
    <ActionChip shape={shape} icon="pencilOutline" label="Hover" preview="hover" />
    <ActionChip shape={shape} icon="palette" label="Disabled" disabled />
    <ActionChip shape={shape} icon="ai" label="AI rest" tone="ai" />
    <ActionChip shape={shape} icon="ai" label="AI hover" tone="ai" preview="hover" />
    <TextSmall color="textLite">rest · hover · disabled · AI rest · AI hover</TextSmall>
  </Row>
)

export const ProposedRowActions = () => (
  <Stack>
    <Section caption="A · circle: 28px chip, 1px border token, 14px textLite glyph, 4px gap. Hover and Tab to see the tint and the focus ring.">
      <ChipStates shape="circle" />
      <ProposedTable
        size={clusterWidth(rowActionDefs.length)}
        renderCell={row => <ChipCluster>{renderChips(row, rowActionDefs, "circle")}</ChipCluster>}
      />
    </Section>
    <Section caption="B · rounded square: same chip, 6px radius.">
      <ChipStates shape="square" />
      <ProposedTable
        size={clusterWidth(rowActionDefs.length)}
        renderCell={row => <ChipCluster>{renderChips(row, rowActionDefs, "square")}</ChipCluster>}
      />
    </Section>
  </Stack>
)

const rowSelector = '[data-testid^="netdata-table-row"]'

const Reveal = styled(Flex).attrs({ gap: 0.5, alignItems: "center" })`
  opacity: 0;
  transition: opacity 120ms ease-out;

  ${rowSelector}:hover &,
  ${rowSelector}:focus-within &,
  &:focus-within {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const [primaryRowAction, ...secondaryRowActions] = rowActionDefs

export const ProposedRevealRowActions = () => (
  <Stack>
    <Section caption="Rest: only Acknowledge shows. Hover a row, or Tab into it, to reveal the rest in place (no layout shift).">
      <ProposedTable
        size={clusterWidth(rowActionDefs.length)}
        renderCell={row => (
          <ChipCluster>
            <Reveal>{renderChips(row, secondaryRowActions, "circle")}</Reveal>
            {renderChips(row, [primaryRowAction], "circle")}
          </ChipCluster>
        )}
      />
    </Section>
  </Stack>
)

export const TodayBulkActions = () => (
  <TableFrame>
    <Table
      title="Active alerts"
      data={alerts}
      dataColumns={dataColumns}
      bulkActions={todayBulkActions}
      rowActions={todayRowActions}
      enableSelection
      enableColumnVisibility
      getRowId={getRowId}
    />
  </TableFrame>
)

export const ProposedBulkActions = () => {
  const [selected, setSelected] = useState([])

  return (
    <Stack>
      <Section caption="Select rows: the track tints and leads with the count; selection-only chips enable.">
        <Flex column gap={2}>
          <Flex alignItems="center" justifyContent="between" gap={2}>
            <Text strong>Active alerts</Text>
            <ActionTrack actions={bulkActionDefs} selectedCount={selected.length} />
          </Flex>
          <ProposedTable
            enableSelection
            onRowSelected={setSelected}
            size={clusterWidth(rowActionDefs.length)}
            renderCell={row => (
              <ChipCluster>{renderChips(row, rowActionDefs, "circle")}</ChipCluster>
            )}
          />
        </Flex>
      </Section>
      <Section caption="Static: idle and with 3 selected.">
        <Row>
          <ActionTrack actions={bulkActionDefs} />
          <ActionTrack actions={bulkActionDefs} selectedCount={3} />
        </Row>
      </Section>
    </Stack>
  )
}

const overflowOrder = ["acknowledge", "edit", "troubleshoot", "silence", "mark", "conversation"]
const prioritisedRowActions = overflowOrder.map(id => rowActionDefs.find(a => a.id === id))
const maxVisibleRowActions = 3
const overflowThreshold = 4

const OverflowCell = ({ row }) => {
  const needsOverflow = prioritisedRowActions.length > overflowThreshold
  const visible = needsOverflow
    ? prioritisedRowActions.slice(0, maxVisibleRowActions)
    : prioritisedRowActions
  const hidden = needsOverflow ? prioritisedRowActions.slice(maxVisibleRowActions) : []

  return (
    <ChipCluster>
      {renderChips(row, visible, "circle")}
      {hidden.length ? (
        <OverflowActions
          actions={hidden.map(({ isDisabled, ...action }) => ({
            ...action,
            onClick: noop,
            disabled: isDisabled ? isDisabled(row) : false,
          }))}
        />
      ) : null}
    </ChipCluster>
  )
}

export const ProposedOverflowRowActions = () => (
  <Stack>
    <Section caption="Six actions: the top three stay as chips, the rest fold into the Add new stack. Hover or focus fans the chips; click opens the menu.">
      <ProposedTable
        size={clusterWidth(maxVisibleRowActions) + 92}
        renderCell={row => <OverflowCell row={row} />}
      />
    </Section>
  </Stack>
)
