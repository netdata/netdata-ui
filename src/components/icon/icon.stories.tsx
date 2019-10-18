import React from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { text } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { Icon } from "."
import readme from "./README.md"

const iconStory = storiesOf("Icon", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
}

const StyledContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: #00ab44;
  display: flex;
  justify-content: center;
  align-items: center;
`

type sizeProp = "small" | "medium" | "large"

iconStory.add(
  "Cross",
  () => {
    return (
      <StyledContainer>
        <Icon name={text("name", "cross")} />
      </StyledContainer>
    )
  },
  subData
)

iconStory.add(
  "Gear with size prop",
  () => {
    return (
      <StyledContainer>
        <Icon name={text("name", "gear")} size={text("size", "large") as sizeProp} />
      </StyledContainer>
    )
  },
  subData
)

// We could have control over SVG fill
// But Figma add fill to the path, not svg
// TBD if we need this, should be solved on Figma level
// Or later we can try svgr-like utility
const StyledPlus = styled(Icon)`
  stroke: red;
  border: 3px dotted pink;
`

iconStory.add(
  "Styled Plus",
  () => {
    return (
      <StyledContainer>
        <StyledPlus name={text("name", "plus")} />
      </StyledContainer>
    )
  },
  subData
)
