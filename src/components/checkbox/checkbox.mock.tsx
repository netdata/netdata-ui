import React, { useState } from "react"
import { Checkbox } from "."

export const MockedCheckbox = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  return <Checkbox onChange={handleChange} checked={checked} />
}
