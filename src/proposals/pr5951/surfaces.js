// Copied from PR 5951: emptyResults.js, workspace/emptyState.js, configForm/jobStateBanner.js.
import React from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRingAt } from "./tokens"
import { toneColors } from "./status"

export const EmptyContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  align-self: flex-start;
  width: 100%;
  padding: ${getSizeBy(6)} ${getSizeBy(3)};
  text-align: center;
  border: 1px solid ${getColor("borderSecondary")};
  border-radius: var(--dyncfg-radius-md);
  background: ${getColor("mainBackground")};
`

export const EmptyTitle = styled(Box)`
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: ${getColor("textFocus")};
  overflow-wrap: anywhere;
`

export const EmptyHint = styled(Box)`
  font-size: 13px;
  line-height: 20px;
  color: var(--dyncfg-text-secondary);
`

export const EmptyResultActions = styled(Box)`
  display: flex;
  gap: ${getSizeBy(1)};
  margin-top: ${getSizeBy(1.25)};
`

export const EmptyActionButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  height: ${getSizeBy(4)};
  padding: 0 ${getSizeBy(1.75)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: ${getColor("textFocus")};
  border: 1px solid var(--dyncfg-control-border);

  &:hover {
    border-color: ${getColor("textFocus")};
  }

  ${focusRingAt(1)}
`

export const Empty = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${getSizeBy(1.25)};
  flex: 1 1 auto;
  min-height: 0;
  padding: ${getSizeBy(9)} ${getSizeBy(3)} ${getSizeBy(5)};
  text-align: center;

  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${getColor("textFocus")};
  }

  p {
    margin: 0;
    max-width: ${getSizeBy(52.5)};
    font-size: 13px;
    line-height: 20px;
    color: var(--dyncfg-text-secondary);
  }
`

export const EmptyActions = styled(Box)`
  display: flex;
  gap: ${getSizeBy(1)};
  margin-top: ${getSizeBy(0.75)};
`

const Banner = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: ${getSizeBy(1.25)};
  max-width: ${getSizeBy(102)};
  padding: ${getSizeBy(1.25)} ${getSizeBy(1.75)};
  border-radius: var(--dyncfg-radius-md);
  font-size: 13px;
  line-height: 20px;
  color: ${getColor("textFocus")};
  background: color-mix(in srgb, ${({ tone }) => toneColors[tone]} 10%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, ${({ tone }) => toneColors[tone]} 35%, transparent);

  > svg {
    flex: 0 0 auto;
    margin-top: ${getSizeBy(0.25)};
  }

  strong {
    font-weight: 600;
  }
`

const BannerMessage = styled(Box).attrs({ as: "span" })`
  flex: 1 1 auto;
`

const BannerActionSlot = styled(Box).attrs({ as: "span" })`
  display: flex;
  flex: 0 0 auto;
  align-self: center;
`

const Hint = styled(Box).attrs({ as: "p" })`
  display: flex;
  align-items: flex-start;
  gap: ${getSizeBy(1)};
  max-width: ${getSizeBy(102)};
  margin: 0 0 ${getSizeBy(0.5)};
  font-size: 13px;
  line-height: 20px;
  color: var(--dyncfg-text-secondary);

  > svg {
    flex: 0 0 auto;
    margin-top: ${getSizeBy(0.25)};
  }
`

export const JobStateBanner = ({ state, action }) =>
  state.variant === "hint" ? (
    <Hint>
      <Icon name="information" size="small" color="var(--dyncfg-text-secondary)" />
      {state.text}
    </Hint>
  ) : (
    <Banner tone={state.tone} role="status">
      <Icon name={state.icon} size="small" color={toneColors[state.tone]} />
      <BannerMessage>
        <strong>{state.title}</strong> {state.text}
      </BannerMessage>
      {action ? <BannerActionSlot>{action}</BannerActionSlot> : null}
    </Banner>
  )
