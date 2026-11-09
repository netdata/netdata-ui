import React from "react"
import styled from "styled-components"
import { renderWithProviders, screen } from "testUtilities"
import { Button } from "./button"
import IconButton from "./iconButton"

it("keeps unwrapped styling metadata off default buttons without unknown props", () => {
  const errors = jest.spyOn(console, "error")
  renderWithProviders(
    <>
      <Button label="Default" />
      <Button label="Unwrapped" wrapChildren={false} />
    </>
  )
  expect(errors.mock.calls.filter(call => String(call).includes("wrapChildren"))).toHaveLength(0)
  expect(screen.getByRole("button", { name: "Default" })).not.toHaveAttribute(
    "data-unwrapped-children"
  )
  expect(
    screen.getByRole("button", { name: "Unwrapped" }).getAttribute("data-unwrapped-children")
  ).toBe("")
})

it("lets compact controls retain their line height and shrink resistance", () => {
  renderWithProviders(
    <>
      <Button label="Count" flex={false} lineHeight="18px" height={5.5} />
      <Button label="Default" />
    </>
  )
  const button = screen.getByRole("button", { name: "Count" })
  expect(button).toHaveStyleRule("flex", "0 0 auto", { modifier: "&&" })
  expect(button).toHaveStyleRule("line-height", "18px", { modifier: "&&" })
  expect(screen.getByRole("button", { name: "Default" })).toHaveStyleRule("line-height", "16px", {
    modifier: "&&",
  })
})

it("preserves explicit disabled opacity for native and focusable-disabled icon controls", () => {
  renderWithProviders(
    <>
      <Button disabled disabledOpacity={0.6} label="Native" />
      <IconButton
        disabled
        focusableWhenDisabled
        disabledOpacity={0.6}
        icon="plus"
        aria-label="Focusable"
      />
      <Button disabled label="Default" />
    </>
  )
  expect(screen.getByRole("button", { name: "Native" })).toHaveStyle({ opacity: "0.6" })
  const focusable = screen.getByRole("button", { name: "Focusable" })
  expect(focusable).not.toBeDisabled()
  expect(focusable).toHaveAttribute("aria-disabled", "true")
  expect(focusable).toHaveStyle({ opacity: "0.6" })
  expect(screen.getByRole("button", { name: "Default" })).toHaveStyle({ opacity: "0.4" })
})

it.each([undefined, "gear"])("keeps an unwrapped count's own margin with icon %s", icon => {
  const Count = styled.span`
    margin-left: 2px;
  `
  renderWithProviders(
    <Button icon={icon} wrapChildren={false}>
      <span>Filters</span>
      <Count data-testid="attention-count">2</Count>
    </Button>
  )
  expect(screen.getByTestId("attention-count")).toHaveStyle({ marginLeft: "2px" })
  expect(screen.getByRole("button")).not.toHaveStyleRule("margin-left", expect.any(String), {
    modifier: "&&>span",
  })
})

it("retains the existing icon-to-label gap for default and explicit wrapped labels", () => {
  renderWithProviders(
    <>
      <Button icon="gear" label="Default wrapped" />
      <Button icon="gear" label="Explicit wrapped" wrapChildren />
      <Button label="No icon" />
    </>
  )
  for (const name of ["Default wrapped", "Explicit wrapped"]) {
    expect(screen.getByRole("button", { name }).querySelector(":scope > span")).toHaveStyle({
      marginLeft: "4px",
    })
  }
  expect(
    screen.getByRole("button", { name: "No icon" }).querySelector(":scope > span")
  ).toHaveStyle({ marginLeft: "0px" })
})
