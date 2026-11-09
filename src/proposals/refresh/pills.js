// Proposed Pill additions (soft look, leading dot, status word, mark counts), adapted from the PR's
// StatePill / StatusWord / MarkCounts onto netdata-ui flavours and theme tokens.
import React from "react"
import styled, { css } from "styled-components"
import Flex from "@/components/templates/flex"
import Box from "@/components/templates/box"
import { getColor, getRgbColor, getSizeBy } from "@/theme"

// ink: text and dot; fill: tint behind the text; ring: 1px inset edge.
export const tones = {
  success: { ink: "success", fill: getColor("successSemi"), ring: getRgbColor("success", 0.35) },
  warning: { ink: "warning", fill: getColor("warningSemi"), ring: getRgbColor("warning", 0.35) },
  error: { ink: "error", fill: getColor("errorSemi"), ring: getRgbColor("error", 0.35) },
  neutral: { ink: "text", fill: getColor("neutralHighlight"), ring: getColor("border") },
  stale: { ink: "stale", fill: getRgbColor("stale", 0.14), ring: getRgbColor("stale", 0.35) },
  muted: { ink: "textLite", fill: getColor(["transparent", "full"]), ring: getColor("border") },
}

tones.clear = tones.success
tones.critical = tones.error

const toneOf = tone => tones[tone] || tones.neutral

// Heights follow the D4 pill ladder (14/18/20/24) in 8px units.
export const sizes = {
  tiny: { height: 1.75, pad: 0.75, gap: 0.5, text: 10, dot: 0.75 },
  small: { height: 2.25, pad: 1, gap: 0.5, text: 11, dot: 0.75 },
  default: { height: 2.5, pad: 1.25, gap: 0.75, text: 12, dot: 0.875 },
  large: { height: 3, pad: 1.5, gap: 0.75, text: 13, dot: 1 },
}

const sizeOf = size => sizes[size] || sizes.default

export const Dot = styled(Box).attrs({ as: "span", "aria-hidden": "true" })`
  flex: 0 0 auto;
  box-sizing: border-box;
  width: ${({ dotSize = 0.875 }) => getSizeBy(dotSize)};
  height: ${({ dotSize = 0.875 }) => getSizeBy(dotSize)};
  border-radius: 50%;
  ${({ tone, hollow, theme }) => {
    const ink = getColor(toneOf(tone).ink)({ theme })
    return hollow ? `border: 1.5px solid ${ink};` : `background: ${ink};`
  }}
`

const soft = css`
  background: ${({ tone, theme }) => toneOf(tone).fill({ theme })};
  box-shadow: inset 0 0 0 1px ${({ tone, theme }) => toneOf(tone).ring({ theme })};
`

const SoftContainer = styled(Flex).attrs({ as: "span", alignItems: "center" })`
  display: inline-flex;
  flex: 0 0 auto;
  box-sizing: border-box;
  gap: ${({ pillSize }) => getSizeBy(sizeOf(pillSize).gap)};
  height: ${({ pillSize }) => getSizeBy(sizeOf(pillSize).height)};
  padding: 0 ${({ pillSize }) => getSizeBy(sizeOf(pillSize).pad)};
  border-radius: 999px;
  font-size: ${({ pillSize }) => sizeOf(pillSize).text}px;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: ${({ tone, theme }) => getColor(toneOf(tone).ink)({ theme })};
  ${soft}
`

export const SoftPill = ({ tone = "neutral", size, dot, hollowDot, children }) => (
  <SoftContainer tone={tone} pillSize={size}>
    {dot ? <Dot tone={tone} hollow={hollowDot} dotSize={sizeOf(size).dot} /> : null}
    <span>{children}</span>
  </SoftContainer>
)

const Word = styled(Flex).attrs({ as: "span", alignItems: "center", gap: 1.5 })`
  display: inline-flex;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ tone, theme }) => getColor(toneOf(tone).ink)({ theme })};
`

const Detail = styled.span`
  font-weight: 400;
  color: ${getColor("textLite")};
  font-variant-numeric: tabular-nums;
`

export const StatusWord = ({ tone, hollow, label, detail }) => (
  <Word tone={tone}>
    <Dot tone={tone} hollow={hollow} />
    <span>{label}</span>
    {detail ? <Detail>{`· ${detail}`}</Detail> : null}
  </Word>
)

const Counts = styled(Flex).attrs({ as: "span", alignItems: "center", gap: 2.5 })`
  display: inline-flex;
  font-size: 12px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
`

const Count = styled(Flex).attrs({ as: "span", alignItems: "center", gap: 1.25 })`
  display: inline-flex;
  color: ${({ tone, theme }) => getColor(toneOf(tone).ink)({ theme })};
`

const Hidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`

export const MarkCounts = ({ counts }) => (
  <Counts>
    {counts.map(({ tone, hollow, count, label }) => (
      <Count key={label} tone={tone}>
        <Dot tone={tone} hollow={hollow} />
        {count}
        <Hidden>{` ${label}`}</Hidden>
      </Count>
    ))}
  </Counts>
)
