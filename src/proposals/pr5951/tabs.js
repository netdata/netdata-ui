// Copied from PR 5951: components/tabStrip.js and workspace/paneTabs.js (+ TypeTab from typeTabs.js).
import React from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRingAt } from "./tokens"
import { onRovingKeyDown } from "./actions"
import { Count, Tick } from "./controls"
import { toneColors } from "./status"

const Strip = styled(Box)`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  gap: ${getSizeBy(0.25)};
  overflow-x: auto;
  scrollbar-width: none;
  align-self: flex-start;
  max-width: 100%;
  padding: ${getSizeBy(0.375)};
  border-radius: var(--dyncfg-radius-md);
  background: ${getColor("mainBackground")};
  border: 1px solid ${getColor("borderSecondary")};
`

const StripItem = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  white-space: nowrap;
  font-size: 13px;
  line-height: 20px;
  padding: ${getSizeBy(0.5)} ${getSizeBy(1.5)};
  border-radius: var(--dyncfg-radius-sm);
  font-weight: 500;
  color: ${({ active }) => (active ? getColor("textFocus") : "var(--dyncfg-text-secondary)")};
  background: ${({ active }) => (active ? getColor("elementBackground") : "transparent")};
  box-shadow: ${({ active }) => (active ? "inset 0 0 0 1px var(--dyncfg-control-border)" : "none")};
  transition:
    color 120ms ease,
    background 120ms ease;

  &:hover {
    color: ${getColor("textFocus")};
  }

  ${focusRingAt(-2)}
`

export const TabStrip = ({ tabs = [], selected = 0, onChange }) => (
  <Strip role="tablist">
    {tabs.map(({ label }, index) => (
      <StripItem
        key={label}
        type="button"
        role="tab"
        data-roving
        tabIndex={index === selected ? 0 : -1}
        aria-selected={index === selected}
        active={index === selected}
        onClick={() => onChange(index)}
        onKeyDown={event => onRovingKeyDown({ event, index, count: tabs.length, onMove: onChange })}
      >
        {label}
      </StripItem>
    ))}
  </Strip>
)

export const TypeTab = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${getSizeBy(0.875)};
  height: ${getSizeBy(4.25)};
  padding: 0 ${getSizeBy(1.5)};
  white-space: nowrap;
  font-size: 13px;
  line-height: 20px;
  color: ${getColor("textFocus")};
  cursor: pointer;
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 500)};
  box-shadow: inset 0 -${getSizeBy(0.25)} 0
    ${({ isSelected }) => (isSelected ? getColor("textFocus") : "transparent")};
  transition: background 120ms ease;

  svg {
    fill: var(--dyncfg-text-secondary);
  }

  &:hover,
  &[aria-expanded="true"] {
    background: var(--dyncfg-row-hover);
  }

  ${focusRingAt(-4)}
`

const PaneStrip = styled(Box)`
  display: flex;
  align-items: stretch;
  gap: ${getSizeBy(0.25)};
  flex: 0 0 auto;
  border-bottom: 1px solid ${getColor("borderSecondary")};
`

const Of = styled(Box).attrs({ as: "span" })`
  margin-left: -${getSizeBy(0.5)};
  font-size: 12px;
  color: var(--dyncfg-text-secondary);
`

const IconMark = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  color: ${({ tone, theme }) =>
    tone === "ink"
      ? getColor("textFocus")({ theme })
      : toneColors[tone] || "var(--dyncfg-text-secondary)"};

  && svg {
    fill: currentColor;
  }
`

export const PaneTabs = ({ tabs, selectedKey, onSelect, label }) => (
  <PaneStrip role="tablist" aria-label={label}>
    {tabs.map((tab, index) => {
      const isSelected = tab.key === selectedKey
      return (
        <TypeTab
          key={tab.key}
          type="button"
          role="tab"
          aria-selected={isSelected}
          tabIndex={isSelected ? 0 : -1}
          data-roving
          isSelected={isSelected}
          onClick={() => onSelect(tab.key)}
          onKeyDown={event =>
            onRovingKeyDown({
              event,
              index,
              count: tabs.length,
              onMove: t => onSelect(tabs[t].key),
            })
          }
        >
          <IconMark tone={tab.tone}>
            <Icon aria-hidden="true" name={tab.icon} width="16px" height="16px" />
          </IconMark>
          <span>{tab.label}</span>
          {tab.count !== undefined ? <Count>{tab.count.toLocaleString()}</Count> : null}
          {tab.of ? <Of>{`of ${tab.of.toLocaleString()}`}</Of> : null}
          {tab.tick ? <Tick tone={tab.tick.tone}>{tab.tick.count.toLocaleString()}</Tick> : null}
        </TypeTab>
      )
    })}
  </PaneStrip>
)
