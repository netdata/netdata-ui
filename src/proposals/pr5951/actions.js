// Copied from PR 5951: components/tooltip.js, iconAction.js, rovingFocus.js, tabStrip.js.
import { forwardRef, useCallback } from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"
import { Icon } from "@/components/icon"
import BaseTooltip from "@/components/drops/tooltip"
import { mergeRefs } from "@/utils"
import { getColor, getSizeBy } from "@/theme"
import { eyebrow, focusRingAt } from "./tokens"

const Panel = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: ${getSizeBy(0.25)};
  max-width: ${({ wide }) => (wide ? 480 : 320)}px;
  margin: ${getSizeBy(0.75)};
  padding: ${getSizeBy(1)} ${getSizeBy(1.25)};
  border: 1px solid var(--dyncfg-popover-border);
  border-radius: var(--dyncfg-radius-md);
  background: var(--dyncfg-popover-bg);
  box-shadow: var(--dyncfg-popover-shadow);
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${getColor("textFocus")};
  overflow-wrap: anywhere;
`

const TooltipTitle = styled(Box).attrs({ as: "span" })`
  ${eyebrow}
`

// The PR also mutes the tooltip when focus is returned programmatically (useMovedFocusQuiet); omitted.
export const Tooltip = ({ content, title, wide, delay = 0, zIndex = 1000, children, ...rest }) => {
  const renderContent = useCallback(
    () => (
      <Panel wide={wide}>
        {title ? <TooltipTitle>{title}</TooltipTitle> : null}
        {typeof content === "function" ? content() : content}
      </Panel>
    ),
    [content, title, wide]
  )

  if (!content) return children

  return (
    <BaseTooltip plain content={renderContent} delay={delay} zIndex={zIndex} {...rest}>
      {children}
    </BaseTooltip>
  )
}

const StyledButton = styled(Box).attrs({ as: "button" })`
  all: unset;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${({ buttonSize }) => getSizeBy(buttonSize / 8)};
  height: ${({ buttonSize, buttonHeight = buttonSize }) => getSizeBy(buttonHeight / 8)};
  border-radius: var(--dyncfg-radius-sm);
  cursor: pointer;
  color: var(--dyncfg-text-secondary, ${getColor("textLite")});
  transition:
    background 120ms ease,
    color 120ms ease;

  svg {
    fill: currentColor;
  }

  &:hover:not(:disabled):not([aria-disabled="true"]) {
    color: ${({ tone }) =>
      tone === "danger" ? "var(--dyncfg-error-text)" : getColor("textFocus")};
    background: ${getColor("elementBackground")};
  }

  ${focusRingAt(1)}

  &:disabled,
  &[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

export const IconAction = forwardRef(
  (
    {
      icon,
      label,
      tooltip = label,
      onClick,
      size = 28,
      height,
      iconSize = "small",
      tone,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const renderButton = ({ ref: tooltipRef, ...tooltipProps } = {}) => (
      <StyledButton
        ref={tooltipRef ? mergeRefs(ref, tooltipRef) : ref}
        type="button"
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        buttonSize={size}
        buttonHeight={height}
        tone={tone}
        {...props}
        {...tooltipProps}
      >
        {children ?? <Icon name={icon} size={iconSize} color="currentColor" />}
      </StyledButton>
    )

    return tooltip ? (
      <Tooltip content={tooltip} align="bottom">
        {renderButton}
      </Tooltip>
    ) : (
      renderButton()
    )
  }
)

const keysByOrientation = {
  horizontal: { previous: ["ArrowLeft"], next: ["ArrowRight"] },
  both: { previous: ["ArrowLeft", "ArrowUp"], next: ["ArrowRight", "ArrowDown"] },
}

export const onRovingKeyDown = ({ event, index, count, orientation = "horizontal", onMove }) => {
  const { previous, next } = keysByOrientation[orientation] || keysByOrientation.horizontal
  let target = null
  if (event.key === "Home") target = 0
  else if (event.key === "End") target = count - 1
  else if (previous.includes(event.key)) target = (index - 1 + count) % count
  else if (next.includes(event.key)) target = (index + 1) % count
  if (target === null) return

  event.preventDefault()
  onMove(target)
  event.currentTarget.parentElement?.querySelectorAll(":scope > [data-roving]")?.[target]?.focus()
}
