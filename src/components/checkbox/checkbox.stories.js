import React, { useState } from "react"
import styled from "styled-components"
import { storiesOf } from "@storybook/react"
import { text, select, boolean } from "@storybook/addon-knobs"
import { Checkbox, useCheckboxesList } from "."
import { getGutterHeight } from "src/theme/utils"
import { readmeCleanup } from "utils/readme"
import readme from "./README.md"

const checkBoxStory = storiesOf("Inputs/Checkbox", module)

const position = ["left", "right"]

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["checkbox.test.tsx"],
}

checkBoxStory.add(
  "Controlled Checkbox",
  () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox disabled={boolean("Disabled", false)} onChange={handleChange} checked={checked} />
    )
  },
  subData
)

checkBoxStory.add(
  "Labeled Checkbox",
  () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox
        label={text("Label", "Do you like greek salad?")}
        onChange={handleChange}
        checked={checked}
        disabled={boolean("Disabled", false)}
      />
    )
  },
  subData
)

checkBoxStory.add(
  "Disabled Checkobox",
  () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox disabled={boolean("Disabled", true)} onChange={handleChange} checked={checked} />
    )
  },
  subData
)

checkBoxStory.add(
  "Left Labeled Checkbox",
  () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox
        labelPosition={select("Label Position", position, "left")}
        label={text("Label", "Do you like Soviet Russia?")}
        onChange={handleChange}
        checked={checked}
        disabled={boolean("Disabled", false)}
      />
    )
  },
  subData
)

const MasterCheckbox = styled(Checkbox)`
  margin-bottom: ${getGutterHeight};
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: 10px;
  margin-bottom: ${getGutterHeight};
`

const CheckboxGroup = styled.div``

checkBoxStory.add(
  "Labeled Checkbox Group",
  () => {
    const [checkedOne, setCheckedOne] = useState(false)
    const [checkedTwo, setCheckedTwo] = useState(false)
    const [checkedThree, setCheckedThree] = useState(false)

    const valuesList = [checkedOne, checkedTwo, checkedThree]
    const handlersList = [setCheckedOne, setCheckedTwo, setCheckedThree]

    const [allChecked, indeterminate, switchAll] = useCheckboxesList(valuesList, handlersList)

    const handleChange = setter => e => {
      setter(e.currentTarget.checked)
    }

    return (
      <CheckboxGroup>
        <MasterCheckbox
          label="The Boss checkbox"
          checked={allChecked}
          onChange={switchAll}
          indeterminate={indeterminate}
        />
        <StyledCheckbox
          label="Do you like greek salad?"
          onChange={handleChange(setCheckedTwo)}
          checked={checkedTwo}
        />
        <StyledCheckbox
          label="Do you like sguschenka?"
          onChange={handleChange(setCheckedOne)}
          checked={checkedOne}
        />
        <StyledCheckbox
          label="Was this story useful?"
          onChange={handleChange(setCheckedThree)}
          checked={checkedThree}
        />
      </CheckboxGroup>
    )
  },
  subData
)
