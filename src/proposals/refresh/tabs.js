// Proposed contained track: one visual for contained tabs and segmented value pickers
// (after the PR's TabStrip and Segmented), plus icon/count slots for our line tabs.
import styled from "styled-components"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { getColor, getRgbColor, getSizeBy } from "@/theme"
import { focusRingOutline } from "@/mixins/focusRing"
import { Dot } from "./pills"

// Track 4px radius (control), raised item 2px (inner chip); 3px track padding.
const Track = styled(Flex).attrs({ alignItems: "center" })`
  display: inline-flex;
  flex: 0 0 auto;
  align-self: flex-start;
  gap: ${getSizeBy(0.25)};
  padding: ${getSizeBy(0.375)};
  border-radius: ${getSizeBy(0.5)};
  border: 1px solid ${getColor("borderSecondary")};
  background: ${getRgbColor("textLite", 0.12)};
`

const trackHeights = { small: 2.25, default: 2.75 }

const Item = styled(Flex).attrs({ as: "button", type: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  gap: ${getSizeBy(0.75)};
  align-items: center;
  height: ${({ trackSize }) => getSizeBy(trackHeights[trackSize] || trackHeights.default)};
  padding: 0 ${getSizeBy(1.25)};
  border-radius: ${getSizeBy(0.25)};
  font-size: ${({ trackSize }) => (trackSize === "small" ? 12 : 13)}px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  cursor: pointer;
  color: ${({ active }) => getColor(active ? "textFocus" : "textLite")};
  background: ${({ active }) => getColor(active ? "dropdown" : ["transparent", "full"])};
  box-shadow: ${({ active, theme }) =>
    active ? `inset 0 0 0 1px ${getColor("border")({ theme })}` : "none"};
  transition:
    color 120ms ease-out,
    background 120ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    color: ${getColor("textFocus")};
  }

  &:focus-visible {
    ${focusRingOutline}
  }

  svg {
    fill: currentColor;
  }
`

const TrackList = ({ role, itemRole, items, value, onChange, size, label }) => (
  <Track role={role} aria-label={label}>
    {items.map(item => {
      const active = item.value === value
      return (
        <Item
          key={item.value}
          role={itemRole}
          aria-selected={itemRole === "tab" ? active : undefined}
          aria-checked={itemRole === "radio" ? active : undefined}
          tabIndex={active ? 0 : -1}
          active={active}
          trackSize={size}
          onClick={() => onChange(item.value)}
        >
          {item.icon ? <Icon name={item.icon} width="14px" height="14px" /> : null}
          <span>{item.label}</span>
          {item.count !== undefined ? <Count>{item.count.toLocaleString()}</Count> : null}
        </Item>
      )
    })}
  </Track>
)

export const ContainedTabs = props => <TrackList role="tablist" itemRole="tab" {...props} />

export const SegmentedPicker = props => <TrackList role="radiogroup" itemRole="radio" {...props} />

export const Count = styled.span`
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${getColor("textLite")};
`

const Label = styled(Flex).attrs({ as: "span", alignItems: "center", gap: 1.5 })`
  font-size: 13px;
  font-weight: ${({ active }) => (active ? 600 : 500)};
  color: ${({ active }) => getColor(active ? "textFocus" : "text")};

  svg {
    fill: ${({ active }) => getColor(active ? "textFocus" : "textLite")};
  }
`

// A label render-prop for the real Tab: icon, text, muted count, optional "of N" and status tick.
export const slotLabel =
  ({ icon, label, count, of, tick }) =>
  ({ active }) => (
    <Label active={active}>
      {icon ? <Icon name={icon} width="16px" height="16px" /> : null}
      <span>{label}</span>
      {count !== undefined ? <Count>{count.toLocaleString()}</Count> : null}
      {of !== undefined ? <Count>{`of ${of.toLocaleString()}`}</Count> : null}
      {tick ? (
        <Flex as="span" alignItems="center" gap={1}>
          <Dot tone={tick.tone} dotSize={0.75} />
          <Count>{tick.count}</Count>
        </Flex>
      ) : null}
    </Label>
  )
