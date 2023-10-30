import React, { useState } from "react"
import styled from "styled-components"
import { Checkbox, useCheckboxesList } from "."

const MasterCheckbox = styled(Checkbox)`
  margin-bottom: 8px;
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: 10px;
  margin-bottom: 8px;
`

const CheckboxGroup = styled.div``

export const MockedCheckbox = ({ disabled = false }) => {
  const [checked, setChecked] = useState(false)
  const handleChange = value => {
    setChecked(value)
  }
  return <Checkbox onChange={handleChange} checked={checked} disabled={disabled} />
}

export const MockedCheckboxList = () => {
  const [checkedOne, setCheckedOne] = useState(false)
  const [checkedTwo, setCheckedTwo] = useState(false)
  const [checkedThree, setCheckedThree] = useState(false)

  const valuesList = [checkedOne, checkedTwo, checkedThree]
  const handlersList = [setCheckedOne, setCheckedTwo, setCheckedThree]

  const [allChecked, indeterminate, switchAll] = useCheckboxesList(valuesList, handlersList)

  const handleChange = setter => value => {
    setter(value)
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
}
