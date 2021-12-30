import React from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { boolean, select } from "@storybook/addon-knobs"
import { readmeCleanup } from "utils/readme"
import { iconsList } from "./icons-list"
import { Icon } from "."
import readme from "./README.md"

const iconStory = storiesOf("COMPONENTS|Utils/Icon", module)

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

const sizes = ["small", "medium", "large"]

const icons = Object.keys(iconsList)

iconStory.add(
  "The X icon (pls change name)",
  () => {
    return (
      <StyledContainer>
        <Icon name={select("name", icons, "x")} disabled={boolean("Disabled", false)} />
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
        <Icon
          name={select("name", icons, "gear")}
          size={select("size", sizes, "large")}
          disabled={boolean("Disabled", false)}
        />
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
        <StyledPlus name={select("name", icons, "plus")} disabled={boolean("Disabled", false)} />
      </StyledContainer>
    )
  },
  subData
)
