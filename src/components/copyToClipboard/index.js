import React, { useState, useCallback } from "react"
import ReactDOM from "react-dom"
import styled, { css, keyframes } from "styled-components"
import { TextSmall } from "@/components/typography"
import Flex from "@/components/templates/flex"
import { Icon } from "@/components/icon"
import { dropdownBorder, dropdownRound, floatingShadow } from "@/components/drops/dropdownStyles"
import copyToClipboard from "@/utils/copyToClipboard"
import useDropElement from "@/hooks/useDropElement"
import { getSizeBy } from "@/theme/utils"

const FEEDBACK_DURATION = 1200

// Arrive quickly, hold so the message is readable, then leave; the motion stays within a few pixels.
const feedbackAnimation = props => keyframes`
  0% {
    opacity: 0;
    transform: translateY(${getSizeBy(0.5)(props)});
  }
  12%,
  75% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-${getSizeBy(0.5)(props)});
  }
`

const feedbackFade = keyframes`
  0% { opacity: 0; }
  12%, 75% { opacity: 1; }
  100% { opacity: 0; }
`

const FeedbackContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translateX(-50%);
`

const FeedbackPill = styled(Flex).attrs({
  "aria-hidden": true,
  alignItems: "center",
  gap: 1,
  padding: [0.5, 2],
  background: "dropdown",
  border: dropdownBorder,
  round: dropdownRound,
})`
  ${floatingShadow}
  white-space: nowrap;
  ${props => css`
    animation: ${feedbackAnimation(props)} ${FEEDBACK_DURATION}ms ease-out forwards;
  `}

  @media (prefers-reduced-motion: reduce) {
    animation-name: ${feedbackFade};
  }
`

// Drawn from an attribute so the message has a single text node (the live region) for consumers to query.
const FeedbackText = styled(TextSmall)`
  font-weight: 600;

  &::after {
    content: attr(data-label);
  }
`

// Persistent so screen readers announce later text changes; a region inserted with its content is often silent.
const LiveRegion = styled(TextSmall).attrs({ role: "status", "aria-live": "polite" })`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`

const ClickableWrapper = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: opacity 120ms ease-out;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/**
 * CopyToClipboard component that wraps children with click-to-copy functionality
 * and shows feedback at mouse position
 */
const CopyToClipboard = ({
  children,
  text,
  disabled = false,
  onCopy,
  onError,
  style,
  className,
  ...props
}) => {
  const [feedback, setFeedback] = useState(null)
  const dropElement = useDropElement()

  const handleCopy = useCallback(
    async event => {
      event.preventDefault()
      event.stopPropagation()

      if (disabled || feedback) return

      const mouseX = event.clientX
      const mouseY = event.clientY

      try {
        const success = await copyToClipboard(text)

        if (success) {
          setFeedback({
            x: mouseX,
            y: mouseY - 20,
            isError: false,
          })
          onCopy?.(text)
        } else {
          setFeedback({
            x: mouseX,
            y: mouseY - 20,
            isError: true,
          })
          onError?.(new Error("Failed to copy to clipboard"))
        }

        setTimeout(() => {
          setFeedback(null)
        }, FEEDBACK_DURATION)
      } catch (error) {
        setFeedback({
          x: mouseX,
          y: mouseY - 20,
          isError: true,
        })
        onError?.(error)

        setTimeout(() => {
          setFeedback(null)
        }, FEEDBACK_DURATION)
      }
    },
    [text, disabled, feedback, onCopy, onError]
  )

  return (
    <>
      <ClickableWrapper onClick={handleCopy} style={style} className={className} {...props}>
        {children}
      </ClickableWrapper>
      <LiveRegion>{feedback ? (feedback.isError ? "Failed to copy!" : "Copied!") : ""}</LiveRegion>
      {feedback &&
        ReactDOM.createPortal(
          <FeedbackContainer
            style={{
              left: `${feedback.x}px`,
              top: `${feedback.y}px`,
            }}
          >
            <FeedbackPill>
              <Icon
                name={feedback.isError ? "x" : "checkmark_s"}
                color={feedback.isError ? "error" : "success"}
                width="12px"
                height="12px"
              />
              <FeedbackText
                color="main"
                data-label={feedback.isError ? "Failed to copy!" : "Copied!"}
              />
            </FeedbackPill>
          </FeedbackContainer>,
          dropElement
        )}
    </>
  )
}

export default CopyToClipboard
