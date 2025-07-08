import React, { useState, useCallback, useRef } from "react"
import ReactDOM from "react-dom"
import styled, { keyframes } from "styled-components"
import { TextSmall } from "@/components/typography"
import { getColor } from "@/theme"
import { copyToClipboard } from "@/utils/clipboard"
import useDropElement from "@/hooks/useDropElement"

const fadeOutAnimation = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`

const FeedbackContainer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transform: translateX(-50%);
`

const FeedbackText = styled(TextSmall)`
  display: inline-block;
  animation: ${fadeOutAnimation} 0.5s ease-out forwards;
  color: ${props => props.isError ? getColor("error") : getColor("success")};
  font-weight: 600;
  white-space: nowrap;
`
FeedbackText.displayName = "FeedbackText"

const ClickableWrapper = styled.span`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
`
ClickableWrapper.displayName = "ClickableWrapper"

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

  const handleCopy = useCallback(async (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    if (disabled || feedback) return

    // Capture mouse position
    const mouseX = event.clientX
    const mouseY = event.clientY

    try {
      const success = await copyToClipboard(text)
      
      if (success) {
        setFeedback({ 
          x: mouseX, 
          y: mouseY - 20, // More space above cursor
          isError: false 
        })
        onCopy?.(text)
      } else {
        setFeedback({ 
          x: mouseX, 
          y: mouseY - 20,
          isError: true 
        })
        onError?.(new Error("Failed to copy to clipboard"))
      }
      
      // Auto-hide after animation completes (500ms)
      setTimeout(() => {
        setFeedback(null)
      }, 500)
    } catch (error) {
      setFeedback({ 
        x: mouseX, 
        y: mouseY - 20,
        isError: true 
      })
      onError?.(error)
      
      setTimeout(() => {
        setFeedback(null)
      }, 500)
    }
  }, [text, disabled, feedback, onCopy, onError])

  return (
    <>
      <ClickableWrapper
        onClick={handleCopy}
        style={style}
        className={className}
        {...props}
      >
        {children}
      </ClickableWrapper>
      {feedback && ReactDOM.createPortal(
        <FeedbackContainer 
          style={{ 
            left: `${feedback.x}px`, 
            top: `${feedback.y}px`
          }}
        >
          <FeedbackText isError={feedback.isError}>
            {feedback.isError ? "Failed to copy!" : "Copied!"}
          </FeedbackText>
        </FeedbackContainer>,
        dropElement
      )}
    </>
  )
}

CopyToClipboard.displayName = "CopyToClipboard"

export default CopyToClipboard