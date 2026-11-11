// Copied from PR 5951: switchTrack.js + widgets/switchWidget.js, configItem/rowCheckbox.js,
// workspace/filterInput.js, filters/activeFilters.js, workspace/styled.js.
import { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { checkMarkPath, focusRingAt, monoFont } from "./tokens"

const BORDER = 1.5

const switchTrack = ({ width, height, knob }) => {
  const inset = (height - BORDER * 2 - knob) / 2
  const onLeft = width - BORDER * 2 - knob - inset

  return css`
    all: unset;
    box-sizing: border-box;
    position: relative;
    flex: 0 0 auto;
    width: ${getSizeBy(width / 8)};
    height: ${getSizeBy(height / 8)};
    border-radius: var(--dyncfg-radius-pill);
    cursor: pointer;
    border: ${BORDER}px solid
      ${({ isOn }) => (isOn ? "var(--dyncfg-heading)" : "var(--dyncfg-control-border)")};
    background: ${({ isOn }) => (isOn ? "var(--dyncfg-heading)" : "transparent")};
    transition:
      background 140ms ease,
      border-color 140ms ease;

    &::after {
      content: "";
      position: absolute;
      top: ${getSizeBy(inset / 8)};
      left: ${({ isOn }) => getSizeBy((isOn ? onLeft : inset) / 8)};
      width: ${getSizeBy(knob / 8)};
      height: ${getSizeBy(knob / 8)};
      border-radius: 50%;
      background: ${({ isOn }) =>
        isOn ? "var(--dyncfg-check-mark)" : "var(--dyncfg-control-border)"};
      transition: left 140ms ease;
    }

    &:hover:not(:disabled) {
      border-color: ${({ isOn }) => (isOn ? "var(--dyncfg-heading)" : getColor("textFocus"))};
    }

    ${focusRingAt(2)}

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  `
}

const Track = styled(Box).attrs({ as: "button" })`
  ${switchTrack({ width: 34, height: 20, knob: 13 })}
`

const SwitchControl = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(1)};
`

const Word = styled(Box).attrs({ as: "span", "aria-hidden": "true" })`
  font-size: 13px;
  line-height: 20px;
  color: var(--dyncfg-text-secondary);
`

export const Switch = ({ value, disabled, onChange, label }) => (
  <SwitchControl>
    <Track
      type="button"
      role="switch"
      aria-checked={!!value}
      aria-label={label}
      isOn={!!value}
      disabled={disabled}
      onClick={() => onChange(!value)}
    />
    <Word>{value ? "On" : "Off"}</Word>
  </SwitchControl>
)

const CheckboxInput = styled(Box).attrs({ as: "input" }).attrs({ type: "checkbox" })`
  appearance: none;
  flex: 0 0 auto;
  display: grid;
  place-content: center;
  width: ${getSizeBy(2)};
  height: ${getSizeBy(2)};
  margin: 0;
  border-radius: var(--dyncfg-radius-xs);
  border: 1.5px solid var(--dyncfg-control-border, ${getColor("inputBorderHover")});
  background: ${getColor("mainBackground")};
  cursor: pointer;
  transition:
    background 120ms ease,
    border-color 120ms ease;

  &::after {
    content: "";
    width: ${getSizeBy(1.125)};
    height: ${getSizeBy(1.125)};
    background: var(--dyncfg-check-mark);
    clip-path: ${checkMarkPath};
    transform: scale(0);
    transition: transform 100ms ease;
  }

  &:checked,
  &:indeterminate {
    background: var(--dyncfg-check-fill, ${getColor("primary")});
    border-color: var(--dyncfg-check-fill, ${getColor("primary")});
  }

  &:checked::after {
    transform: scale(1);
  }

  &:indeterminate::after {
    height: ${getSizeBy(0.25)};
    clip-path: none;
    transform: scale(1);
  }

  &:hover:not(:disabled) {
    border-color: var(--dyncfg-check-fill, ${getColor("primary")});
  }

  ${focusRingAt(2)}
`

export const RowCheckbox = ({ checked, indeterminate = false, onChange, label }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])

  return (
    <CheckboxInput
      ref={ref}
      checked={!!checked}
      onChange={onChange}
      aria-label={label}
      title={label}
    />
  )
}

const FilterContainer = styled(Box).attrs({ as: "label" })`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;

  > svg {
    position: absolute;
    left: ${getSizeBy(1.25)};
    fill: var(--dyncfg-text-secondary);
    pointer-events: none;
  }
`

const FilterField = styled(Box).attrs({ as: "input" })`
  width: 100%;
  height: ${getSizeBy(4)};
  padding: 0 ${getSizeBy(3.75)} 0 ${getSizeBy(4)};
  border-radius: var(--dyncfg-radius-sm);
  border: 1px solid
    ${({ hasValue }) => (hasValue ? "var(--dyncfg-control-border)" : "var(--dyncfg-chip-border)")};
  background: var(--dyncfg-input-bg);
  color: ${getColor("textFocus")};
  font: inherit;
  font-size: 13px;

  &::placeholder {
    color: var(--dyncfg-text-placeholder);
  }

  &::-webkit-search-cancel-button {
    display: none;
  }

  ${focusRingAt(-1)}
`

const Clear = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  position: absolute;
  right: ${getSizeBy(0.625)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${getSizeBy(2.75)};
  height: ${getSizeBy(2.75)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  color: var(--dyncfg-text-secondary);

  svg {
    fill: currentColor;
  }

  &:hover {
    color: ${getColor("textFocus")};
    background: var(--dyncfg-segment-bg);
  }

  ${focusRingAt(0)}
`

export const FilterInput = ({ value, onChange, placeholder }) => {
  const inputRef = useRef()

  const onKeyDown = event => {
    if (event.key === "Escape" && value) {
      event.stopPropagation()
      onChange("")
    }
  }

  return (
    <FilterContainer>
      <Icon aria-hidden="true" name="search_s" size="small" />
      <FilterField
        ref={inputRef}
        type="search"
        autoComplete="off"
        value={value}
        hasValue={!!value}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={event => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />
      {value ? (
        <Clear
          type="button"
          aria-label="Clear filter"
          onClick={() => {
            onChange("")
            inputRef.current?.focus()
          }}
        >
          <Icon aria-hidden="true" name="x" size="small" />
        </Clear>
      ) : null}
    </FilterContainer>
  )
}

export const RemovableChip = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.5)};
  height: ${getSizeBy(3.25)};
  padding: 0 ${getSizeBy(0.75)} 0 ${getSizeBy(1.25)};
  border-radius: var(--dyncfg-radius-pill);
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: ${getColor("textFocus")};
  background: ${getColor("elementBackground")};
  border: 1px solid var(--dyncfg-control-border);

  svg {
    fill: var(--dyncfg-text-secondary);
  }

  &:hover svg {
    fill: ${getColor("textFocus")};
  }

  ${focusRingAt(1)}
`

export const Chip = styled(Box).attrs({ as: "span" })`
  display: inline-block;
  flex: 0 0 auto;
  max-width: 100%;
  height: ${getSizeBy(2.5)};
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 ${getSizeBy(0.875)};
  border-radius: var(--dyncfg-radius-sm);
  font-size: 11px;
  font-family: ${({ mono }) => (mono ? monoFont : "inherit")};
  font-weight: 500;
  white-space: nowrap;
  color: var(--dyncfg-text-secondary);
  border: 1px solid var(--dyncfg-chip-border);
`

const Mark = styled(Box).attrs({ as: "mark" })`
  color: inherit;
  font-weight: 600;
  border-radius: var(--dyncfg-radius-xs);
  background: var(--dyncfg-match-bg);
  box-shadow: 0 0 0 1px var(--dyncfg-match-bg);
`

export const Highlight = ({ text = "", match }) =>
  match ? (
    <>
      <span>{text.slice(0, match.start)}</span>
      <Mark>{text.slice(match.start, match.end)}</Mark>
      <span>{text.slice(match.end)}</span>
    </>
  ) : (
    <span>{text}</span>
  )
