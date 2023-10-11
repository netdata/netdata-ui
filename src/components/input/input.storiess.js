// import React, { useState, useEffect } from "react"
// import styled from "styled-components"
// import { text, number, boolean, select } from "@storybook/addon-knobs"
// import { useCallback } from "@storybook/addons"
// import { getColor } from "@/theme/utils"
// import { TextInput, useInputValue, useTouchedState } from "."
// import { Button } from "@/components/button"
// import { Icon } from "@/components/icon"

// const Container = styled.div`
//   width: 400px;
// `

// export const InputWithValidation = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const [isValid, setIsValid] = useState(false)
//     const [validationMessage, setValidationMessage] = useState("")
//     const fieldMessage = text(
//       "Defailt field message",
//       "Pls fill this field for the sake of humanity"
//     )
//     const charLimit = number("Max characters", 20)

//     const onChange = useCallback(() => {
//       console.log("value has changed")
//     }, [])

//     const [value, handleChange, charsIndicator] = useInputValue({ onChange, maxChars: charLimit })

//     const onBlur = useCallback(() => {
//       console.log("performing some side effect on blur")
//     }, [])

//     const [touched, blurHandler] = useTouchedState({ onBlur })

//     useEffect(() => {
//       if (!isValid && value.length > 0) {
//         setIsValid(true)
//         setValidationMessage("Very green, much validated")
//       } else if ((isValid || touched) && value.length === 0) {
//         setIsValid(false)
//         setValidationMessage("Great kings of the past want you to fill this field")
//       }
//     }, [isValid, value.length, touched])

//     return (
//       <Container>
//         <TextInput
//           disabled={disabled}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={fieldMessage}
//           fieldIndicator={charsIndicator}
//           value={value}
//           touched={touched}
//           onBlur={blurHandler}
//           onChange={handleChange}
//           success={isValid && validationMessage}
//           error={!isValid && validationMessage}
//         />
//       </Container>
//     )
//   },
// }

// const customMetaDisplay = ({ isDirty, value, prevValue, error, success, focused }) =>
//   Boolean(success) ||
//   Boolean(focused && isDirty && error && prevValue && value.length < prevValue.length)

// const metaLabel = "Feedback Options"
// const metaOptions = {
//   None: undefined,
//   Custom: customMetaDisplay,
// }
// const metaDefaultValue = undefined
// const metaGroupId = "metaDisplayGroup"

// export const InputAdvanced = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const [isValid, setIsValid] = useState(false)
//     const [validationMessage, setValidationMessage] = useState("")
//     const fieldMessage = text("Default field message", "Pls enter at least 5 characters")
//     const charLimit = number("Max characters", 20)

//     const onChange = useCallback(() => {
//       console.log("value has changed")
//     }, [])

//     const [value, handleChange, charsIndicator, isDirty, { resetValue }] = useInputValue({
//       onChange,
//       maxChars: charLimit,
//     })

//     const onBlur = useCallback(() => {
//       console.log("performing some side effect on blur")
//     }, [])

//     const [touched, blurHandler, setTouched] = useTouchedState({ onBlur })

//     useEffect(() => {
//       if (!isValid && value.length >= 5) {
//         setIsValid(true)
//         setValidationMessage("Very green, much validated")
//       } else if (isValid && value.length < 5) {
//         setIsValid(false)
//         setValidationMessage("Too few characters =(")
//       }
//     }, [isValid, value, touched])

//     const handleReset = () => {
//       resetValue()
//       setTouched(false)
//     }

//     return (
//       <Container>
//         <Button label="Reset value" onClick={handleReset} />
//         <TextInput
//           disabled={disabled}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={fieldMessage}
//           fieldIndicator={charsIndicator}
//           value={value}
//           touched={touched}
//           onBlur={blurHandler}
//           onChange={handleChange}
//           success={isValid && validationMessage}
//           error={!isValid && validationMessage}
//           instantFeedback="positiveFirst"
//           handleMetaDisplay={select(metaLabel, metaOptions, metaDefaultValue, metaGroupId)}
//           isDirty={isDirty}
//         />
//       </Container>
//     )
//   },
// }

// const StyledIcon = styled(Icon)`
//   fill: ${getColor("text")};
// `

// const SearchIcon = <StyledIcon name="search_s" />

// export const InputWithIcon = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const charLimit = number("Max characters", 20)
//     const label = text("Label", "Label")
//     const [value, handleChange] = useInputValue({ maxChars: charLimit })

//     // lazy ref workaround example
//     const inputElement = useCallback(input => {
//       if (input !== null) {
//         // do some imperative stuff
//       }
//     }, [])

//     return (
//       <Container>
//         <TextInput
//           disabled={disabled}
//           label={label}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={text("Default field message", "Fun input with icon")}
//           value={value}
//           onChange={handleChange}
//           iconRight={SearchIcon}
//           inputRef={inputElement}
//         />
//       </Container>
//     )
//   },
// }

// export const InputLeftIcon = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const charLimit = number("Max characters", 20)
//     const label = text("Label", "Label")
//     const [value, handleChange] = useInputValue({ maxChars: charLimit })

//     // lazy ref workaround example
//     const inputElement = useCallback(input => {
//       if (input !== null) {
//         // do some imperative stuff
//       }
//     }, [])

//     return (
//       <Container>
//         <TextInput
//           disabled={disabled}
//           label={label}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={text("Default field message", "Fun input with icon")}
//           value={value}
//           onChange={handleChange}
//           iconLeft={SearchIcon}
//           inputRef={inputElement}
//         />
//       </Container>
//     )
//   },
// }

// export const InputTwoIcons = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const charLimit = number("Max characters", 20)
//     const label = text("Label", "Label")
//     const [value, handleChange] = useInputValue({ maxChars: charLimit })

//     // lazy ref workaround example
//     const inputElement = useCallback(input => {
//       if (input !== null) {
//         // do some imperative stuff
//       }
//     }, [])

//     return (
//       <Container>
//         <TextInput
//           disabled={disabled}
//           label={label}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={text("Default field message", "Fun input with icon")}
//           value={value}
//           onChange={handleChange}
//           iconLeft={SearchIcon}
//           iconRight={SearchIcon}
//           inputRef={inputElement}
//         />
//       </Container>
//     )
//   },
// }

// export const InputDisabled = {
//   component: () => {
//     const disabled = boolean("Disabled", true)
//     const charLimit = number("Max characters", 20)
//     const label = text("Label", "Label")
//     const [value, handleChange] = useInputValue({ maxChars: charLimit })

//     // lazy ref workaround example
//     const inputElement = useCallback(input => {
//       if (input !== null) {
//         // do some imperative stuff
//       }
//     }, [])

//     return (
//       <Container>
//         <TextInput
//           disabled={disabled}
//           label={label}
//           placeholder={text("Placeholder", "Enter something")}
//           fieldMessage={text("Default field message", "Fun input with icon")}
//           value={value}
//           onChange={handleChange}
//           iconLeft={SearchIcon}
//           inputRef={inputElement}
//         />
//       </Container>
//     )
//   },
// }

// export const InputSizes = {
//   component: () => {
//     const disabled = boolean("Disabled", false)
//     const charLimit = number("Max characters", 20)
//     const label = text("Label", "Label")
//     const [value, handleChange] = useInputValue({ maxChars: charLimit })

//     // lazy ref workaround example
//     const inputElement = useCallback(input => {
//       if (input !== null) {
//         // do some imperative stuff
//       }
//     }, [])

//     return (
//       <>
//         <Container>
//           <TextInput
//             disabled={disabled}
//             label={"Large"}
//             placeholder={text("Placeholder", "Enter something")}
//             fieldMessage={text("Default field message", "Fun input with icon")}
//             value={value}
//             onChange={handleChange}
//             iconRight={SearchIcon}
//             inputRef={inputElement}
//           />
//         </Container>
//         <Container>
//           <TextInput
//             size="small"
//             disabled={disabled}
//             label={"Small"}
//             placeholder={text("Placeholder", "Enter something")}
//             fieldMessage={text("Default field message", "Fun input with icon")}
//             value={value}
//             onChange={handleChange}
//             iconRight={SearchIcon}
//             inputRef={inputElement}
//           />
//         </Container>
//         <Container>
//           <TextInput
//             size="tiny"
//             disabled={disabled}
//             label={"Tiny"}
//             placeholder={text("Placeholder", "Enter something")}
//             fieldMessage={text("Default field message", "Fun input with icon")}
//             value={value}
//             onChange={handleChange}
//             iconRight={SearchIcon}
//             inputRef={inputElement}
//           />
//         </Container>
//       </>
//     )
//   },
// }

// export default {
//   component: TextInput,
// }
