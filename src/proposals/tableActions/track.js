// Proposal-only pill track that groups header and bulk chips, after the topbar trigger.
import React from "react"
import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import Box from "@/components/templates/box"
import { TextSmall } from "@/components/typography"
import { getColor, getRgbColor, getSizeBy } from "@/theme"
import { ActionChip } from "./chip"

const trackStylesBySelection = {
  idle: css`
    background-color: ${getRgbColor("textLite", 0.06)};
    border-color: ${getColor("borderSecondary")};
  `,
  active: css`
    background-color: ${getRgbColor("primary", 0.06)};
    border-color: ${getRgbColor("primary", 0.5)};
  `,
}

const Track = styled(Flex).attrs({ alignItems: "center", gap: 0.25, role: "toolbar" })`
  box-sizing: border-box;
  height: ${getSizeBy(3.5)};
  padding: 1px;
  border-width: 1px;
  border-style: solid;
  border-radius: ${getSizeBy(1.75)};
  transition:
    background-color 140ms ease-out,
    border-color 140ms ease-out;
  ${({ selection }) => trackStylesBySelection[selection]}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const TrackDivider = styled(Box)`
  width: 1px;
  height: ${getSizeBy(2)};
  margin: 0 ${getSizeBy(0.5)};
  background-color: ${getRgbColor("primary", 0.5)};
`

const SelectionCount = ({ count }) => (
  <Flex alignItems="center" padding={[0, 0, 0, 2]} aria-live="polite">
    <TextSmall strong color="primary">
      {count} selected
    </TextSmall>
    <TrackDivider />
  </Flex>
)

export const ActionTrack = ({ actions, selectedCount = 0, label = "Table actions" }) => (
  <Track aria-label={label} selection={selectedCount > 0 ? "active" : "idle"}>
    {selectedCount > 0 ? <SelectionCount count={selectedCount} /> : null}
    {actions.map(({ id, alwaysEnabled, ...action }) => (
      <ActionChip
        key={id}
        tone="quiet"
        density="compact"
        disabled={!alwaysEnabled && selectedCount < 1}
        {...action}
      />
    ))}
  </Track>
)
