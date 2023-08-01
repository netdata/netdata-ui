import React, { useState } from "react"
import styled from "styled-components"
import { text, select, boolean } from "@storybook/addon-knobs"
import { Checkbox, useCheckboxesList } from "."
import { getGutterHeight } from "src/theme/utils"

const position = ["left", "right"]

export const ControlledCheckbox = {
  component: () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox disabled={boolean("Disabled", false)} onChange={handleChange} checked={checked} />
    )
  },
}

export const LabeledCheckbox = {
  component: () => {
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
}

export const DisabledCheckobox = {
  component: () => {
    const [checked, setChecked] = useState(false)
    const handleChange = e => {
      setChecked(e.currentTarget.checked)
    }
    return (
      <Checkbox disabled={boolean("Disabled", true)} onChange={handleChange} checked={checked} />
    )
  },
}

export const LeftLabeledCheckbox = {
  component: () => {
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
}

const MasterCheckbox = styled(Checkbox)`
  margin-bottom: ${getGutterHeight};
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: 10px;
  margin-bottom: ${getGutterHeight};
`

const CheckboxGroup = styled.div``

export const LabeledCheckboxGroup = {
  component: () => {
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
}

export default {
  component: Checkbox,
}
