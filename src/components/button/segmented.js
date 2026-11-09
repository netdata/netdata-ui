import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import { getColor, getOrElse, getSizeBy } from "@/theme"
import { FONT_MONOSPACE } from "@/theme/default/constants"
import { focusRingOutline } from "@/mixins/focusRing"
import { controlFontSize } from "@/mixins/controlSize"
import { segmentedTrack, segmentedItem } from "@/mixins/segmented"

export const SegmentedTrack = styled(Flex).attrs(({ appearance, compact, ...props }) =>
  appearance === "raised"
    ? {
        alignItems: "center",
        gap: 0.5,
        padding: [compact ? 0.5 : 0.75],
        round: compact ? 1.5 : 2,
        border: "segmentedBorder",
        background: "segmentedBackground",
        flex: false,
        ...props,
      }
    : {}
)`
  ${({ appearance }) =>
    appearance === "raised"
      ? css`
          display: inline-flex;
        `
      : segmentedTrack}
`

// 22px items as in the approved picker (Proposals › Refresh › TabsVariants).
export const SegmentedItem = styled.button.attrs({ type: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: ${getSizeBy(2.75)};
  padding: 0 ${getSizeBy(1.25)};
  font-family: inherit;
  font-size: ${controlFontSize("default")};
  line-height: ${getSizeBy(2)};
  white-space: nowrap;
  cursor: pointer;
  ${segmentedItem}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const RaisedSegmentedItem = styled(Flex).attrs(
  ({
    active,
    accent,
    compact,
    cursor,
    height,
    padding,
    round,
    opacity,
    "aria-disabled": ariaDisabled,
  }) => {
    const isAriaDisabled = ariaDisabled === true || ariaDisabled === "true"

    return {
      as: "button",
      type: "button",
      alignItems: "center",
      justifyContent: "start",
      height: height === undefined ? (compact ? 5.5 : 6.5) : height,
      padding: padding === undefined ? [0, compact ? 2 : 2.5] : padding,
      round: round === undefined ? (compact ? 1 : 1.5) : round,
      color: active ? (accent ? "segmentedAccentText" : "textFocus") : "statusMutedText",
      background: active
        ? accent
          ? "segmentedAccentBackground"
          : "segmentedSelectedBackground"
        : ["transparent", "full"],
      cursor: isAriaDisabled ? "not-allowed" : cursor === undefined ? "pointer" : cursor,
      opacity: isAriaDisabled ? 0.5 : opacity,
    }
  }
)`
  box-sizing: border-box;
  display: inline-flex;
  border: 0;
  appearance: none;
  text-align: inherit;
  font-family: ${({ monospace }) =>
    monospace ? getOrElse(["constants", "FONT_MONOSPACE"], FONT_MONOSPACE) : "inherit"};
  font-size: ${({ compact }) => controlFontSize(compact ? "compact" : "default")};
  font-weight: ${({ active, fontWeight }) => fontWeight ?? (active ? 600 : 500)};
  line-height: inherit;
  white-space: nowrap;
  box-shadow: ${({ active, accent }) =>
    active
      ? getOrElse(["shadows", accent ? "segmentedAccentSelected" : "segmentedSelected"], "none")
      : "none"};
  transition:
    color 120ms ease,
    background 120ms ease;

  &:hover {
    color: ${({ active, accent, _hover }) =>
      getColor(_hover?.color || (active && accent ? "segmentedAccentText" : "textFocus"))};
  }

  &:focus-visible {
    ${focusRingOutline}
    outline-color: ${getColor("segmentedFocus")};
    outline-offset: ${getSizeBy(-0.25)};
  }

  &[aria-disabled="true"] {
    opacity: ${({ _disabled }) => _disabled?.opacity ?? 0.5};
    cursor: not-allowed;
  }

  &:disabled {
    opacity: ${({ _disabled }) => _disabled?.opacity ?? 0.4};
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`
