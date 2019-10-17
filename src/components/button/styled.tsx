import React from "react"
import styled, { css } from "styled-components"
import { Button } from "@rmwc/button"
import { getColor } from "../../theme/utils"

export const StyledButton = styled(({ ...otherProps }) => <Button {...otherProps} />)`
  ${props =>
    props.isLoading
      ? css`
          background: ${getColor(["green", "malachite"])};
          border-radius: 3px;
          width: 128px;
          height: 40px;
        `
      : css`
          background: ${getColor(["green", "greenHaze"])};
          border-radius: 3px;
          width: 128px;
          height: 40px;
        `};
`
