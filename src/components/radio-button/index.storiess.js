import React, { useState } from "react"
import RadioButton from "."

export const BaseRadioButton = () => {
  return (
    <RadioButton
      disabled={boolean("Disabled", false)}
      onChange={() => {}}
      checked={boolean("Checked", false)}
      label={text("Label", "Toggle field")}
    />
  )
}

export const RadioButtonDisabledAndChecked = () => {
  return (
    <RadioButton
      disabled={boolean("Disabled", true)}
      onChange={() => {}}
      checked={boolean("Checked", true)}
      label={text("Label", "Toggle field")}
    />
  )
}

export const RadioButtonChecked = () => {
  return (
    <RadioButton
      disabled={boolean("Disabled", false)}
      onChange={() => {}}
      checked={boolean("Checked", true)}
      label={text("Label", "Toggle field")}
    />
  )
}

export const ControlledRadioButtons = () => {
  const [checked, setChecked] = useState("radio1")
  const handleChange = event => setChecked(event.target.value)

  return (
    <div>
      <RadioButton
        label="Label 1"
        name="radio-1"
        onChange={handleChange}
        value="radio1"
        checked={checked === "radio1"}
      />
      <RadioButton
        label="Label 2"
        name="radio-1"
        onChange={handleChange}
        value="radio2"
        checked={checked === "radio2"}
      />
      <RadioButton
        label="Label 3"
        name="radio-1"
        onChange={handleChange}
        value="radio3"
        checked={checked === "radio3"}
        disabled
      />
      <div>The value: {checked}</div>
    </div>
  )
}

export default {
  component: RadioButton,
}
