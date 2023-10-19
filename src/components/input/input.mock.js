import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { TextInput, useInputValue, useTouchedState } from "."

export const successMsg = "Very green, much validated"
export const errorMsg = "Great kings of the past want you to fill this field"

const Container = styled.div`
  width: 400px;
`

export const TextInputMock = () => {
  const [isValid, setIsValid] = useState(false)
  const [validationMessage, setValidationMessage] = useState("")
  const hint = "Pls fill this field for the sake of humanity"
  const charLimit = 20

  const [value, handleChange, charsIndicator] = useInputValue({ maxChars: charLimit })

  const [touched, blurHandler] = useTouchedState({})

  useEffect(() => {
    if (!isValid && value.length > 0) {
      setIsValid(true)
      setValidationMessage(successMsg)
    } else if ((isValid || touched) && value.length === 0) {
      setIsValid(false)
      setValidationMessage(errorMsg)
    }
  }, [isValid, value.length, touched])

  return (
    <Container>
      <TextInput
        name="testInput"
        placeholder="Enter something"
        hint={hint}
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
}
