// Copied from PR 5951: alertEditor/cardParts.js and configForm/templates/clampedDescription.js
// (MarkdownParser replaced by plain text; the fit-to-width header logic is omitted).
import React, { useId, useLayoutEffect, useRef, useState } from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import { getColor, getSizeBy } from "@/theme"
import { focusRingAt } from "./tokens"
import { Tooltip } from "./actions"

const editorTextInset = getSizeBy(44 / 8)

export const Card = styled(Box).attrs({ as: "section" })`
  box-sizing: border-box;
  border: 1px solid var(--dyncfg-paper-edge);
  border-radius: var(--dyncfg-radius-md);
  background: var(--dyncfg-paper);
  padding: ${getSizeBy(1.75)} ${getSizeBy(2.5)} ${getSizeBy(2)} calc(${editorTextInset} - 1px);
`

export const CardHeader = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${getSizeBy(0.75)} ${getSizeBy(1.5)};
  min-height: 28px;
`

export const CardTitle = styled(Box).attrs({ as: "h2" })`
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  font-weight: 600;
  color: var(--dyncfg-text-primary);
  white-space: nowrap;
`

export const CardSub = styled(Box).attrs({ as: "span" })`
  flex: 0 1 auto;
  min-width: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--dyncfg-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const CardGap = styled(Box).attrs({ as: "span", "aria-hidden": true })`
  flex: 1 1 auto;
`

const Note = styled(Box)`
  display: flex;
  align-items: center;
  gap: ${getSizeBy(1)};
  margin-top: ${getSizeBy(0.75)};
  font-size: 12px;
  line-height: 18px;
  color: var(--dyncfg-text-secondary);
`

const AboutButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${getSizeBy(2.5)};
  height: ${getSizeBy(2.5)};
  border-radius: 50%;
  cursor: pointer;
  color: var(--dyncfg-text-secondary);

  &:hover {
    color: var(--dyncfg-text-primary);
    background: var(--dyncfg-row-hover);
  }

  ${focusRingAt(1)}
`

export const CardNote = ({ short, full }) => {
  const id = useId()
  return (
    <Note>
      <span>{short}</span>
      <Tooltip content={full} wide align="bottom">
        {(tooltipProps = {}) => (
          <AboutButton
            {...tooltipProps}
            type="button"
            aria-label="About these notes"
            aria-describedby={id}
          >
            <Icon name="information" size="small" color="currentColor" aria-hidden="true" />
          </AboutButton>
        )}
      </Tooltip>
      <span id={id} hidden>
        {full}
      </span>
    </Note>
  )
}

const Row = styled(Box)`
  display: flex;
  align-items: flex-start;
  gap: ${getSizeBy(1)};
  min-width: 0;
`

const ClampText = styled(Box)`
  flex: 1 1 auto;
  min-width: 0;

  &[data-clamp] {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ lines }) => lines};
    overflow: hidden;
  }
`

const MoreToggle = styled(Box).attrs({ as: "button" })`
  all: unset;
  flex: 0 0 auto;
  min-width: ${getSizeBy(3.5)};
  text-align: right;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  color: var(--dyncfg-text-placeholder);
  text-underline-offset: 2px;
  border-radius: var(--dyncfg-radius-xs);

  &:hover,
  &:focus-visible {
    color: ${getColor("textFocus")};
    text-decoration: underline;
  }

  ${focusRingAt(2)}
`

export const ClampedDescription = ({ text, lines = 1 }) => {
  const textId = useId()
  const textRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [cut, setCut] = useState(false)

  useLayoutEffect(() => {
    const node = textRef.current
    if (!node || expanded) return undefined
    const measure = () => setCut(node.scrollHeight > node.clientHeight + 1)
    measure()
    if (typeof ResizeObserver === "undefined") return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [expanded, text])

  return (
    <Row>
      <ClampText ref={textRef} id={textId} lines={lines} data-clamp={expanded ? undefined : lines}>
        {text}
      </ClampText>
      {cut || expanded ? (
        <MoreToggle
          type="button"
          aria-expanded={expanded}
          aria-controls={textId}
          onClick={() => setExpanded(open => !open)}
        >
          {expanded ? "Less" : "More"}
        </MoreToggle>
      ) : null}
    </Row>
  )
}
