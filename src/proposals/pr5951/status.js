// Copied from PR 5951: configItem/badges.js, alertEditor/cardParts.js (StatusPill), templates/changeMarks.js.
import React from "react"
import styled, { css } from "styled-components"
import Box from "@/components/templates/box"
import { getColor, getSizeBy } from "@/theme"
import { VisuallyHidden, dot } from "./tokens"

export const statusTones = {
  running: { label: "Running", tone: "success" },
  accepted: { label: "Accepted", tone: "neutral", hollow: true },
  failed: { label: "Failed", tone: "error" },
  disabled: { label: "Disabled", tone: "muted", hollow: true },
  incomplete: { label: "Incomplete", tone: "warning" },
  orphan: { label: "Orphan", tone: "warning" },
}

export const toneColors = {
  success: "var(--dyncfg-success-text)",
  error: "var(--dyncfg-error-text)",
  warning: "var(--dyncfg-warning-text)",
  neutral: "var(--dyncfg-text-secondary)",
  muted: "var(--dyncfg-text-secondary)",
}

export const StatusDot = styled(Box).attrs({ as: "span" })`
  flex: 0 0 auto;
  width: ${({ dotSize = 8 }) => getSizeBy(dotSize / 8)};
  height: ${({ dotSize = 8 }) => getSizeBy(dotSize / 8)};
  border-radius: 50%;
  ${({ tone = "muted", hollow }) =>
    hollow
      ? css`
          border: 1.5px solid ${toneColors[tone]};
        `
      : css`
          background: ${toneColors[tone]};
        `}
`

const pillLook = css`
  border-radius: var(--dyncfg-radius-pill);
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
  background: color-mix(in srgb, currentColor var(--dyncfg-pill-tint, 13%), transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 22%, transparent);
`

const PillContainer = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${({ pillSize }) => getSizeBy(pillSize === "small" ? 0.5 : 0.75)};
  height: ${({ pillSize }) => getSizeBy(pillSize === "small" ? 2 : 2.75)};
  padding: 0 ${({ pillSize }) => getSizeBy(pillSize === "small" ? 0.75 : 1.125)};
  font-size: ${({ pillSize }) => (pillSize === "small" ? 11 : 12)}px;
  color: ${({ tone }) => toneColors[tone] || toneColors.neutral};
  ${pillLook}
`

export const StatePill = ({ tone = "neutral", hollow, dot: hasDot = true, small, children }) => (
  <PillContainer tone={tone} pillSize={small ? "small" : undefined}>
    {hasDot ? <StatusDot tone={tone} hollow={hollow} dotSize={7} aria-hidden="true" /> : null}
    <span>{children}</span>
  </PillContainer>
)

const WordContainer = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${getSizeBy(0.75)};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ tone }) => toneColors[tone] || toneColors.neutral};
`

const StateDetail = styled(Box).attrs({ as: "span" })`
  font-weight: 400;
  color: var(--dyncfg-text-secondary);
`

export const StatusWord = ({ tone, hollow, label, detail }) => (
  <WordContainer tone={tone}>
    <StatusDot tone={tone} hollow={hollow} dotSize={7} aria-hidden="true" />
    <span>{label}</span>
    {detail ? <StateDetail>{`· ${detail}`}</StateDetail> : null}
  </WordContainer>
)

export const AlertLevelPill = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  height: 20px;
  padding: 0 7px;
  border-radius: var(--dyncfg-radius-sm);
  font-size: 11px;
  line-height: 18px;
  font-weight: 600;
  background: ${({ status }) =>
    status === "critical"
      ? getColor("errorBackground")
      : status === "warning"
        ? getColor("warningBackground")
        : "var(--dyncfg-clear-pill-bg)"};
  color: ${({ status }) =>
    status === "critical"
      ? "var(--dyncfg-critical-level-text)"
      : status === "warning"
        ? "var(--dyncfg-warning-level-text)"
        : "var(--dyncfg-clear-pill-text)"};
`

const EditedDot = styled(Box).attrs({ as: "span" })`
  flex: 0 0 auto;
  ${dot({ color: "var(--dyncfg-info-text)" })}
`
const CustomizedDot = styled(Box).attrs({ as: "span" })`
  flex: 0 0 auto;
  ${dot({ color: "var(--dyncfg-text-secondary)", hollow: true })}
`
const ErrorDot = styled(Box).attrs({ as: "span" })`
  flex: 0 0 auto;
  ${dot({ color: "var(--dyncfg-error-text)" })}
`
const ToFillDot = styled(Box).attrs({ as: "span" })`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px dashed var(--dyncfg-heading);
`

const Counts = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(1.25)};
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`

const MarkCount = styled(Box).attrs({ as: "span" })`
  display: inline-flex;
  align-items: center;
  gap: ${getSizeBy(0.625)};
  color: ${({ tone }) => tone};
`

const countParts = [
  ["error", ErrorDot, "var(--dyncfg-error-text)", "to fix"],
  ["toFill", ToFillDot, "var(--dyncfg-heading)", "to fill"],
  ["edited", EditedDot, "var(--dyncfg-info-text)", "edited"],
  ["customized", CustomizedDot, "var(--dyncfg-text-secondary)", "customized"],
]

export const MarkCounts = ({ counts }) => (
  <Counts>
    {countParts
      .filter(([key]) => counts[key])
      .map(([key, Dot, tone, label]) => (
        <MarkCount key={key} tone={tone}>
          <Dot aria-hidden="true" />
          {counts[key]}
          <VisuallyHidden>{` ${label}`}</VisuallyHidden>
        </MarkCount>
      ))}
  </Counts>
)
