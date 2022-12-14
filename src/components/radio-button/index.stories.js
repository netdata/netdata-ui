import React, { useState } from "react"
import { storiesOf } from "@storybook/react"
import { boolean, text } from "@storybook/addon-knobs"
import { readmeCleanup } from "utils/readme"
import readme from "./README.md"

import RadioButton from "./index"

const radioButtonStory = storiesOf("Input/RadioButton", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["index.test.js"],
}

radioButtonStory.add(
  "RadioButton",
  () => {
    return (
      <RadioButton
        disabled={boolean("Disabled", false)}
        onChange={() => {}}
        checked={boolean("Checked", false)}
        label={text("Label", "Toggle field")}
      />
    )
  },
  subData
)

radioButtonStory.add(
  "RadioButton Disabled And Checked",
  () => {
    return (
      <RadioButton
        disabled={boolean("Disabled", true)}
        onChange={() => {}}
        checked={boolean("Checked", true)}
        label={text("Label", "Toggle field")}
      />
    )
  },
  subData
)

radioButtonStory.add(
  "RadioButton Checked",
  () => {
    return (
      <RadioButton
        disabled={boolean("Disabled", false)}
        onChange={() => {}}
        checked={boolean("Checked", true)}
        label={text("Label", "Toggle field")}
      />
    )
  },
  subData
)

radioButtonStory.add(
  "Controlled RadioButtons",
  () => {
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
  },
  subData
)
