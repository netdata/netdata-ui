import React, { useState } from "react"
import styled from "styled-components"
import { getGutterHeight } from "../../theme/utils"
import { Checkbox, useCheckboxesList } from "."

const MasterCheckbox = styled(Checkbox)`
  margin-bottom: ${getGutterHeight};
`

const StyledCheckbox = styled(Checkbox)`
  margin-left: 10px;
  margin-bottom: ${getGutterHeight};
`

const CheckboxGroup = styled.div``

export const MockedCheckbox = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  return <Checkbox onChange={handleChange} checked={checked} />
}

export const MockedCheckboxList = () => {
  const [checkedOne, setCheckedOne] = useState(false)
  const [checkedTwo, setCheckedTwo] = useState(false)
  const [checkedThree, setCheckedThree] = useState(false)

  const valuesList = [checkedOne, checkedTwo, checkedThree]
  const handlersList = [setCheckedOne, setCheckedTwo, setCheckedThree]

  const [allChecked, indeterminate, switchAll] = useCheckboxesList(valuesList, handlersList)

  const handleChange = (setter: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
}
