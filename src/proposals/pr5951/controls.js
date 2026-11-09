// Copied from PR 5951 src/domains/configuration/components/controls.js and alertEditor/controls.js.
import styled from "styled-components"
import Box from "@/components/templates/box"
import { getColor, getSizeBy } from "@/theme"
import { focusRing, focusRingAt } from "./tokens"

export const Segmented = styled(Box)`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${getSizeBy(0.25)};
  padding: ${getSizeBy(0.375)};
  border-radius: var(--dyncfg-radius-md);
  background: var(--dyncfg-segment-bg);
  border: 1px solid ${getColor("borderSecondary")};
`

export const SegmentButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.875)};
  height: ${getSizeBy(3.25)};
  padding: 0 ${getSizeBy(1.25)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  font-size: 13px;
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 500)};
  color: ${({ isSelected }) =>
    isSelected ? getColor("textFocus") : "var(--dyncfg-text-secondary)"};
  background: ${({ isSelected }) => (isSelected ? "var(--dyncfg-segment-active)" : "transparent")};
  box-shadow: ${({ isSelected }) => (isSelected ? "var(--dyncfg-segment-shadow)" : "none")};
  transition:
    color 120ms ease,
    background 120ms ease;

  &:hover {
    color: ${getColor("textFocus")};
  }

  ${focusRing}
`

export const CompactSegmented = styled(Segmented)`
  padding: ${getSizeBy(0.25)};
  border-radius: var(--dyncfg-radius-sm);
`

export const CompactSegment = styled(SegmentButton)`
  gap: ${getSizeBy(0.625)};
  height: ${getSizeBy(2.75)};
  padding: 0 ${getSizeBy(1)};
  border-radius: var(--dyncfg-radius-xs);
  font-size: 12px;
`

export const Count = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.5)};
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: var(--dyncfg-text-secondary);
`

export const Tick = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.5)};
  font-size: 12px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ tone }) => (tone ? `var(--dyncfg-${tone}-text)` : "var(--dyncfg-text-secondary)")};

  &::before {
    content: "";
    width: ${getSizeBy(0.375)};
    height: ${getSizeBy(1.375)};
    border-radius: var(--dyncfg-radius-xs);
    background: ${({ tone }) =>
      tone ? `var(--dyncfg-${tone}-text)` : "var(--dyncfg-text-secondary)"};
  }
`

export const FilterChip = styled(Box).attrs({ as: "button", type: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  height: ${getSizeBy(3.25)};
  padding: 0 ${getSizeBy(1.25)};
  border: 1px solid var(--dyncfg-chip-border);
  border-radius: var(--dyncfg-radius-xs);
  background: ${getColor("mainBackground")};
  color: ${getColor("textFocus")};
  font-size: 13px;
  line-height: 20px;
  white-space: nowrap;
  cursor: pointer;

  &:hover:not([aria-disabled="true"]) {
    border-color: var(--dyncfg-control-border);
  }

  &[aria-pressed="true"] {
    border-color: var(--dyncfg-heading);
    background: var(--dyncfg-row-selected);
  }

  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRingAt(1)}
`

export const OutlineButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  flex: 0 0 auto;
  height: ${({ buttonHeight = 32 }) => getSizeBy(buttonHeight / 8)};
  padding: 0 ${({ buttonHeight = 32 }) => getSizeBy(buttonHeight < 30 ? 1.125 : 1.375)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  white-space: nowrap;
  font-size: ${({ buttonHeight = 32 }) => (buttonHeight < 30 ? 12 : 13)}px;
  font-weight: 500;
  color: ${getColor("textFocus")};
  border: 1px solid var(--dyncfg-chip-border);
  background: ${({ isActive }) => (isActive ? "var(--dyncfg-segment-active)" : "transparent")};
  transition:
    border-color 120ms ease,
    background 120ms ease;

  svg {
    fill: currentColor;
  }

  &:hover:not(:disabled):not([aria-disabled="true"]) {
    border-color: var(--dyncfg-control-border);
    background: var(--dyncfg-segment-bg);
  }

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${focusRing}
`

export const SmallButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  flex: 0 0 auto;
  height: ${getSizeBy(3.25)};
  padding: 0 ${getSizeBy(1.25)};
  border-radius: var(--dyncfg-radius-sm);
  border: 1px solid var(--dyncfg-chip-border);
  cursor: pointer;
  font-size: 12px;
  color: ${getColor("textFocus")};

  &:hover {
    border-color: var(--dyncfg-control-border);
  }

  ${focusRingAt(2)}
`

export const MenuPanel = styled(Box)`
  display: flex;
  flex-direction: column;
  width: ${getSizeBy(32.5)};
  padding: ${getSizeBy(0.75)};
`

export const MenuItem = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: ${getSizeBy(1.25)};
  height: ${getSizeBy(4)};
  padding: 0 ${getSizeBy(0.75)} 0 ${getSizeBy(1)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  font-size: 13px;
  color: ${getColor("textFocus")};

  span:first-child {
    flex: 1 1 auto;
  }

  svg {
    fill: var(--dyncfg-text-secondary);
  }

  &:hover {
    background: var(--dyncfg-row-hover);
  }

  ${focusRing}
`

export const MenuText = styled(Box).attrs({ as: "span" })`
  display: flex;
  flex-direction: column;
`

export const MenuNote = styled(Box).attrs({ as: "span" })`
  font-size: 12px;
  line-height: 18px;
  color: var(--dyncfg-text-secondary);
`

export const TextLink = styled(Box).attrs({ as: "button" })`
  all: unset;
  height: 28px;
  padding: 0 ${getSizeBy(0.5)};
  border-radius: var(--dyncfg-radius-xs);
  cursor: pointer;
  font-size: 12px;
  line-height: 18px;
  color: var(--dyncfg-text-primary);
  text-decoration: underline;
  text-decoration-color: var(--dyncfg-control-border);
  text-underline-offset: 3px;
  white-space: nowrap;

  &[aria-disabled="true"] {
    cursor: default;
    color: var(--dyncfg-text-secondary);
    text-decoration: none;
  }

  ${focusRingAt(0)}
`

export const TextButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.625)};
  height: 28px;
  border-radius: var(--dyncfg-radius-xs);
  cursor: pointer;
  font-size: 13px;
  line-height: 20px;
  color: var(--dyncfg-text-primary);
  white-space: nowrap;

  svg {
    fill: var(--dyncfg-text-secondary);
  }

  &:hover {
    text-decoration: underline;
    text-decoration-color: var(--dyncfg-control-border);
    text-underline-offset: 3px;
  }

  ${focusRingAt(2)}
`

export const RowTextAction = styled(Box).attrs({ as: "button", type: "button" })`
  all: unset;
  box-sizing: border-box;
  flex: none;
  display: inline-flex;
  align-items: center;
  height: ${getSizeBy(3.5)};
  padding: 0 ${getSizeBy(1)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  font-size: 12px;
  line-height: 18px;
  color: var(--dyncfg-text-secondary);
  white-space: nowrap;

  &:hover:not([aria-disabled="true"]) {
    color: var(--dyncfg-text-primary);
    background: var(--dyncfg-row-hover);
  }

  &[aria-disabled="true"] {
    cursor: default;
  }

  ${focusRingAt(0)}
`
