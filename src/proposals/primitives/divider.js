// Proposed Divider: a 1px theme-coloured rule. Spacing and inset come from the Box margin prop.
import React from "react"
import styled from "styled-components"
import Box from "@/components/templates/box"

const Rule = styled(Box)`
  flex: none;
  border: 0;
`

const Divider = ({ vertical = false, color = "border", ...rest }) => (
  <Rule
    role="separator"
    aria-orientation={vertical ? "vertical" : "horizontal"}
    background={color}
    {...(vertical ? { width: "1px", alignSelf: "stretch" } : { height: "1px", width: "auto" })}
    {...rest}
  />
)

export default Divider
