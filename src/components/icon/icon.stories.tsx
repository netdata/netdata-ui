import React from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { select } from "@storybook/addon-knobs"
import { readmeCleanup } from "../../../utils/readme"
import { iconsList } from "./icons-list"
import { Icon } from "."
// @ts-ignore
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

type SizePropT = "small" | "medium" | "large"

const sizes: SizePropT[] = ["small", "medium", "large"]

const icons: string[] = Object.keys(iconsList)

iconStory.add(
  "The X icon (pls change name)",
  () => {
    return (
      <StyledContainer>
        <Icon name={select("name", icons, "x")} />
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
          size={select("size", sizes, "large") as SizePropT}
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
        <StyledPlus name={select("name", icons, "plus")} />
      </StyledContainer>
    )
  },
  subData
)
