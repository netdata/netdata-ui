/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { fireEvent } from "@testing-library/react"
import { DefaultTheme } from "../../theme/default"
import { testWrapper } from "../../../test-utils"
import "@testing-library/jest-dom/extend-expect"
import "jest-styled-components"
import { Toggle } from "."

const MockedToggle = props => {
  const [checked, setChecked] = useState(false)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
  }
  return <Toggle onChange={handleChange} checked={checked} {...props} />
}

describe("Toggle test", () => {
  it(" * should render with required props", () => {
    const { container, getByRole } = testWrapper<object>(MockedToggle, {}, DefaultTheme, null)
    const checkbox = container.querySelectorAll("input")[0]
    expect(checkbox).toBeInTheDocument()

    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background", "#FFF")
    expect(toggle).toHaveStyleRule("background-color", "#35414A", { modifier: ":after" })
    expect(container).toMatchSnapshot()
  })

  it(" * should render with labels", () => {
    const { container, getByText } = testWrapper<object>(
      MockedToggle,
      { labelRight: "Light theme", labelLeft: "Dark theme" },
      DefaultTheme,
      null
    )
    expect(getByText(/Light theme/)).toBeInTheDocument()
    expect(getByText(/Dark theme/)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(" * should be disabled", () => {
    const { container, getByRole } = testWrapper<object>(
      MockedToggle,
      { disabled: true },
      DefaultTheme,
      null
    )
    const checkbox = container.querySelectorAll("input")[0]
    expect(checkbox).toBeDisabled()

    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background-color", "#93A3B0", { modifier: ":after" })
  })

  it(" * should be colored", () => {
    const { container, getByRole } = testWrapper<object>(
      MockedToggle,
      { colored: true },
      DefaultTheme,
      null
    )
    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background-color", "#FF4136", { modifier: ":after" })

    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(toggle).toHaveStyleRule("background-color", "#00AB44", { modifier: ":after" })
  })

  it(" * should check the checkbox on interaction", () => {
    const { container } = testWrapper<object>(MockedToggle, {}, DefaultTheme, null)
    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })
})
