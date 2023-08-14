/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { renderWithProviders, fireEvent } from "testUtilities"
import { Toggle } from "."

const MockedToggle = props => {
  const [checked, setChecked] = useState(false)
  const handleChange = e => {
    setChecked(e.currentTarget.checked)
  }
  return <Toggle onChange={handleChange} checked={checked} {...props} />
}

describe("Toggle test", () => {
  it(" * should render with required props", () => {
    const { container, getByRole } = renderWithProviders(<MockedToggle />)
    const checkbox = container.querySelectorAll("input")[0]
    expect(checkbox).toBeInTheDocument()

    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background", "#F6F7F7")
    expect(toggle).toHaveStyleRule("background-color", "#35414A", { modifier: ":after" })
    expect(container).toMatchSnapshot()
  })

  it(" * should render with labels", () => {
    const { container, getByText } = renderWithProviders(
      <MockedToggle labelRight="Light theme" labelLeft="Dark theme" />
    )
    expect(getByText(/Light theme/)).toBeInTheDocument()
    expect(getByText(/Dark theme/)).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it(" * should be disabled", () => {
    const { container, getByRole } = renderWithProviders(<MockedToggle disabled />)
    const checkbox = container.querySelectorAll("input")[0]
    expect(checkbox).toBeDisabled()

    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background-color", "#35414A", { modifier: ":after" })
  })

  it(" * should be colored", () => {
    const { container, getByRole } = renderWithProviders(<MockedToggle colored />)
    const toggle = getByRole("switch")
    expect(toggle).toHaveStyleRule("background-color", "#DB162F", { modifier: ":after" })

    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(toggle).toHaveStyleRule("background-color", "#00AB44", { modifier: ":after" })
  })

  it(" * should check the checkbox on interaction", () => {
    const { container } = renderWithProviders(<MockedToggle />)
    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })
})
