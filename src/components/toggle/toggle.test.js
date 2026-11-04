/**
 * @jest-environment jsdom
 */

import React, { useState } from "react"
import { css } from "styled-components"
import { renderWithProviders, fireEvent, screen, user } from "testUtilities"
import { DarkTheme } from "@/theme/dark"
import { DefaultTheme } from "@/theme/default"
import { Toggle } from "."
import { HiddenToggleInput, StyledLabel } from "./styled"

// The real input carries the switch role; the drawn track right after it is decorative.
const getTrack = () => screen.getByRole("switch").nextElementSibling

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

    const toggle = getByRole("switch").nextElementSibling
    expect(toggle).toHaveStyleRule("background", "#FFFFFF")
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

    const toggle = getByRole("switch").nextElementSibling
    expect(toggle).toHaveStyleRule("background-color", "#35414A", { modifier: ":after" })
  })

  it(" * should be colored", () => {
    const { container, getByRole } = renderWithProviders(<MockedToggle colored />)
    const toggle = getByRole("switch").nextElementSibling
    expect(toggle).toHaveStyleRule("background-color", DefaultTheme.colors.iconColor, {
      modifier: ":after",
    })

    const checkbox = container.querySelectorAll("input")[0]
    fireEvent.click(checkbox)
    expect(toggle).toHaveStyleRule("background", DefaultTheme.colors.primary)
    expect(toggle).toHaveStyleRule("background-color", "#FFFFFF", { modifier: ":after" })
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

describe("Toggle keyboard access", () => {
  it("keeps the input visually hidden but reachable with Tab", async () => {
    renderWithProviders(<MockedToggle labelRight="Auto refresh" />)
    const input = screen.getByRole("switch")
    expect(input).not.toHaveStyleRule("display", "none")
    expect(input).toHaveStyleRule("clip-path", "inset(50%)")
    await user().tab()
    expect(input).toHaveFocus()
  })

  it("toggles with the Space key", async () => {
    renderWithProviders(<MockedToggle />)
    const input = screen.getByRole("switch")
    await user().tab()
    await user().keyboard(" ")
    expect(input).toBeChecked()
    expect(screen.getByRole("switch")).toBeChecked()
  })

  it("draws the primary focus ring around the track on keyboard focus", () => {
    renderWithProviders(<MockedToggle />)
    const options = {
      modifier: css`
        ${HiddenToggleInput}:focus-visible+&
      `,
    }
    expect(getTrack()).toHaveStyleRule(
      "outline",
      `2px solid ${DefaultTheme.colors.primary}`,
      options
    )
    expect(getTrack()).toHaveStyleRule("outline-offset", "2px", options)
  })

  it("is not focusable when disabled", async () => {
    renderWithProviders(<MockedToggle disabled />)
    await user().tab()
    expect(screen.getByRole("switch")).not.toHaveFocus()
  })
})

describe("Toggle visuals", () => {
  it("draws the unchecked track with a 3:1 border", () => {
    renderWithProviders(<Toggle checked={false} onChange={() => {}} />)
    const track = getTrack()
    expect(track).toHaveStyleRule("border", "1px solid #708585")
    expect(screen.getByRole("switch")).not.toBeChecked()
  })

  it("fills the track green with a light knob when checked", () => {
    renderWithProviders(<Toggle checked onChange={() => {}} />)
    const track = getTrack()
    expect(track).toHaveStyleRule("background", DefaultTheme.colors.primary)
    expect(track).toHaveStyleRule("border-color", DefaultTheme.colors.primary)
    expect(track).toHaveStyleRule("background-color", "#FFFFFF", { modifier: ":after" })
  })

  it("centres a 14px knob with an even 2px inset and slides it with transform", () => {
    const { rerender } = renderWithProviders(<Toggle checked={false} onChange={() => {}} />)
    const track = getTrack()
    expect(track).toHaveStyleRule("width", "14px", { modifier: ":after" })
    expect(track).toHaveStyleRule("top", "2px", { modifier: ":after" })
    expect(track).toHaveStyleRule("left", "2px", { modifier: ":after" })
    rerender(<Toggle checked onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("transform", "translateX(20px)", {
      modifier: ":after",
    })
  })

  it("animates state changes unless reduced motion is requested", () => {
    renderWithProviders(<Toggle checked={false} onChange={() => {}} />)
    const track = getTrack()
    expect(track).toHaveStyleRule("transition", expect.stringContaining("140ms ease-out"))
    expect(track).toHaveStyleRule("transition", "none", {
      media: "(prefers-reduced-motion:reduce)",
    })
  })

  it("dims the whole control when disabled", () => {
    const { container } = renderWithProviders(<Toggle checked disabled labelRight="Off" />)
    expect(container.querySelector("label")).toHaveStyleRule("opacity", "0.4")
    expect(screen.getByRole("switch")).not.toHaveStyleRule("opacity", "0.4", { modifier: ":after" })
  })

  // An "off" toggle is a setting, not a failure: the knob stays neutral unless the caller asks for a colour.
  it("draws a neutral knob for an off colored toggle by default", () => {
    renderWithProviders(<Toggle colored checked={false} onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("background-color", DefaultTheme.colors.iconColor, {
      modifier: ":after",
    })
  })

  it("uses the colored palette props on the track", () => {
    const toggleProps = { uncheckedColor: ["neutral", "grey130"], checkedColor: "primary" }
    const { rerender } = renderWithProviders(
      <Toggle colored checked={false} toggleProps={toggleProps} onChange={() => {}} />
    )
    expect(getTrack()).toHaveStyleRule("background-color", "#819595", {
      modifier: ":after",
    })
    rerender(<Toggle colored checked toggleProps={toggleProps} onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("background", DefaultTheme.colors.primary)
  })

  it("steps the track one shade on hover of the whole row", () => {
    const hover = {
      modifier: css`
        ${StyledLabel}:hover &
      `,
    }
    const { rerender } = renderWithProviders(<Toggle checked={false} onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("border-color", "#526161", hover)
    rerender(<Toggle checked onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("background", DefaultTheme.colors.primaryHover, hover)
  })
})

describe("Toggle fix pass", () => {
  const hover = {
    modifier: css`
      ${StyledLabel}:hover &
    `,
  }

  it("turns transitions off when toggleProps.withTransition is false", () => {
    renderWithProviders(
      <Toggle checked={false} toggleProps={{ withTransition: false }} onChange={() => {}} />
    )
    const track = getTrack()
    expect(track).toHaveStyleRule("transition", "none")
    expect(track).toHaveStyleRule("transition", "none", { modifier: ":after" })
  })

  it("keeps the border still on hover when disabled", () => {
    const { rerender } = renderWithProviders(
      <Toggle checked={false} disabled onChange={() => {}} />
    )
    expect(screen.getByRole("switch")).not.toHaveStyleRule("border-color", expect.anything(), hover)
    rerender(<Toggle checked disabled onChange={() => {}} />)
    expect(screen.getByRole("switch")).not.toHaveStyleRule("background", expect.anything(), hover)
  })

  it("uses a grey knob when off in the dark theme and keeps the on knob light", () => {
    const { rerender } = renderWithProviders(<Toggle checked={false} onChange={() => {}} />, {
      theme: DarkTheme,
    })
    expect(getTrack()).toHaveStyleRule("background-color", "#B7C2C2", {
      modifier: ":after",
    })
    rerender(<Toggle checked onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("background-color", "#FFFFFF", {
      modifier: ":after",
    })
  })

  it("keeps the dark slate off knob in the light theme", () => {
    renderWithProviders(<Toggle checked={false} onChange={() => {}} />)
    expect(getTrack()).toHaveStyleRule("background-color", "#35414A", {
      modifier: ":after",
    })
  })
})

describe("Toggle accessibility", () => {
  it("exposes one named switch: the real input, with the drawn track hidden", () => {
    renderWithProviders(<Toggle checked labelRight="Live updates" onChange={() => {}} />)
    const control = screen.getByRole("switch", { name: "Live updates" })
    expect(control.tagName).toBe("INPUT")
    expect(control).toBeChecked()
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
    expect(getTrack()).toHaveAttribute("aria-hidden", "true")
  })
})

describe("accessibility attributes passed through toggleProps", () => {
  it("names the switch input from toggleProps aria attributes", () => {
    renderWithProviders(
      <Toggle
        checked={false}
        onChange={() => {}}
        toggleProps={{ "aria-label": "Enable Payments team", "aria-describedby": "hint" }}
      />
    )
    const toggle = screen.getByRole("switch", { name: "Enable Payments team" })
    expect(toggle).toHaveAttribute("aria-describedby", "hint")
  })

  it("lets direct props win over toggleProps", () => {
    renderWithProviders(
      <Toggle
        checked={false}
        onChange={() => {}}
        aria-label="Direct"
        toggleProps={{ "aria-label": "From toggleProps" }}
      />
    )
    expect(screen.getByRole("switch", { name: "Direct" })).toBeInTheDocument()
  })
})
