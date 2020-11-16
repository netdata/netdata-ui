import React from "react"
import styled from "styled-components"
import { Button } from "@rmwc/button"

const SIZES = {
  small: "16px",
  medium: "24px",
  large: "40px",
}

export const StyledIcon = styled.svg<{ size: string; disabled: boolean }>`
  height: ${({ size }) => SIZES[size]};
  width: ${({ size }) => SIZES[size]};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`

export const StyledIconButton = styled(({ ...otherProps }) => <Button {...otherProps} />)``
