import React, { useState, useEffect } from "react"
import { storiesOf } from "@storybook/react"
import styled from "styled-components"
import { text, number, boolean } from "@storybook/addon-knobs"
import { useCallback } from "@storybook/addons"
import { getColor } from "../../theme/utils"
import { readmeCleanup } from "../../../utils/readme"
import { TextInput, useInputValue, useTouchedState } from "."
import { Icon } from "../icon"
// @ts-ignore
import readme from "./README.md"

const inputStory = storiesOf("Components|Controls/TextInput", module)

const subData = {
  readme: {
    sidebar: readmeCleanup(readme),
  },
  jest: ["input.test.tsx"],
}

const Container = styled.div`
  width: 400px;
`

inputStory.add(
  "Input with validation",
  () => {
    const disabled = boolean("Disabled", false)
    const [isValid, setIsValid] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")
    const fieldMessage = text(
      "Defailt field message",
      "Pls fill this field for the sake of humanity"
    )
    const charLimit = number("Max characters", 20)

    const onChange = useCallback(() => {
      console.log("value has changed")
    }, [])

    const [value, handleChange, charsIndicator] = useInputValue({ onChange, maxChars: charLimit })

    const onBlur = useCallback(() => {
      console.log("performing some side effect on blur")
    }, [])

    const [touched, blurHandler] = useTouchedState({ onBlur })

    useEffect(() => {
      if (!isValid && value.length > 0) {
        setIsValid(true)
        setValidationMessage("Very green, much validated")
      } else if ((isValid || touched) && value.length === 0) {
        setIsValid(false)
        setValidationMessage("Great kings of the past want you to fill this field")
      }
    }, [isValid, value.length, touched])

    return (
      <Container>
        <TextInput
          disabled={disabled}
          placeholder={text("Placeholder", "Enter something")}
          fieldMessage={fieldMessage}
          fieldIndicator={charsIndicator}
          value={value}
          touched={touched}
          onBlur={blurHandler}
          onChange={handleChange}
          success={isValid && validationMessage}
          error={!isValid && validationMessage}
        />
      </Container>
    )
  },
  subData
)

inputStory.add(
  "Input with instant feedback",
  () => {
    const disabled = boolean("Disabled", false)
    const [isValid, setIsValid] = useState(false)
    const [validationMessage, setValidationMessage] = useState("")
    const fieldMessage = text(
      "Defailt field message",
      "Pls fill this field for the sake of humanity"
    )
    const charLimit = number("Max characters", 20)

    const onChange = useCallback(() => {
      console.log("value has changed")
    }, [])

    const [value, handleChange, charsIndicator, isDirty] = useInputValue({
      onChange,
      maxChars: charLimit,
    })

    const onBlur = useCallback(() => {
      console.log("performing some side effect on blur")
    }, [])

    const [touched, blurHandler] = useTouchedState({ onBlur })

    useEffect(() => {
      if (!isValid && value.length > 0) {
        setIsValid(true)
        setValidationMessage("Very green, much validated")
      } else if (isValid && value.length === 0) {
        setIsValid(false)
      }
    }, [isValid, value.length, touched])

    return (
      <Container>
        <TextInput
          disabled={disabled}
          placeholder={text("Placeholder", "Enter something")}
          fieldMessage={fieldMessage}
          fieldIndicator={charsIndicator}
          value={value}
          touched={touched}
          onBlur={blurHandler}
          onChange={handleChange}
          success={isValid && validationMessage}
          error={!isValid}
          instantFeedback
          isDirty={isDirty}
        />
      </Container>
    )
  },
  subData
)

const StyledIcon = styled(Icon)`
  fill: ${getColor(["gray", "limedSpruce"])};
`

const SearchIcon = <StyledIcon name="search_s" />

inputStory.add(
  "Input with right icon and label",
  () => {
    const disabled = boolean("Disabled", false)
    const charLimit = number("Max characters", 20)
    const label = text("Label", "Label")
    const [value, handleChange] = useInputValue({ maxChars: charLimit })

    return (
      <Container>
        <TextInput
          disabled={disabled}
          label={label}
          placeholder={text("Placeholder", "Enter something")}
          fieldMessage={text("Default field message", "Fun input with icon")}
          value={value}
          onChange={handleChange}
          iconRight={SearchIcon}
        />
      </Container>
    )
  },
  subData
)
