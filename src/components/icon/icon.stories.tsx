import React from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { text } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { Icon } from "."
// @ts-ignore
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
  "The X icon (pls change name)",
  () => {
    return (
      <StyledContainer>
        <Icon name={text("name", "x")} />
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
